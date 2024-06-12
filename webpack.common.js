const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background/background-index.js',
    content: './src/content/content-index.js',
    popup: './src/popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''  // Ensure all assets are relative to the root
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/icons', to: 'icons' },
        { from: 'node_modules/gremlins.js/dist/gremlins.min.js', to: 'gremlins.min.js' },
        { from: 'src/popup/popup.css', to: 'popup.css' } // Add this line
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
      inject: 'body' // Ensure scripts are injected at the end of the body
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'gremlins.js': path.resolve(__dirname, 'node_modules/gremlins.js/dist/gremlins.min.js')
    }
  }
};
