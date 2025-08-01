const path = require('path');

module.exports = {
  optimization: { minimize: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { node: '14' } }]]
          }
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'functions-build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  }
};
