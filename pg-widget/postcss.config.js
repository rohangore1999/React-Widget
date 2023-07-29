const plugins = [require("tailwindcss"), require("autoprefixer")];

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.js"],
  defaultExtactor: function (content) {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
  },
});

plugins.push(purgecss);

const cssnano = require("cssnano")({ preset: "default" });

plugins.push(cssnano);

module.exports = [{ plugins: plugins }];
