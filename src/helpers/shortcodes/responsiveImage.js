const renderAttributes = require('../renderAttributes.js');

module.exports = async function(params) {

  // get shortcode parameters
  const {
    src,
    alt,
    size = '1/1',
    picture_attributes,
    img_attributes,
    preview_src
  } = params;

  // these sizes tell the browser which images to load
  // `1/1` is a full width image, `1/4` is one fourth of the page width
  // the `(min-width)` media queries might need to be adjusted to fit layout breakpoints
  const sizes = {
    'full_bleed': '100vw',
    '1/1': '(min-width: 1000px) 95ch, 100vw',
    '1/2': '(min-width: 920px) 50vw, 100vw',
    '1/3': '(min-width: 920px) calc(100vw / 3), (min-width: 600px) 50vw, 100vw',
    '1/4': '(min-width: 920px) 25vw, (min-width: 650px) calc(100vw / 3), (min-width: 440px) 50vw, 100vw'
  }

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
        <img ${renderAttributes(img_attributes)} src="${preview_src}" />
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
          loading="lazy"
          decoding="async"
          ${renderAttributes(img_attributes)}
        />
      </picture>`;
  }
}
