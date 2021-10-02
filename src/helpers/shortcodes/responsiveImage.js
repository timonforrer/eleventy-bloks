const Image = require("@11ty/eleventy-img");

module.exports = async function(params) {

  // get shortcode parameters
  const {
    src,
    alt,
    size = '1/1',
    pictureAttributes,
    imgAttributes
  } = params;

  // these sizes tell the browser which images to load
  // `1/1` is a full width image, `1/4` is one fourth of the page width
  // the `(min-width)` media queries might need to be adjusted to fit layout breakpoints
  const sizes = {
    '1/1': '(min-width: 1000px) 95ch, 100vw',
    '1/2': '(min-width: 920px) 50vw, 100vw',
    '1/3': '(min-width: 920px) calc(100vw / 3), (min-width: 600px) 50vw, 100vw',
    '1/4': '(min-width: 920px) 25vw, (min-width: 650px) calc(100vw / 3), (min-width: 440px) 50vw, 100vw'
  }

  // alt has to be specified, for decorative images use `alt=""`
  if (alt === undefined) throw new Error(`Alt tag missing on img with src: ${src}`);

  // generate images and get metadata about it (paths, dimensions etc.)
  let generated_images = await Image(src, {
    outputDir: 'dist/img/',
    widths: [800,1200,1600],
    formats: ['avif','webp','jpg']
  });

  // construct the html
  return `
    <picture
    ${ pictureAttributes ? Object.entries(pictureAttributes).map(attr => `${attr[0]}="${attr[1]}"`) : '' }
    >
      ${Object.values(generated_images).map(format => {
        return`
          <source
            type="${format[0].sourceType}"
            media="(-webkit-min-device-pixel-ratio: 1.5)"
            srcset="${format.map(sources => sources.srcset).join(', ')}"
            sizes="${sizes[size]}"
          />`
      }).join('\n')}
      <source type="image/avif" srcset="${generated_images['avif'][0].url}" />
      <source type="image/webp" srcset="${generated_images['webp'][0].url}" />
      <img
        src="${generated_images['jpeg'][0].url}"
        width="${generated_images['jpeg'][0].width}"
        height="${generated_images['jpeg'][0].height}"
        loading="lazy"
        decoding="async"
        ${ imgAttributes ? Object.entries(imgAttributes).map(attr => `${attr[0]}="${attr[1]}"`) : '' }
      />
    </picture>`;
};
