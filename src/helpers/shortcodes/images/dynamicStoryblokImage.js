const renderAttributes = require('../../renderAttributes.js');

// sizes tell the browser which images to load
// `1/1` is a full width image, `1/4` is one fourth of the page width
// the `(min-width)` media queries might need to be adjusted to fit layout breakpoints
const { sizes, media } = require('./config.js');
// --> probably breaks the media queries for art direction..

// get utils to do the transform magic
const { transform } = require('@sporkbytes/storyblok-image');
const { get_focal_points, get_height } = require('../../storyblokImageTransforms.js');

module.exports = async function(params) {

  // get params
  const {
    alt,
    img_attributes,
    loading = 'lazy',
    picture_attributes,
    // set default for size
    size = '1/1',
    // access nested properties of `storyblok_data` and assign to new variables if needed
    storyblok_data: {
      aspect_mobile,
      aspect_tablet,
      aspect_desktop,
      focus: storyblok_focus,
      image: {
        filename: src
      }
    },
  } = params;

  // alt has to be specified, for decorative images use `alt=""`
  if (alt === undefined) throw new Error(`Alt tag missing on img with src: ${src}`);

  let options = {

    // if a focus is set in storyblok, transform the values to usable format using `get_focal_points`
    ...(storyblok_focus && {
      focal_points: get_focal_points(storyblok_focus, src)
    }),

    // options for eleventy img
    eleventy: {
      outputDir: 'dist/img/',
      formats: ['avif', 'webp', 'jpg'],
    },

    // specify the desired outputs
    // nullish values will be populated later
    output: [
      {
        aspect: aspect_mobile,
        sizes: {
          width: 800,
          height: null,
        },
        url: null
      },
      {
        aspect: aspect_tablet,
        sizes: {
          width: 1200,
          height: null,
        },
        url: null
      },
      {
        aspect: aspect_desktop,
        sizes: {
          width: 1600,
          height: null,
        },
        url: null
      },
      {
        aspect: aspect_desktop,
        sizes: {
          width: 2000,
          height: null,
        },
        url: null
      }
    ]
  };

  // populate nullish values of output config
  options.output.forEach((item, index) => {

    // get reference to the actual object we wanna change
    const mod_item = options.output[index];

    // check if aspect specified, if yes: calculate height, else: return null
    mod_item.sizes.height = item.aspect ? get_height(item.aspect, item.sizes.width) : null;

    // generate url for each output option
    mod_item.url = transform(src, { ...options.focal_points, ...item.sizes });
  });

  // check if in serverless environment
  if(process.env.ELEVENTY_SERVERLESS) {

    const srcset = options.output.map(format => {
      return `${format.url} ${format.sizes.width}w`;
    });

    // if true, return only minimally optimised image
    return `
      <picture ${renderAttributes(picture_attributes)}>
        ${options.output.map(format => {
          return`
            <source
              type="image/jpg"
              ${
                // if aspect specified for any device type, switch to media queries
                // else, use sizes attribute
                options.output.some(item => item.aspect)
                ? `media="${media[format.sizes.width]}" srcset="${format.url}"`
                : `sizes="${sizes[size]}" srcset="${format.url} ${format.sizes.width}w"`
              }
            />
          `
        }).join('\n')}
        <img ${renderAttributes(img_attributes)} src="${options.output[0].url}" loading="${loading}" />
      </picture>`;

  } else {

    // else, we can require the Image function
    // (if loaded in serverless env, we'd be exceeding the memory limit)
    const Image = require("@11ty/eleventy-img");

    // generate images and get metadata about it (paths, dimensions etc.)
    let arr_generated_images = await Promise.all(options.output.map(async item => {
      let image = await Image(item.url, options.eleventy);
      return image;
    }));

    // placeholder object, will be populated from the arr_generated_images
    let obj_generated_images = {};

    // populate object, so it matches eleventy generated object
    arr_generated_images.forEach(set => {
      for(let key in set) {
        const data = set[key][0];
        if(obj_generated_images[key] === undefined) obj_generated_images[key] = [];
        obj_generated_images[key].push(data);
      }
    });

    // construct the html
    return `
      <picture ${renderAttributes(picture_attributes)}>
        ${Object.values(obj_generated_images).map(format => {
          return format.map(source => {
            return`
              <source
                type="${source.sourceType}"
                ${
                  // if aspect specified for any device type, switch to media queries
                  // else, use sizes attribute
                  options.output.some(item => item.aspect)
                  ? `media="${media[source.width]}" srcset="${source.url}"`
                  : `sizes="${sizes[size]}" srcset="${source.srcset}"`
                }
              />
            `;
          }).join('\n');
        }).join('\n')}

        <img
          src="${obj_generated_images['jpeg'][0].url}"
          width="${obj_generated_images['jpeg'][0].width}"
          height="${obj_generated_images['jpeg'][0].height}"
          loading="${loading}"
          decoding="async"
          alt="${alt}"
          ${renderAttributes(img_attributes)}
        />
      </picture>`;
  }
}
