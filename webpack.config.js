const path = require('path');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: "./index.ts"
  },
  output: {
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
      rules: [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
      ]
  }
};
