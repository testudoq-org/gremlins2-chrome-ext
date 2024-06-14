const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const ObfuscatorPlugin = require('webpack-obfuscator');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'prod-dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments
          },
          keep_classnames: true, // Keep class names for better debugging
          keep_fnames: true // Keep function names for better debugging
        },
        extractComments: false, // Do not extract comments to separate files
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ObfuscatorPlugin({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      identifierNamesGenerator: 'hexadecimal',
      keepClassNamePrefix: true,
      rotateStringArray: true,
      selfDefending: true,
      splitStrings: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75,
    })
  ]
});
