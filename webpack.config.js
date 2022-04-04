var path = require("path");
module.exports = {
  mode: "development",
  entry:
  {
    app: ["./Code/App.ts"]
  },
  optimization:
  {
    sideEffects: false
  },
  output:
  {
    path: path.resolve(__dirname, "build"),
    filename: "build.js",
    publicPath: "/Resources/"
  },
  resolve:
  {
    extensions: ['.ts', '.tsx', '.js']
  },
  module:
  {
    rules:
    [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}