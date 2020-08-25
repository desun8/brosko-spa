const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    main: "./src/index.js",
    preloader: "./src/preloader.js"
  },
  output: {
    path: path.resolve(__dirname, "../../public/brosko"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // вы можете также указать файл, например `variables.scss`
              // use `data` here if sass-loader version < 8
              prependData: `
              @import "src/scss/_variables.scss";
              @import "src/scss/_mixins.scss";
              @import "src/scss/_custom-media.pcss";
              `
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: "pug-plain-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "./brosko/fonts"
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              publicPath: "./brosko/images"
            }
          }
        ]
      },
      {
        test: require.resolve("snapsvg/dist/snap.svg.js"),
        use: "imports-loader?this=>window,fix=>module.exports=0"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      snapsvg: "snapsvg/dist/snap.svg.js"
    }
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new VueLoaderPlugin(),
    new LodashModuleReplacementPlugin()
  ]
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\\/]node_modules[\\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
};

module.exports = config;
