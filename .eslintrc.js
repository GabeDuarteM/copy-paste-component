module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier", "prettier/react"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "linebreak-style": "off",
  },
}
