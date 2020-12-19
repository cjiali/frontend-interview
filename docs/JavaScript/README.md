# [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

**JavaScript (** **JS** ) 是一种具有[函数优先](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)的轻量级，解释型或即时编译型的编程语言。虽然它是作为开发Web 页面的脚本语言而出名的，但是它也被用到了很多[非浏览器环境](https://en.wikipedia.org/wiki/JavaScript#Uses_outside_Web_pages)中，例如 [Node.js](https://nodejs.org/)、 [Apache CouchDB](https://couchdb.apache.org/) 和 [Adobe Acrobat](http://www.adobe.com/devnet/acrobat/javascript.html)。JavaScript 是一种[基于原型编程](https://developer.mozilla.org/zh-CN/docs/Glossary/Prototype-based_programming)、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。了解更多[ JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/About_JavaScript)。

本部分将专注于 JavaScript 语言本身，而非局限于网页或其他限制环境。想要了解网页有关的 [APIs](https://developer.mozilla.org/zh-CN/docs/Glossary/API) ，请参考 [Web APIs](https://developer.mozilla.org/zh-CN/docs/Web/API) 以及 [DOM](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)。

JavaScript 的标准是 [ECMAScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources) 。截至 2012 年，所有的[现代浏览器](https://kangax.github.io/compat-table/es5/)都完整的支持 ECMAScript 5.1，旧版本的浏览器至少支持 ECMAScript 3 标准。2015年6月17日，[ECMA国际组织](https://www.ecma-international.org/)发布了 ECMAScript 的第六版，该版本正式名称为 ECMAScript 2015，但通常被称为 ECMAScript 6 或者 ES6。自此，ECMAScript 每年发布一次新标准。本文档目前覆盖了最新 ECMAScript 的草案，也就是 [ECMAScript2020](https://tc39.github.io/ecma262/)。

不要将 JavaScript 与 [Java编程语言](https://en.wikipedia.org/wiki/Java_(programming_language)) 混淆。虽然“Java”和“JavaScript”都是 Oracle 公司在美国和其他国家注册（或未注册）的商标，但是这两门语言在语法、语义与用途方面有很大不同。

## 教程

通过使用指南和教程来学习如何用JavaScript语言编程。

### 对于完全初学者

如果你想学习 JavaScript，但苦于没有过 JavaScript 或者其他语言的编程经验，你可以投入到我们的 [JavaScript 主题学习区](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)。那里有完整的学习资源：

- [JavaScript 第一步](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps)

  回答一些基本问题，比如“JavaScript 是什么？”、“它是怎么样的？”、“它可以用来做什么？”；同时还讨论如变量、字符串、数值和数组等 JavaScript 的核心特性。

- [JavaScript 基本结构](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks)

  继介绍了 JavaScript 基本的核心特性后，我们需要关注常见的代码块类型，如条件语句，循环，函数和事件。

- [介绍JavaScript 对象](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects)

  如果你想进一步使用该语言撰写更有效率的代码，理解 JavaScript 面向对象的精髓是很重要的，因此我们提供了该模块来帮助你理解它。

### JavaScript 指南

- [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)

  一份更详尽的 JavaScript 指南，适用于有过 JavaScript 或其他语言编程经验的读者。

### 中级内容

- [客户端 Web API](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs)

  当你正在给网页或者网页 APP 编写客户端 JavaScript 时， 你离不开使用这些 API — 这些用来操作浏览器各个不同方面和网页所在的操作系统，甚至是来自于其他网页和服务器的数据的接口。在这个模块，我们来探究这些 API 是什么，以及怎么在你的日常开发工作中使用一些最常用的 API。

- [重新介绍 JavaScript（JS 教程）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

  给那些有 JavaScript 基础的朋友们的 JavaScript概述。

- [JavaScript 数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

  JavaScript 数据结构的概述。

- [如何使用比较操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_when_to_use_them)

  JavaScript 提供了三种比较操作符，包括严格比较操作符 `===` 和非严格的比较操作符 `==`，以及 [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法。

- [闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

  闭包是一个函数与其本身所被定义的词法环境的结合。

### 高级内容

- [继承和原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

  基于原型继承被外界广泛地误解与低估，这一版块对基于原型的继承作出详细解释。

- [严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

  严格模式规定不能使用未定义的变量。严格模式是对 ECMAScript 5 的严格限制，以求得更高效的性能和更便利的调试。

- [JavaScript 类型数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)

  为使 JavaScript 处理原始二进制数据而提供的类型数组。

- [内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

  JavaScript 中的内存生命周期和垃圾回收机制。

- [并发模型以及事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

  JavaScript 具有基于“事件循环”的并发模型。

## 参考

浏览完整的 [JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)文档。

- [标准对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

  标准的内置对象例如 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array), [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean), [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date), [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error), [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Function), [`JSON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON), [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math), [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number), [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object), [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp), [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String), [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map), [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set), [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/WeakMap) , [`WeakSet`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) 以及其他对象

- [表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)

  运算符的作用：[`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof), [`typeof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof), [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new), [`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)，[运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)，以及其他运算符。

- [语句和声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements)

  了解 [`do-while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while), [`for-in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in), [`for-of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of), [`try-catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch), [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let), [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var), [`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const), [`if-else`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else), [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch) 以及其他语句和关键字的作用。

- [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

  学习如何使用 JavaScript 函数来开发你的应用。

## 工具和资源

用于编写和调试 JavaScript 代码的实用工具。

- [Firefox 开发工具](https://developer.mozilla.org/zh-CN/docs/Tools)

  包括 [Scratchpad](https://developer.mozilla.org/zh-CN/docs/Tools/Scratchpad)、[Web Console](https://developer.mozilla.org/zh-CN/docs/Tools/Web_Console)、[JavaScript Profiler](https://developer.mozilla.org/zh-CN/docs/Tools/Profiler)、[Debugger](https://developer.mozilla.org/zh-CN/docs/Tools/Debugger) 等等

- [JavaScript Shells](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Shells)

  允许您快速测试 JavaScript 代码片段。

- [TogetherJS](https://togetherjs.com/)

  添加 TogetherJS 到您的网站，让用户实时互助，协作更简单。

- [Stack Overflow](https://stackoverflow.com/questions/tagged/javascript)

  你可以在 [StackOverflow ](https://stackoverflow.com/)查看或者发布带有 JavaScript 标签的问题。

- [JavaScript版本和发行记录](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript)

  浏览 JavaScript 的历史版本特性和实现情况.

- [JSFiddle](https://jsfiddle.net/)

  编辑 JavaScript、CSS 和 HTML 并获得实时结果。使用外置资源，并和你的团队在线合作。

- [Plunker](https://plnkr.co/)

  Plunker 是一个在线社区，用于创建，协作和共享您的 Web 开发创意。编辑您的 JavaScript、CSS 和 HTML 文件并获取实时结果和文件结构。

- [JSBin](https://jsbin.com/)

  JS Bin 是一种开源的协作式的web 开发调试工具。