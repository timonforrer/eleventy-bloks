module.exports = (attrs) => {
  return (attrs
    ? Object.entries(attrs).map(attr => `${attr[0]}="${attr[1]}"`).join(' ')
    : ''
  );
}
