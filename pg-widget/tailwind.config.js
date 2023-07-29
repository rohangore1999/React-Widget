module.exports = {
  mode: "jit",
  important: true,
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  content: ["./src/**/*.js", "./public/**/*.html"],
  plugins: [require("tw-elements/dist/plugin")],
};
