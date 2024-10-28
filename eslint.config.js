import globals from "globals";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,vue}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  ...pluginVue.configs["flat/essential"],
];