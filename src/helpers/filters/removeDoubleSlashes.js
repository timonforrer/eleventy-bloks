module.exports = value => {
  return value.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
}