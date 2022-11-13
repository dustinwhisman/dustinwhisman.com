/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const getImagePaths = () => {
  const directoryPath = path.join(__dirname, '../../public/images/cats');
  const files = fs.readdirSync(directoryPath);

  return files;
};

module.exports = {
  images: getImagePaths(),
};
