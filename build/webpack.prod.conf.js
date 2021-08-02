const { resolve } = require('path')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const webpackConfigBase = require('./webpack.base.conf')

module.exports = merge(webpackConfigBase({prod: true}), {
  mode: 'production',
  devtool: 'source-map',
  cache: {
		type: 'filesystem',
		buildDependencies: {
		  config: [__filename]
		}
	},
  plugins: [
		new CopyWebpackPlugin({
			patterns: [{
				from: resolve(__dirname, "../public"),
				to: './',
				globOptions: {
					dot: true,
					gitignore: true,
					ignore: ["**/index.html*"],
				}
			}]
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[id].[contenthash:8].css',
		})
	],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
  }
})