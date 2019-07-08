module.exports = {
    entry: './public/src/main.js',
    output: {
      filename: './public/build/bundle.js'
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    }
  }