# Mock Implements

### 类型判断

判断变量的类型时，单单用 typeof 并无法完全满足，这其实并不是 Bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

- 基本类型(`null`): 使用 `String(null)`
- 基本类型(`string / number / boolean / undefined`) + `function`: 直接使用 `typeof`即可
- 其余引用类型(`Array / Date / RegExp Error`): 调用`toString`后根据`[object XXX]`进行判断

`typeof` 对于基本类型（除了 `null`） 都可以显示正确的类型。

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
```

`typeof` 对于对象（除了函数）都会显示 `object`。

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

对于 `null` 来说，虽然它是基本类型，但是其类型会显示为 `object`，这是一个存在很久了的 Bug：

```js
typeof null // 'object'
```

> PS：为什么会出现这种情况呢？因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，`000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来

如果需要获得一个变量的正确类型，可以通过 `Object.prototype.toString.call(xx)`，这样就可以获得类似 `[object Type]` 的字符串。

```js
Object.prototype.toString.call(1)     // "[object Number]"
Object.prototype.toString.call('1')   // "[object String]"
Object.prototype.toString.call(undefined)     // "[object Undefined]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(Symbol())     // "[object Symbol]"
Object.prototype.toString.call(b)     // b 没有声明，会报错："Uncaught ReferenceError: b is not defined"

Object.prototype.toString.call(null)  // "[object Null]"
Object.prototype.toString.call({})    // "[object Object]"
Object.prototype.toString.call([])    // "[object Array]"
Object.prototype.toString.call(function a(){}) // "[object Function]"
```

此外，也可以通过`a === undefined`判断 undefined，但是 undefined 不是保留字，能够在低版本浏览器被赋值（`let undefined = 1`），这样判断就会出错，所以可以用下面的方式来判断，并且代码量更少：

```js
// void 后面随便跟上一个组成表达式
// 返回就是 undefined
a === void 0; // true
```

很稳的判断封装:

```js
let class2type = "Boolean Number String Function Array Date RegExp Object Error".split(" ").reduce((acc, cur) => {
    acc[`[object ${cur}]`] = cur.toLocaleLowerCase();
    return acc;
}, {});

function type(obj) {
    // if (obj === null) return obj + "";
    if (obj == null) return String(obj);
    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object"
        ? class2type[{}.toString.call(obj)] || "object" // class2type[Object.prototype.toString.call(obj)] || "object"
        : typeof obj;
}
```



## new 操作符

在调用 `new` 的过程中会执行以下四个步骤：

- 新生成一个对象
- 链接到原型： `obj.__proto__ = constructor.prototype`
- 绑定 this： `constructor.apply(obj)`
- 返回新对象（如果构造函数有自己的返回值时，则返回该值）

```js
function $new() {
    /* 新生成一个对象 */
    let obj = new Object();
    let constructor = Array.prototype.shift.call(arguments);// 获得构造函数
    /* 链接到原型 */
    obj.__proto__ = constructor.prototype;
    /* 绑定this */
    let result = constructor.apply(obj, arguments);
    /* 返回新对象 */
    return typeof result === "object" ? result : obj; // 确保 new 出来的是个对象
}
```

