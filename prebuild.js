// prebuild.js

const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, 'node_modules/gremlins.js/dist/gremlins.min.js');
const destination = path.resolve(__dirname, 'src/content/gremlins.min.js');

fs.copyFile(source, destination, (err) => {
  if (err) throw err;
  console.log('gremlins.min.js was copied to src/content');
});
