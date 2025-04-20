// index.native.js
// — POLYFILL setImmediate for RN/Expo Go —
if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
  }
  // — EXPORT your compiled CJS bundle —
  module.exports = require('./dist/index.js');
  