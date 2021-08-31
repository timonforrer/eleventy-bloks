const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

module.exports = function() {
  // input/output folders
  const input = './src/assets/unbundled/';
  const output = './dist/assets/images/';

  // main function
  const generateImages = async () => {

    // function to get filenames from folder
    const getFileNames = new Promise((resolve, reject) => {
      fs.readdir(input, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  
    // function to get content of single file
    const readFile = function(file) {
      return new Promise((resolve, reject) => {
        fs.readFile(file.path, 'utf-8', (err, data) => {
          if(err) reject(err);
          resolve({ data: data, name: file.name });
        });
      });
    }
  
    // creating array of filenames
    let fileNames = await getFileNames;
    // creating full path and raw filename w/o suffix
    fileNames = fileNames.map(fileName => ({ path: input+fileName, name: fileName.replace(/.html/, '') }));
  
    // iterating over all files and add content
    let files = await Promise.all(fileNames.map(file => readFile(file)));
    
    // create output folder
    fs.mkdir(output, err => console.log(err));
  
    // create image for each item in array
    files.forEach(file => {
      return nodeHtmlToImage({
        output: `${output}${file.name}.png`,
        html: file.data
      });
    });
  }

  // return main function
  return generateImages();
}
