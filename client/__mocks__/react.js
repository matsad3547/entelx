const react = require('react');
// Resolution for requestAnimationFrame not supported in jest error :
// https://github.com/facebook/react/issues/9102#issuecomment-283873039
global.window = global;
window.addEventListener = () => {};

window.cancelAnimationFrame = window.clearTimeout
window.requestAnimationFrame = (cb) => window.setTimeout(cb, 1000 / 60)

module.exports = react;
