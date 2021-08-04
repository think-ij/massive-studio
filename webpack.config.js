const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // mini-css-extract-plugin 로드

module.exports = {
  entry: ['./src/assets/js/main.js', './src/assets/scss/style.scss'],
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.app.js' },

  // setting plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // before build template
      filename: 'index.html', // after build filename
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment',
    }), // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({
      // MiniCssExtractPlugin.loader 의 publicPath: '../' 의 설정을 통해 // js 폴더를 빠져나와 dist/css/style.css 를 생성하게 됨
      filename: 'css/style.css',
    }),
  ],
  module: {
    rules: [
      {
        // 대상 파일 지정
        test: /\.s(a?c)ss$/, // /\.(sa|sc|c)ss$/, /\.s(a?c)ss$/,
        use: [
          // 트랜스파일링이 된 것을 외부 css 파일로 추출하는 역할
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath 는 Webpack 이 번들을 (선택적으로)로드 할 곳입니다. // entry 가 현재 'js/index' 로 js 폴더 내에 생성하지 않고 상위폴더로 빼내기 위함
              publicPath: '../',
            },
          }, // css-loader : css 를 CommonJS 방식의 js 로 트랜스파일링 하는 역할
          'css-loader', // sass-loader : 기본적으로 node-sass 를 사용하여 sass 를 css 로 컴파일하는 역할
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
                indentType: 'tab', // 정의되어 있지 않으면 기본값은 space
                indentWidth: 1, // 기본값 2
              },
            },
          }, // "sass-loader?outputStyle=expanded", // outputStyle=compressed
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
  },
  mode: 'development',
};
