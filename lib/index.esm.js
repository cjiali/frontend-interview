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

/**
 * new 执行过程：
 * - 新生成一个对象
 * - 链接到原型: `obj.__proto__ = constructor.prototype`
 * - 绑定this: `constructor.apply(obj)`
 * - 返回新对象(如果构造函数有自己的返回值时，则返回该值)
 */
function $new() {
  /* 新生成一个对象 */
  var obj = new Object();
  var constructor = Array.prototype.shift.call(arguments); // 获得构造函数

  /* 链接到原型 */

  obj.__proto__ = constructor.prototype;
  /* 绑定this */

  var result = constructor.apply(obj, arguments);
  /* 返回新对象 */

  return _typeof(result) === "object" ? result : obj; // 确保 new 出来的是个对象
}

export { $new, type };
