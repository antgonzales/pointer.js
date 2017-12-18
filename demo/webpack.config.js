const path = require('path')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src')
    }]
  }
}

module.exports = config
