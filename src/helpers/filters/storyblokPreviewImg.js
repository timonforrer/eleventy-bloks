module.exports = (input_url, width) => {

  let url = input_url.replace(/(https?:\/\/)a\.storyblok\.com/, `https://img2.storyblok.com/${
    width ? width : '1920x0'
  }`);

  return url;
}
