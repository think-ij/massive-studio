const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/assets/js/main.js',
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.app.js' },

  // setting plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // before build template
      filename: 'index.html', // after build filename
    }),
  ],
  mode: 'development',
};
