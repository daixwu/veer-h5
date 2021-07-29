// webpack.config.js
const { resolve } = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log('resolve: ', resolve(__dirname, '../dist'));

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
      filename: 'js/[name].js',
      path: resolve(__dirname, '../dist'),
      assetModuleFilename: 'images/[name].[hash][ext][query]',
      clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../' // 使url的查找路径为dist根路径
                }
              },
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ]
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name].[hash:8][ext][query]'
            }
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)/,
            type: 'asset/resource',
          },
          {
            test: /\.html?$/,
            loader: 'html-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制html文件，并自动引入打包后的所有资源
      template: './src/templates/index.html',
      filename: "index.html",
      // html 压缩配置
      // minify:{
      //   // 移除空格
      //   collapseWhitespace: true,
      //   // 移除注释
      //   removeComments: true,
      //   // 压缩 去掉引号
      //   removeAttributeQuotes: true 
      // }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.[contenthash:8].css',
    }),
    new ESLintPlugin(),

    // new workboxWebpackPlugin.GenerateSW({
    //   // 1、帮助 serviceWorker 快速启动
    //   // 2、删除旧的 serviceWorker

    //   // 生成一个 serviceWorker 的配置文件（在入口js文件中做配置）
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
    
  ],
  devServer: {
    contentBase: '/dist',
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    inline: true
  },
}