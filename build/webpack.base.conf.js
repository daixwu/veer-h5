const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin }  = require('vue-loader')

const envDefaults = {
  prod: false,
}

module.exports = (env = envDefaults) => {
  return  {
    target: 'web',
    entry: {
      main: './src/main.js'
    },
    output: {
      path: resolve(__dirname, '../dist'),
      filename: 'js/[name].[chunkhash].js',
      publicPath: env.prod === true ? './' : '/',
      clean: true
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue': '@vue/runtime-dom',
        '@': resolve(__dirname, './src'),
        assets: resolve(__dirname, './src/assets/'),
        img: resolve(__dirname, './src/assets/images'),
        utils: resolve(__dirname, './src/utils'),
        api: resolve(__dirname, './src/api'),
      },
    },
    module: {
      rules: [
        {
          test : /\.vue$/,
          use  : 'vue-loader',
        },
        {
          oneOf: [
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
              test: /\.(scss|css)$/,
              use: [
                env.prod === true ? 
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../'
                  }
                } : 'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ]
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              type: 'asset/resource',
              generator: {
                filename: 'fonts/[name].[hash:8][ext]'
              }
            },
            {
              test: /\.(png|jpg|jpeg|gif|svg)/,
              type: 'asset/resource',
              generator: {
                filename: 'images/[name].[hash:8][ext]',
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../public/index.html'),
        filename: "index.html",
        title: 'webpack5+vue3',
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        },
      }),
      new VueLoaderPlugin(),
      new ESLintPlugin(),
  
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.prod === true ? 'production' : 'development'),
        },
        __VUE_OPTIONS_API__   : JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__ : JSON.stringify(env.prod !== false),
      }),
  
      // new workboxWebpackPlugin.GenerateSW({
      //   // 1、帮助 serviceWorker 快速启动
      //   // 2、删除旧的 serviceWorker
  
      //   // 生成一个 serviceWorker 的配置文件（在入口js文件中做配置）
      //   clientsClaim: true,
      //   skipWaiting: true
      // })
      
    ],
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
    },
  }
}