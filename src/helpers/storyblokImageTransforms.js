const get_height = (aspect, width) => {
  // utility to calculate height from width and aspect ratio

  // get ratios of sides
  // if 16:9 ==> width = 16, height = 9
  const [ width_base, height_base ] = aspect.split(':').map(Number);

  // get aspect as decimal value to do the calculation
  const aspect_decimal = height_base / width_base;

  // do the calculation and return
  return Math.round(width * aspect_decimal);
}

const get_focal_points = (storyblok_focus, src) => {
  // utility to get "percentual coordinates" (eg. x is at 80% of width, y is at 25% of height)
  // uses coordinates (x, y) and resolution of image (width, height) to calculate values

  // turn this: 'https://a.storyblok.com/f/119172/3000x1687/6535529a52/xyz.jpg'
  // into this: [ 3000, 1687 ]
  // using `.map` to iterate over each value and turn it into a number
  let [ width, height ] = src.split('/')[5].split('x').map(Number);

  // turn this: '1542x787:1543x788'
  // into this: [ 1542, 787 ]
  let [ x, y ] = storyblok_focus.split(':')[0].split('x').map(Number);

  return {
    // return percentual coordinates
    focalPointX: Math.round((x / width) * 100),
    focalPointY: Math.round((y / height) * 100),
  }
}

module.exports = { get_height, get_focal_points };
