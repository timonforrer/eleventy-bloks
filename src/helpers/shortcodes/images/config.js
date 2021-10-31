const sizes = {
  full_bleed: '100vw',
  '1/1': '(min-width: 1000px) 95ch, 100vw',
  '1/2': '(min-width: 920px) 50vw, 100vw',
  '1/3': '(min-width: 920px) calc(100vw / 3), (min-width: 600px) 50vw, 100vw',
  '1/4': '(min-width: 920px) 25vw, (min-width: 650px) calc(100vw / 3), (min-width: 440px) 50vw, 100vw'
}

const media = {
  800: "(max-width: 399px)",
  1200: "(min-width: 400px) and (max-width: 799px)",
  1600: "(min-width: 800px) and (max-width: 1199px)",
  2000: "(min-width: 1200px)"
}

module.exports = { sizes, media };
