const renderAttributes = require('../../renderAttributes.js');

// sizes tell the browser which images to load
// `1/1` is a full width image, `1/4` is one fourth of the page width
// the `(min-width)` media queries might need to be adjusted to fit layout breakpoints
const { sizes } = require('./config.js');

module.exports = async function(params) {

  // get shortcode parameters
  const {
    alt,
    img_attributes,
    loading = 'lazy',
    picture_attributes,
    size = '1/1',
    src,
    preview_src
  } = params;

  // alt has to be specified, for decorative images use `alt=""`
  if (alt === undefined) throw new Error(`Alt tag missing on img with src: ${src}`);

  // specify options for image generation
  const options = {
    outputDir: 'dist/img/',
    widths: [800,1200,1600,2000],
    formats: ['avif','webp','jpg']
  }

  // check if in serverless environment
  if(process.env.ELEVENTY_SERVERLESS) {

    // if true, return only minimally optimised image
    return `
      <picture ${renderAttributes(picture_attributes)}>
        <img ${renderAttributes(img_attributes)} src="${preview_src}" loading="${loading}" />
      </picture>`;

  } else {

    // else, we can require the Image function
    // (if loaded in serverless env, we'd be exceeding the memory limit)
    const Image = require("@11ty/eleventy-img");

    // generate images and get metadata about it (paths, dimensions etc.)
    let generated_images = await Image(src, options);

    // construct the html
    return `
      <picture ${renderAttributes(picture_attributes)}>
        ${Object.values(generated_images).map(format => {
          return`
            <source
              type="${format[0].sourceType}"
              srcset="${format.map(sources => sources.srcset).join(', ')}"
              sizes="${sizes[size]}"
            />
          `;
        }).join('\n')}

        <img
          src="${generated_images['jpeg'][0].url}"
          width="${generated_images['jpeg'][0].width}"
          height="${generated_images['jpeg'][0].height}"
          loading="${loading}"
          decoding="async"
          alt="${alt}"
          ${renderAttributes(img_attributes)}
        />
      </picture>`;
  }
}
