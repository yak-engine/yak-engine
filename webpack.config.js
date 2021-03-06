const path = require('path');

module.exports = {
  entry: './demo.ts',
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    port: 9001,
    hot: false,
    inline: true,
    open: true,
    watchOptions: {
      ignored: '/node_modules'
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  }
};