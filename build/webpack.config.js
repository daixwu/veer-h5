// webpack.config.js
const { resolve } = require('path');

module.exports = {
    mode: 'development',
    entry: {
      app: './src/main.js'
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, '../dist')
        
    }
}