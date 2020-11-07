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



## instanceof  操作符

`instanceof` 可以正确的判断对象的类型，其内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

```js
function $instanceof(instance, constructor) {
    let prototype = constructor.prototype;
    let __proto__ = instance.__proto__;
    do {
        if (__proto__ === prototype) return true;
    } while ((__proto__ = __proto__.prototype));

    return false;
}
```



## 改变 this 指向

由于 JS 的设计原理：在函数中，可以引用运行环境中的变量。因此就需要一个机制来让我们可以在函数体内部获取当前的运行环境，这便是`this`。

因此要明白 `this` 指向，其实就是要搞清楚 函数的运行环境，简单来说就是，谁调用了函数。例如:

- `obj.fn()`，便是 `obj` 调用了函数，既函数中的 `this === obj`
- `fn()`，这里可以看成 `window.fn()`，因此 `this === window`

但这种机制并不完全能满足我们的业务需求，因此提供了三种方式可以手动修改 `this` 的指向:

- `call: fn.call(target, 1, 2)`
- `apply: fn.apply(target, [1, 2])`
- `bind: fn.bind(target)(1,2)`

`call` 和 `apply` 都是为了解决改变 `this` 的指向，作用都是相同的，只是传参的方式不同。`bind` 和其他两个方法作用也是一致的，只是该方法会返回一个函数；并且可以通过 `bind` 实现柯里化。

除了第一个参数外，`call` 可以接收一个参数列表，`apply` 只接受一个参数数组。

### `fn.call(target, 1, 2)`

```js
Function.prototype.$call = function () {
    let context = Array.prototype.shift.call(arguments) || window;
    // 给 context 添加一个原来不存在的临时属性，以避免污染原有属性
    let key;
    do {
        key = Math.random();
    } while (context[key]);
    context[key] = this;
    // 获取执行结果
    let result = context[key](...arguments);
    // 清除临时属性
    delete context[key];

    return result;
};
```

### `fn.apply(target, [1, 2])`

```js
Function.prototype.$apply = function () {
    let context = Array.prototype.shift.call(arguments) || window;
    // 给 context 添加一个原来不存在的临时属性，以避免污染原有属性
    let key;
    do {
        key = Math.random();
    } while (context[key]);
    context[key] = this;
    // 获取执行结果
    let result = arguments[0] ? context[key](...arguments[0]) : context[key]();
    // 清除临时属性
    delete context[key];

    return result;
};
```

### `fn.bind(target)(1, 2)`

```js
Function.prototype.$bind = function (context) {
    let fn = this,
        args = Array.prototype.slice.call(arguments, 1);
    let bound = function () {
        // 因为返回了一个函数，可以使用 `new bound()` 构造实例（new 绑定等级高于显式绑定），故需要使用 instanceof 判断是否为构造函数调用
        // 作为构造函数调用时，保留 this 指向不做修改
        return fn.apply(this instanceof bound ? this : context, args.concat([...arguments]));
    };
    // 维护原型链（继承）
    let NOP = function(){};
    if(this.prototype){
        NOP.prototype = this.prototype;
    }
    bound.prototype = new NOP();
    bound.prototype.constructor = bound;
    return bound;
};
```



## 函数柯里化

在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数 **预置通用参数**，供多次重复调用。

```js
function curriedAdd(x) {
	return function (y) {
		return x + y
	}
}

const add = curriedAdd(1)

add(2) === 3
add(20) === 21
```

对 `curriedAdd` 进行抽象，可能会得到如下函数 `curry` ：

```js
function curry(fn, ...args) {
    return args.length >= fn.length
        ? fn(...args)
        : function () {
              return curry(fn, ...args, ...arguments);
          };
}
```

在此实现中，我们通过递归来将 curry 的返回的函数进行了柯里化。

此外还可利用` fn.bind(target)(1,2)`和箭头函数实现函数柯里化：

```js
// fn.bind(target)(1,2) 形式
add.bind(null, x, y, z)();
add.bind(null, x, y)(z);
add.bind(null, x)(y, z);
add.bind(null)(x, y, z);

//箭头函数形式
((a,b,c)=>add(a,b,c))(x,y,z);
((a,b)=>add(x,a,b))(y,z);
((c)=>add(x,y,c))(z)
(()=>add(x,y,z))();
```

> PS：这里通过 `jsPerf` 进行性能测试，可得性能：`箭头函数`>`bind`>`curry`。
>
> curry 函数相比 bind 函数，其原理相似，但是性能相差巨大，其原因是 bind 由浏览器实现，运行效率有加成。
>
> 从这个结果看 **curry** 性能无疑是最差的，但是另一方面就算最差的 `curry` 的实现，也能在本人的个人电脑上达到 50w Ops/s 的情况下，说明这些性能是无需在意的。





## 防抖与节流

一个经典比喻：

> 想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略 debounce 和 throttle，超时设定为15秒，不考虑容量限制。
> 函数防抖（debounce） 策略的电梯：如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。
> 函数节流（throttle） 策略的电梯：保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。

即：

> 函数防抖： 在调用操作一定时间后，才会执行该方法，如果在该段时间内，再次调用该方法，则重新计算该执行时间间隔。
> 函数节流： 调用方法之前，预先设定一个执行周期，当调用动作的时间节点大于等于这个执行周期，才执行该方法，然后进入下一个新的执行周期。

简而言之，函数防抖和函数节流都是为了降低方法的执行频率，防止函数触发频率过高，导致浏览器响应速度跟不上触发频率，而出现浏览器假死、卡顿等现象，优化用户体验。

### 防抖 (debounce)

将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

```js
/**
 * 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {Function} fn 高频操作函数
 * @param {Number} wait 等待（间隔）时间
 * @param {Boolean} immediate 是否立即执行
 */
export default function debounce(fn, wait, immediate) {
    let timeout = null,
        result;
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function () {
        let context = this, args = arguments;
        if (immediate && !timeout) {
            result = fn.apply(context, args);
        }
        clearTimeout(timeout);
        timeout = immediate
            ? setTimeout(() => {
                  timeout = null;
              }, wait)
            : setTimeout(() => {
                  fn.apply(context, args);
              }, wait);

        return result;
    };
}
```


