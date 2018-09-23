const webpack = require('webpack')
const path = require('path')
// const CreateFileWebpack = require('create-file-webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const _ = require('lodash')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


const APP_DIR = path.resolve(__dirname, 'src/')
// let BUILD_DIR = path.resolve(__dirname, 'dist/')

let APP_PATH_STRING
let CSS_PATH_STRING

// const htmlTemplateCompiler = _.template(htmlTemplate)

// const config
module.exports = (env) => {
  const plugins = []

  plugins.push(
    new webpack.ProvidePlugin({
      d3: 'd3',
    }),
  )

  if (env === 'prod') {
    BUILD_DIR = path.resolve(__dirname, 'prod/')
    // if (git_rev.isTagDirty()) {
    //   APP_PATH_STRING = ''
    // } else {
    //   APP_PATH_STRING = ''
    // }
    plugins.push(new UglifyJsPlugin())
    CSS_PATH_STRING = APP_PATH_STRING
  } else if (env === 'dev') {
    BUILD_DIR = path.resolve(__dirname, 'docs/')
    APP_VERSION_STRING = 'dev'
    APP_PATH_STRING = ''
    CSS_PATH_STRING = ''
  }

  return {
    entry: `${APP_DIR}/react-dom-build.js`,
    mode: 'development',
    output: {
      path: BUILD_DIR,
      filename: 'react-dom-build.js',
      library: 'evaluate-jsx',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    watchOptions: { poll: true },
    plugins,
  }
}

// module.exports = config
