// prebuild.js

const fs = require('fs');
const path = require('path');

// Paths to source and destination files
const sourceJS = path.resolve(__dirname, 'node_modules/gremlins.js/dist/gremlins.min.js');
const destinationJS = path.resolve(__dirname, 'src/content/gremlins.min.js');
const sourceMap = path.resolve(__dirname, 'node_modules/gremlins.js/dist/gremlins.min.js.map');
const destinationMap = path.resolve(__dirname, 'src/content/gremlins.min.js.map');

// Copy gremlins.min.js
fs.copyFile(sourceJS, destinationJS, (err) => {
  if (err) throw err;
  console.log('gremlins.min.js was copied to src/content');
});

// Copy gremlins.min.js.map
fs.copyFile(sourceMap, destinationMap, (err) => {
  if (err) throw err;
  console.log('gremlins.min.js.map was copied to src/content');
});
