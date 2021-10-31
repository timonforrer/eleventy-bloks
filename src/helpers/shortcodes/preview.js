const preview = (data) => {
  const { blok } = data;
  if(process.env.ELEVENTY_SERVERLESS) {
    return `
      <div class="preview-wrapper">
      ${blok._editable}
    `;
  }
}

const endpreview = () => {
  if(process.env.ELEVENTY_SERVERLESS) {
    return `</div>`;
  }
}

module.exports = { preview, endpreview }
