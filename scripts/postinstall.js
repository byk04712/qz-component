/*
 * @Author: 秦真
 * @Date: 2022-02-18 10:21:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-18 10:51:02
 * @Description: 
 * @FilePath: \bgy-component\scripts\postinstall.js
 */
const package = require('../package.json')
const env = process.env;
const ADBLOCK = is(env.ADBLOCK);
const CI = is(env.CI);
const COLOR = is(env.npm_config_color);
const DISABLE_OPENCOLLECTIVE = is(env.DISABLE_OPENCOLLECTIVE);
const SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

function log(it) {
  // eslint-disable-next-line no-console,no-control-regex
  console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''));
}

if (!ADBLOCK && !CI && !DISABLE_OPENCOLLECTIVE && !SILENT) {
  log(`\u001B[96m感谢您安装并使用 bgy-component@${package.version} (\u001B[94m ${package.repository.url} \u001B[96m)\u001B[0m\n`);
  log(`\u001B[96m如遇到组件问题或者任何建议，欢迎给我们提 issue (\u001B[94m ${package.bugs.url} \u001B[96m)\u001B[0m`);
}
