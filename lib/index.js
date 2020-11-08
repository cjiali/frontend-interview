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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

/**
 * 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} wait 等待（间隔）时间
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(fn, wait, immediate) {
  var timeout = null,
      result; // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法

  return function () {
    var context = this,
        args = arguments;

    if (immediate && !timeout) {
      result = fn.apply(context, args);
    }

    timeout && clearTimeout(timeout);
    timeout = immediate ? setTimeout(function () {
      timeout = null;
    }, wait) : setTimeout(function () {
      fn.apply(context, args);
    }, wait);
    return result;
  };
}

/**
 * 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} delay 下一次执行需延迟时间
 * @param {Number} must 多少时间内必须执行一次
 */
function throttle(fn, delay) {
  var timeout = null;
  return function () {
    var context = this,
        args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fn.apply(context, args);
      }, delay);
    }
  };
}

function inherit(C, P) {
  // 创建一个没有实例方法的类
  var F = function F() {};

  F.prototype = P.prototype; // 将实例作为子类的原型

  C.prototype = new F(); // 父类实例

  C.prototype.constructor = C; // constructor 归位

  C.prototype.uber = P.prototype; // 保留父类原型

  return C;
}

/**********************************************************************************************************************
简易版本的 Promise  封装步骤(this <== Promise.prototype)：
第一步： 列出三大块  `resolve/reject`, `executor(resolve,reject)`, `this.then/this.catch`
第二步： `resolve/reject` 中切换状态并异步执行所有的回调方法，`executor(resolve,reject)` 立即同步执行，`this.then/this.catch` 中注册所有的回调方法
第三步： `resolve/reject` 函数体内使用 `setTimeout` 进行包裹，以防止尚未进行 then 注册就直接执行 `resolve/reject` 的回调方法
第四步： `this.then/this.catch` 需返回 this 以实现链式调用
第五步： 状态管理： `pending` 状态注册回调方法, `fulfilled` 执行成功时的回调方法, `rejected` 执行错误时的回调方法
**********************************************************************************************************************/
var PENDING = 'pending';
var RESOLVED = 'resolved';
var REJECTED = 'rejected';
var $status = PENDING,
    // 给 Promise 对象指定 status 属性，初始值为 'pending'
$value = undefined,
    // 给 Promise 对象指定一个存储结果的 data
$callbacks = []; // 每个元素的结构：{onResolved(){}，onRejected(){}}

/**
 * $Promise 构造函数
 * executor: 执行器函数
 */

