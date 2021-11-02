const preview = (data) => {
  const { blok } = data;
  if(process.env.ELEVENTY_SERVERLESS) {
    return `
      <div class="preview-wrapper">
      ${blok._editable}
    `;
  } else {
    return '';
  }
}

const endpreview = () => {
  if(process.env.ELEVENTY_SERVERLESS) {
    return `</div>`;
  } else {
    return '';
  }
}

module.exports = { preview, endpreview }
