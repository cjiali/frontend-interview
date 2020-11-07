'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

/**
 * 通过判断对象的原型链中是否包含找到相应类型（构造函数）的 `prototype`
 * @param {Object} instance
 * @param {Function} constructor
 */
function $instanceof(instance, constructor) {
  var prototype = constructor.prototype;
  var __proto__ = instance.__proto__;

  do {
    if (__proto__ === prototype) return true;
  } while (__proto__ = __proto__.prototype);

  return false;
}

Function.prototype.$call = function () {
  var context = Array.prototype.shift.call(arguments) || window; // 给 context 添加一个原来不存在的临时属性，以避免污染原有属性

  var key;

  do {
    key = Math.random();
  } while (context[key]);

  context[key] = this; // 获取执行结果

  var result = context[key].apply(context, arguments); // 清除临时属性

  delete context[key];
  return result;
};

Function.prototype.$apply = function () {
  var context = Array.prototype.shift.call(arguments) || window; // 给 context 添加一个原来不存在的临时属性，以避免污染原有属性

  var key;

  do {
    key = Math.random();
  } while (context[key]);

  context[key] = this; // 获取执行结果

  var result = arguments[0] ? context[key].apply(context, _toConsumableArray(arguments[0])) : context[key](); // 清除临时属性

  delete context[key];
  return result;
};

Function.prototype.$bind = function (context) {
  var fn = this,
      args = Array.prototype.slice.call(arguments, 1);

  var bound = function bound() {
    // 因为返回了一个函数，可以使用 `new bound()` 构造实例（new 绑定等级高于显式绑定），故需要使用 instanceof 判断是否为构造函数调用
    // 作为构造函数调用时，保留 this 指向不做修改
    return fn.apply(this instanceof bound ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }; // 维护原型链（继承）


  var NOP = function NOP() {};

  if (this.prototype) {
    NOP.prototype = this.prototype;
  }

  bound.prototype = new NOP();
  bound.prototype.constructor = bound;
  return bound;
};

function curry(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.length >= fn.length ? fn.apply(void 0, args) : function () {
    return curry.apply(void 0, [fn].concat(args, Array.prototype.slice.call(arguments)));
  };
}

exports.$instanceof = $instanceof;
exports.$new = $new;
exports.curry = curry;
exports.type = type;
