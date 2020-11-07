function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var class2type = "Boolean Number String Function Array Date RegExp Object Error".split(" ").reduce(function (acc, cur) {
  acc["[object ".concat(cur, "]")] = cur.toLocaleLowerCase();
  return acc;
}, {});
function type(obj) {
  // if (obj === null) return obj + "";
  if (obj == null) return String(obj); // Support: Android <=2.3 only (functionish RegExp)

  return _typeof(obj) === "object" ? class2type[{}.toString.call(obj)] || "object" // class2type[Object.prototype.toString.call(obj)] || "object"
  : _typeof(obj);
}

export { type };
