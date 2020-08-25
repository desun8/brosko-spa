module.exports = {
  plugins: [
    require("postcss-media-minmax")(),
    require("postcss-custom-media")(),
    require("postcss-preset-env")({ stage: 0 }),
    require("autoprefixer")
  ],
};