function $Promise(executor) {
  // const self = this;
  // self.status = 'pending'; // 给 Promise 对象指定 status 属性，初始值为 'pending'
  // self.data = undefined; // 给 Promise 对象指定一个存储结果的 data
  // self.callbacks = []; // 每个元素的结构：{onResolved(){}，onRejected(){}}
  function resolve(result) {
    if (PENDING !== $status) {
      // 如果当前状态不是 'pending'，则不执行
      return;
    } // 将状态改为 'resolved'


    $status = RESOLVED; // 保存 value 的值

    $value = result; // 如果有待执行的 callback 函数，立即异步执行回调函数 onResolved

    if ($callbacks.length > 0) {
      setTimeout(function () {
        $callbacks.forEach(function (_ref) {
          var onResolved = _ref.onResolved;
          onResolved(result);
        });
      });
    }
  }

  function reject(error) {
    if (PENDING !== $status) {
      return;
    } // 将状态改为 'rejected'


    $status = REJECTED; // 保存 value 的值

    $value = error; // 如果有待执行的 callback 函数，立即异步执行回调函数 onRejected

    if ($callbacks.length > 0) {
      setTimeout(function () {
        $callbacks.forEach(function (_ref2) {
          var onRejected = _ref2.onRejected;
          onRejected(error);
        });
      });
    }
  }

  try {
    // 立即同步执行 executor
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
/**
 * Promise 原型对象的 then 方法
 * 指定一个成功/失败的回调函数
 * 返回一个新的 Promise 对象
 */

$Promise.prototype.then = function (_onResolved, _onRejected) {
  /**
   * 值穿透：
   * 解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
   *      也即，当传入 then 的不是函数的时候，这个then是无效的。
   * 原理：当 then中 传入的不算函数，则这个 then 返回 promise 的 data 将会保存上一个的 promise.data。
   */
  _onResolved = typeof _onResolved === 'function' ? _onResolved : function (res) {
    return res;
  };
  _onRejected = typeof _onRejected === 'function' ? _onRejected : function (err) {
    throw err;
  };
  return new $Promise(function (resolve, reject) {
    function handle(callback) {
      try {
        var result = callback($value);

        if (result instanceof $Promise) {
          result.then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }

    if (PENDING === $status) {
      $callbacks.push({
        onResolved: function onResolved() {
          handle(_onResolved);
        },
        onRejected: function onRejected() {
          handle(_onRejected);
        }
      });
    } else if (RESOLVED === $status) {
      setTimeout(function () {
        handle(_onResolved);
      });
    } else {
      setTimeout(function () {
        handle(_onRejected);
      });
    }
  });
};
/**
 * Promise 原型对象的 catch 方法
 * 指定一个失败的回调函数
 * 返回一个新的 Promise 对象
 */


$Promise.prototype["catch"] = function (onRejected) {
  /**
   * catch 方法的作用跟 then 方法的第二个回调函数一样
   */
  return this.then(undefined, onRejected);
};
/**
 * Promise 函数对象的 resolve 方法
 * 返回一个指定结果的 Promise 对象
 */


$Promise.resolve = function (result) {
  /**
   * Promise.resolve方法可以传三种值
   *      1. 不是 promise
   *      2. 成功状态的 promise
   *      3. 失败状态的 promise
   * 例如：
   *      Promise.resolve(1)
   *      Promise.resolve(Promise.resolve(1))
   *      Promise.resolve(Promise.reject(1))
   */
  return new $Promise(function (resolve, reject) {
    if (result instanceof $Promise) {
      result.then(function (res) {
        resolve(res);
      }, function (err) {
        reject(err);
      });
    }
  });
};
/**
 * Promise 函数对象的 reject 方法
 * 返回一个指定 error 的失败状态的 Promise 对象
 */


$Promise.reject = function (error) {
  return new $Promise(function (resolve, reject) {
    reject(error);
  });
};
/**
 * Promise 函数对象的 all 方法
 * 返回一个 Promise 对象，只有当所有 Promise 都成功时返回的 Promise 状态才成功
 */


$Promise.all = function (promises) {
  var values = new Array(promises.length);
  var count = 0; // 计状态为 'resolved' 的promise的数量

  return new $Promise(function (resolve, reject) {
    // 遍历promises，获取每个promise的结果
    promises.forEach(function (p, i) {
      $Promise.resolve(p) // 把不是 promise 的值包装成 promise
      .then(function (res) {
        // 遍历所有的 promise 的状态都为 'resolved',则返回的 promise 状态为 'resolved'
        // p 状态为 resolved，将值保存起来
        values[i] = value;
        count++; // 如果全部 p 都为 'resolved' 状态，return 的 promise 状态为 resolved

        if (count === promises.length) {
          resolve(values);
        }
      }, function (err) {
        // 只要有一个失败，return 的 promise 状态就为 'reject'
        reject(err);
      });
    });
  });
};
/**
 * Promise 函数对象的 race 方法
 * 返回一个 Promise 对象，状态由第一个完成的 Promise 决定
 */


$Promise.race = function (promises) {
  return new $Promise(function (resolve, reject) {
    // 遍历promises，获取每个promise的结果
    promises.forEach(function (p, index) {
      Promise.resolve(p) // 把不是 promise 的值包装成 promise
      .then(function (res) {
        // 只要有一个成功，返回的 promise 的状态就为 'resolved'
        resolve(res);
      }, function (err) {
        // 只要有一个失败，返回的 promise 状态就为 'reject'
        reject(err);
      });
    });
  });
};

/**
 * 浅拷贝
 * @param {*} target
 */
function shallowCopy(target) {
  // 只拷贝对象
  if (!target || _typeof(target) !== "object") return; // 根据 target 的类型判断是新建一个数组还是对象

  var clone = Array.isArray(target) ? [] : {}; // 遍历 target，并且判断是 target 的属性才拷贝

  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = target[key];
    }
  }

  return clone;
}
/**
 * 深拷贝
 * @param {*} target
 */

function deepCopy(target) {
  if (!target || _typeof(target) !== "object") return;
  var clone = Array.isArray(target) ? [] : {};

  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = _typeof(target[key]) === "object" ? deepCopy(target[key]) : target[key];
    }
  }

  return clone;
}

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, callback) {
      var callbacks = this.events[event] || [];
      callbacks.push(callback);
      this.events[event] = callbacks;
      return this;
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      var callbacks = this.events[event];
      this.events[event] = callbacks && callbacks.filter(function (fn) {
        return fn !== callback;
      });
      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var callbacks = this.events[event];
      callbacks.forEach(function (fn) {
        fn.apply(void 0, args);
      });
      return this;
    }
  }, {
    key: "once",
    value: function once(event, callback) {
      var _this = this;

      var wrapFn = function wrapFn() {
        callback.apply(void 0, arguments);

        _this.off(event, wrapFn);
      };

      this.on(event, wrapFn);
      return this;
    }
  }]);

  return EventEmitter;
}();

var EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function addEvent(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  // 移除事件
  removeEvent: function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  // 获取事件目标
  getTarget: function getTarget(event) {
    return event.target || event.srcElement;
  },
  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function getEvent(event) {
    return event || window.event;
  },
  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function stopPropagation(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault: function preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};

exports.$Promise = $Promise;
exports.$instanceof = $instanceof;
exports.$new = $new;
exports.EventEmitter = EventEmitter;
exports.EventUtils = EventUtils;
exports.curry = curry;
exports.debounce = debounce;
exports.deepCopy = deepCopy;
exports.inherit = inherit;
exports.shallowCopy = shallowCopy;
exports.throttle = throttle;
exports.type = type;
