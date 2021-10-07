const renderAttributes = require('../../renderAttributes.js');

// sizes tell the browser which images to load
// `1/1` is a full width image, `1/4` is one fourth of the page width
// the `(min-width)` media queries might need to be adjusted to fit layout breakpoints
const sizes = require('./sizes.json');

const { transform } = require('@sporkbytes/storyblok-image');

const get_height = (aspect, width) => {
  const sides = aspect.split(':');
  const width_base = Number(sides[0]);
  const height_base = Number(sides[1]);
  const aspect_decimal = height_base / width_base;
  return { height: Math.round(width * aspect_decimal) };
}

const get_focal_points = (storyblok_focus, src) => {

  // turn this: 'https://a.storyblok.com/f/119172/3000x1687/6535529a52/xyz.jpg'
  // into this: [ 3000, 1687 ]
  let original_image_size = src.split('/')[5].split('x');

  original_image_size = {
    width: Number(original_image_size[0]),
    height: Number(original_image_size[1])
  };

  // turn this: '1542x787:1543x788'
  // into this: [ 1542, 787 ]
  let focus_coordinates = storyblok_focus.split(':')[0].split('x');

  focus_coordinates = {
    x: Number(focus_coordinates[0]),
    y: Number(focus_coordinates[1])
  };

  return {
    // return percentual coordinates
    focalPointX: Math.round((focus_coordinates.x / original_image_size.width) * 100),
    focalPointY: Math.round((focus_coordinates.y / original_image_size.height) * 100),
  }
}

module.exports = async function(params) {

  const {
    src,
    alt,
    storyblok_focus,
    picture_attributes,
    img_attributes,
    size = '1/1',
    aspect_phone,
    aspect_tablet,
    aspect_desktop
  } = params;

  // alt has to be specified, for decorative images use `alt=""`
  if (alt === undefined) throw new Error(`Alt tag missing on img with src: ${src}`);

  let options = {
    ...(storyblok_focus && {
      focal_points: get_focal_points(storyblok_focus, src)
    }),
    eleventy: {
      outputDir: 'dist/img/',
      formats: ['avif', 'webp', 'jpg'],
    },
    output: [
      {
        aspect: aspect_phone,
        sizes: {
          width: 800,
        }
      },
      {
        aspect: aspect_tablet,
        sizes: {
          width: 1200,
        }
      },
      {
        aspect: aspect_desktop,
        sizes: {
          width: 1600,
        }
      },
      {
        aspect: aspect_desktop,
        sizes: {
          width: 2000,
        }
      }
    ]
  };

  // quite ugly…?
  options.output = options.output.map(item => {
    const return_obj = {
      aspect: item.aspect,
      sizes: {
        width: item.sizes.width,
        ...(item.aspect && get_height(item.aspect, item.sizes.width))
      }
    }
    const url = transform(src, { ...options.focal_points, ...return_obj.sizes });
    return {
      url: url,
      ...return_obj,
    };
  });

  console.log(storyblok_focus, options.focal_points);

  // check if in serverless environment
  if(process.env.ELEVENTY_SERVERLESS) {

    const srcset = options.output.map(format => {
      return `${format.url} ${format.sizes.width}w`;
    });

    // if true, return only minimally optimised image
    return `
      <picture ${renderAttributes(picture_attributes)}>
        <source
          type="image/jpeg"
          srcset="${srcset}"
          sizes="${sizes[size]}"
        />
        <img ${renderAttributes(img_attributes)} src="${options.output[0].url}" />
      </picture>`;

  } else {

    // else, we can require the Image function
    // (if loaded in serverless env, we'd be exceeding the memory limit)
    const Image = require("@11ty/eleventy-img");

    // generate images and get metadata about it (paths, dimensions etc.)
    let arr_generated_images = await Promise.all(options.output.map(async item => {
      let image = await Image(item.url, options.eleventy)
      return image;
    }));

    let obj_generated_images = {};

    arr_generated_images.forEach(set => {
      for(let key in set) {
        const data = set[key][0];
        if(obj_generated_images[key] === undefined) obj_generated_images[key] = [];
        obj_generated_images[key].push(data);
      }
    })

    // construct the html
    return `
      <picture ${renderAttributes(picture_attributes)}>
        ${Object.values(obj_generated_images).map(format => {
          return`
            <source
              type="${format[0].sourceType}"
              srcset="${format.map(sources => sources.srcset).join(', ')}"
              sizes="${sizes[size]}"
            />
          `;
        }).join('\n')}

        <img
          src="${obj_generated_images['jpeg'][0].url}"
          width="${obj_generated_images['jpeg'][0].width}"
          height="${obj_generated_images['jpeg'][0].height}"
          loading="lazy"
          decoding="async"
          alt="${alt}"
          ${renderAttributes(img_attributes)}
        />
      </picture>`;
  }
}
