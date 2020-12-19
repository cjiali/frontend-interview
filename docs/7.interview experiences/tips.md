# 面试技巧

# 一二面（基础面）

## 1. 一面基础面

### 1.1 面试准备

#### 1.1.1 个人简历

- 基本信息：姓名-年龄-手机-邮箱-籍贯
- 工作经历：时间-公司-岗位-职责-技术栈-业绩（哪些成就）
- 学历： 博士 > 硕士 > 本科 > 大专
- 工作经历：时间-公司-岗位-职责-技术栈-业绩
- 开源项目：GitHub和说明

#### 1.2.2 自我陈述

**1.2.2.1 把握面试的沟通方向（别把自己带到坑里面）**

答：我平时喜欢研究一些网站，并对一些技术的原理和好玩的点感兴趣，我自己也喜欢思考，也喜欢尝试探索有没有更好的方式和实现。（有所收留，不要全部说出来，稍微留一点悬念留作面试官来提问）

**1.2.2.2 豁达、自信的适度发挥**

答：适当自信，向自己擅长的方向上面来引路；要让面试官来欣赏我，而不是来鄙视他。

**1.2.2.3 自如谈兴趣**

（豁达自信，适当收住），巧妙演示实例，适时讨论疑问（不知道的问题请求指导一下，如何去解决，不要说不知道，或者不了解）

**1.2.2.4 节奏要适宜**

切忌小聪明（尽量把问题的所有实现方法都写出来，表现出来的是熟练）

### 1.2 面试实战

- 方向要对，过程要细（性能优化，过程详细） 
- 胆子要大、心态要和（算法题认真思考，认真使劲想；敢于承担责任，不要轻易放弃）

# 2. CSS

## 1 页面布局

#### 2.1.1 如何实现垂直居中布局呢？

> 1.已知宽高

```css
/*v1*/
.container {
    position: absolute;
    left: 50%;
    top: 50%;
    marigin-left: -width / 2;
    marigin-top: -width / 2;
}

/*v2*/
.container {
    position: absolute;
    top: calc(50% - 5em);
    left: calc(50% - 9em);
}
```

> 2.未知宽高

```css
/*v1*/
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/*v2:flex+ auto*/
.wrapper {
    dislay: flex;
}
.content {
    margin: auto;
}

/*v3. 父元素居中*/
.wrapper {
    display: flex;
    /* 盒子横轴的对齐方式 */
    justify-content: center;
    /* 盒子纵轴的对齐方式 */
    align-items: center;
}

/*v4.body内部居中*/
.content {
    /* 1vh = 1% * 视口高度 */
    margin: 50vh auto;
    transform: translateY(-50%);
}
```

#### 2.1.2 如何实现水平居中布局呢？

1. 如果需要居中的元素为常规流中 inline / inline-block 元素，为父元素设置 `text-align: center;`
2. 父元素上设置 `text-align: center; `居中元素上margin 为 auto。
3. 如果元素positon: absolute; 那么
   - 0）设置父元素postion: relative
   - 1）为元素设置宽度，
   - 2）偏移量设置为 50%，
   - 3）偏移方向外边距设置为元素宽度一半乘以-1

#### 2.1.3 如何实现三栏布局呢？

1. left和right写在center前面，并且分别左右浮动。
2. 左右区域分别`postion：absolute`，固定到左右两边;中间的这个div因为是块级元素，所以在水平方向上按照他的包容块自动撑开。
3. 父元素`display: table;`并且`width: 100%;` ；每一个子元素`display: table-cell; `，左右两侧添加宽度，中间不加宽度。
4. 包裹这个3个块的父元素`display: flex;` 中间的元素`flex: 1;`。
5. 网格布局

```css
/* 网格布局 */
.wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: 300px 1fr 300px;
}
```

## 2 CSS动画

### 知道CSS动画的实现吗？

知道transition 过渡动画和animation 关键帧动画区别和具体实现。

1.CSS动画实现轮播图

2.CSS动画实现旋转的硬币

3.CSS动画实现钟摆效果

## 盒子模型

### 2.3 说一下CSS的盒子模型？标准模型和IE模型的区别？CSS如何设置这两种模型？

- 标准盒子模型：width = content，设置 `box-sizing : content-box`
- IE盒子模型：width = content + pading + border， 设置 `box-sizing : border-box`

### 2.4 JS如何设置获取盒子模型对应的宽度和高度？(面试重点)

- `dom.style.width/height `： 只能取到内联样式的的属性信息（拿不到外部引入的CSS样式信息的）
- `dom.currentStyle.width/height` : 会拿到浏览器渲染之后的属性信息（IE浏览器）
- `window.getComputedStyle(dom).width/height` : Chrome/Firefox 兼容， Firefox可以通过`document.defaultView.getComputedStyle(dom)`的方式来获取
- `dom.getBoundingClientRect().width/height` : 可以获取距离viewport位置的宽度和高度



## 2.5 BFC

### 2.5.1 根据盒子模型解释边距额重叠问题？边距重叠问题的解决方案？

[![CSS盒子模型](https://github.com/cjiali/front-end-interview/raw/master/img/interview/css-box.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/css-box.jpg)

- 父子元素
- 兄弟元素
- 其他 --------------------------计算方式：以参数的最大值来进行计算

**解决方案**：对父级元素创建BFC

**BFC原理：**

BFC： 块级格式化上下文，IFC（内联格式化上下文）

1. 在BFC的垂直边距上面会发生重叠
2. BFC的区域不会与浮动元素的BOX重叠
3. BFC在页面上是一个独立的渲染区域，外部的元素不会影响到我，同时也不会影响到外部的元素
4. 计算BFC的高度的时候，浮动元素也会参与运算

### 如何创建BFC？

1. float值不是none
2. position值不是static或者relative
3. display值为table, table-cell, inline-box1.
4. overflow : auto/hidden

### 2.5.4 BFC的使用场景？（重点理解）

1. **解决边距的重叠问题**

```html
<section id="margin">
    <style>
        #margin {
            background-color: #4eff35;
            overflow: hidden;
        }
        #margin>p {
            /*上 左右 下*/
            margin: 5px auto 25px;
            background-color: #ff255f;
        }
    </style>
    <p>1</p>
    <!--把一个元素放在一个容器里面，为这个容器创建BFC即可解决边距重叠问题-->
    <div style="overflow: hidden">
        <p>2</p>
    </div>
    <p>3</p>
</section>
```



1. **BFC 不与float部分重叠的解决**

```html
<section id="layout">
      <style>
          #layout {
              background-color: #48adff;
          }
          #layout .left {
              float: left;
              height: 300px;
              width: 200px;
              background-color: #ff4344;
          }
          #layout .right {
              height: 400px;
              background-color: #ff255f;
              /*给右边的这个盒子容器创建一个BFC, 这个容器里面的内容就会沿着垂直方向延伸*/
              overflow: auto;
              /*overflow: auto;*/
              /*display: table;*/
              /*float: left;*/
              /*position: fixed;*/
          }
      </style>
      <div class="left">
          LEFT
      </div>
      <div class="right">
          RIGHT
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
          <p>111</p>
      </div>
  </section>
```

1. **BFC子元素即使是float元素也要参与运算**

```html
<section id="float">
      <style>
          /*一个盒子内部的内容如果是浮动的话，那么这个盒子的内容实际上是不参与父容器高度计算的*/
          #float {
              background-color: red;
              /*overflow: hidden;*/
              float: left;
          }
          #float .float {
              float: left;
              font-size: 30px;
          }
      </style>
      <div class="float">
          我是浮动的元素
      </div>
</section>
```



# JavaScript

## 5. 原型链

### 5.1 创建对象的几种方法？

```js
// 1. 使用字面量的方式来创建
var o1 = {name : 'zhangsan'};
var o11 = new Object({name : 'zhangsan'});

// 2. 使用普通构造函数的方式来创建
var M = function(){
    this.name = 'zhangsan';
}
var o2 = new M();

// 3. Object.create方法
var p = {name : 'zhangsan'};
var o3 = Object.create(p);
```

### 5.2 原型、构造函数、实例、原型链？

**构造函数**：使用new运算符来声明一个实例（任何函数都是可以通过构造函数来使用的）

**原型链**：通过原型链可以找到上一级别的原型对象

**原型对象**：多个实例公用的数据和属性或者方法 [![img](https://github.com/cjiali/front-end-interview/raw/master/img/interview/prototype.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/prototype.jpg)

### 5.3 instanceof的原理？

 instanceof 检测一个对象A是不是另一个对象B的实例的原理：查看对象B的prototype指向的对象是否在对象A的[[prototype]]链上。如果在，则返回true,如果不在则返回false。不过有一个特殊的情况，当对象B的prototype为null将会报错(类似于空指针异常)。

```js
// 2. 使用普通构造函数的方式来创建
var M = function(){
  this.name = 'zhangsan';
}
var o2 = new M();
undefined
o2.__proto__ == M.prototype
true
o2.__proto__ == M.prototype
true
o2.__proto__.constructor === Object
false
o2.__proto__.constructor === M
true
```

### 5.4 new运算符的原理？

1. 用new Object() 的方式新建了一个对象 obj
2. 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
5. 返回 obj

```js
// new 一个对象的过程
var _new = function (fn) {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    // 建立继承关系(二者之间的关系)
    obj.__proto__ = Constructor.prototype;
    // 开始执行这个构造函数
    var ret = Constructor.apply(obj, arguments);
    // 看一下构造函数的返回值，是对象还是一个基本数据类型?
    return typeof ret === 'object' ? ret : obj;
}
```

## 6. 面向对象

### 6.1 如何实现继承，继承的几种实现方式？

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<script>
  // 类的声明
  function Animal1() {
      this.name = 'name';
  }
  // ES6 中的class的声明
  class Animal2 {
      constructor(){
          this.name = 'name';
      }
  }

  console.log(new Animal1(), new Animal2());
  ///////////////////////////////////////////////////////////////////////////////////////////


  // 如何实现类的继承呢？？？-----------本质：原型链
  // v1. 借助构造函数实现继承
  function Parent1() {
      this.name = 'parent1'
  }
  Parent1.prototype.sayHello = function () {
      console.log('hello');
  }
  function Child1() {
      // 执行父亲的构造函数：
      // 1. 实现原理：将父级函数的this指向了这个子类的实例上面去了
      // 2. 缺点：父亲的原型链上面的方法或者属性不能被继承；只能实现部分继承
      Parent1.call(this);
      this.type = 'child1';
  }
  // 没有参数的时候，可以直接new + 函数名称
  console.log(res = new Child1);




  // v2. 借助原型链实现继承
  function Parent2() {
      this.name = 'parent2';
      this.data = [1, 2, 3];
  }
  Parent2.prototype.sayHello = function () {
      console.log('hello');
  }
  function Child2() {
      this.type = 'child2';
  }
  // prototype 就是为了让这个对象的实例可以访问到原型链上的内容
  Child2.prototype = new Parent2();
  // new Child2().__proto__ === Child2.prototype  // true
  // new Child2().__proto__.name                  // parent2
  // 原型链继承的缺点：
  // 1. 原理：通过修改原型链来实现对象的继承关系
  // 2. 缺点：修改第一个对象上面的属性，会直接修改第二个对象属性数据(引用类型)
  var c1 = new Child2();
  var c2 = new Child2();
  c1.data.push(100, 200, 300);

  // v3. 组合继承
  function Parent3() {
      this.name = 'parent3';
      this.data = [1, 2, 3];
  }
  function Child3() {
      // 1. 借用构造函数继承
      Parent3.call(this);
      this.type = 'child3';
  }
  // 2. 原型链继承
  // child3的原型对象是Parent3的一个实例对象，但是这个实例对象中是没有constructor这个属性的，因此寻找属性的时候回沿着这个实例对象的原型链继续向上寻找new Parent3().prototype 这个原型对象的，
  // 最终在Parent3.prototype这个原型对象中找到了这个属性，new一个对象找的实际上是{Parent3.prototype.constructor : Parent3}
  Child3.prototype = new Parent3();
  var c1 = new Child3();
  var c2 = new Child3();
  c1.data.push(100, 200, 300);
  // 组合继承的特点：
  // 1. 原理：结合借用构造函数继承和原型链继承的优点，摒弃二者的缺点
  // 2. 缺点：父类构造函数在创建实例的时候总共执行了两次（new Parent3(), new Child3()）


  // v4. 组合继承的优化1
  function Parent4() {
      this.name = 'parent4';
      this.data = [1, 2, 3];
  }
  function Child4() {
      // 1. 借用构造函数继承
      Parent4.call(this);
      this.type = 'child4';
  }
  // 让子类的构造函数的原型对象和父类构造函数的原型对象执向同一个对象(都是同一个对象)
  Child4.prototype = Parent4.prototype;
  // 测试
  var c1 = new Child4();
  var c2 = new Child4();
  console.log(c1 instanceof Child4, c1 instanceof Parent4);
  console.log(c1.constructor)         // Parent4? 如何实现：c1.constructor(c1.__proto__.constructor) === Child4 呢？
  // 缺点：
  // 1. 无法通过原型对象的constructor属性来获取对象的属性对应的构造函数了(子类和父类公用的是一个contructor)
  // 2. obj instanceof Child4 === true; obj instanceof Parent4 === true
  // 3. obj.__proto__.constructor === Child4; obj.__proto__.constructor === Parent4  ???

  // v5. 组合继承的优化2【完美写法】
  function Parent5() {
      this.name = 'parent5';
      this.data = [1, 2, 3, 4, 5];
  }
  function Child5(){
      Parent5.call(this);
      this.type = 'child5';
  }

  // 通过创建中间对象的方式来把两个对象区分开
  // var obj = new Object(); obj.__proto__ = Constructor.prototype;
  // 1. Object.create创建的对象obj, 这个obj的原型对象就是参数
  // 2. Child5的原型对象是Child5.prototype
  // 3. Child5.prototype = obj，obj这个对象相当于就是一个中间的桥梁关系
  Child5.prototype = Object.create(Parent5.prototype);
  // 当前的方式还是会按照原型链一级一级向上寻找的, 给Child5的原型对象上面绑定一个自己定义的constructor属性
  Child5.prototype.constructor = Child5;

  // var s1 = new Child5()

  // 上面的代码等价于
  var obj = Object.create(Parent5.prototype);     // obj.prototype = Parent5.prototype
  Child5.prototype = obj;
  Child5.prototype.constructor = Child5;
  // 1. 对象之间就是通过__proto__ 属性向上寻找的
  // 2. 寻找规则： child5 ---> Child5.prototype ---> obj(Object.create(Parent5.prototype)) ---> Parent5.prototype


  // 技巧：不要让面试官问太多题目：拖拉时间【挤牙膏】，把一个问题尽量吃透
  // 消化这一块内容
</script>
</body>
</html>
```



## 12. JS运行机制

### 12.1 如何理解JS的单线程？

```js
// 同步任务
console.log(1);
// 异步任务要挂起
setTimeout(function(){
    console.log(2)
}, 0);
console.log(3)
// out : 1 3 2
console.log('A');
setTimeout(function(){
    console.log('B')
}, 0);
while (true) {

}

// out : A
```

### 12.2 什么是任务队列？

```js
for (var i = 0; i < 4; i++) {
    // setTimeout , setInterval 只有在时间到了的时候，才会把这个事件放在异步队列中去
    setTimeout(function(){
        console.log(i);
    }, 1000);
}
// out : 4 4 4 4
```

### 12.3 什么是Event Loop？

JS是单线程的，浏览器引擎会先来执行同步任务，遇到异步任务之后，会把当前的这个异步任务放在time模块中，等到主线程中的所有的同步任务全部执行完毕；然后当前的这个异步任务只有时间到了之后，才会把这个任务（回调函数）放在一个异步队列中；

当当前的任务栈中的任务全部执行完毕了之后，会先去执行微任务队列中的任务（Promise），然后等到微任务队列中的所有任务全部执行完毕之后，再去执行process.nextTick()这个函数，等到这个函数执行完毕之后，本次的事件轮训结束，开启新的执行栈，从宏任务队列中依次取出异步任务，开始执行；每个宏任务执行都会重新开启一个新的任务执行栈

**3个关键点：**

1. 执行栈执行的是同步任务；
2. 什么时候去异步队列中取这个任务；
3. 什么时候向这个任务队列中放入新的异步任务

**异步任务的分类：**

- setTimeout, setInterval;
- DOM事件（点击按钮的时候也会先去执行同步任务）；
- Promise

**执行细节分析：**

```js
console.log(1)
setTimeout(function() {
    console.log(2)
})

Promise.resolve()
    .then(function() {
        console.log(3)
    })

console.log(4)
```

执行流程：

> stack(执行栈)、Micro(微任务)、Macro（宏任务）

1. 初始状态： stack:[], Micro: [], Macro: [script]。执行栈为空, 微任务为空, 宏任务队列中有一个整体的 script代码
2. 主线程开始执行, 遇到console.log(1), 首先会打印 1
3. 继续向下执行,遇到 setTimeout异步任务,就将其加入到Macro(宏任务)队列中。等待执行
4. 继续向下执行, 遇到 Promise.resolve也是一个异步任务,单它是微任务,将其加入 Micro(微任务)队列中,等待着行
5. 解析console.log(4), 并且打印4。 当主线程执行完打印的结果依次是 1 和 4。
6. 这时候主线程就会问 任务(异步)队列,有没有微任务要执行,将所有的 Micro(微任务)加入执行栈执行, 打印结果 3
7. 微任务执行完了, 就开始下一轮事件循环, 将第一个 Macro(宏任务)压入执行栈执行, 再次打印 2。

[![EventLoop](https://www.52tech.tech/docs/img/node-eventloop.png)](https://www.52tech.tech/docs/img/node-eventloop.png)

**判断执行顺序：**

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')
setTimeout(function() {
    console.log('setTimeout')
}, 0)

async1();

new Promise( function( resolve ) {
    console.log('promise1')
    resolve();
} ).then( function() {
    console.log('promise2')
} )

console.log('script end')

/*****
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*****/
```

### 3. 谈一下宏任务与微任务的区别？（面试重点）

面试常考点，关键在于理解EventLoop的机制，以及宏任务和微任务的底层原理。

**宏任务**

- **setTimeout**
- **setInterval**
- **setImmediate**
- **requestAnimationFrame**

常见的宏任务: setTimeout、setInterval、setImmediate、 script中整体的代码、 I/O操作、 UI渲染等。

**微任务**

- **process.nextTick**
- **MutationObserver**
- **Promise.then catch finally**

常见的微任务有: process.nextTick、Promise和 MutationObserver监听DOM的变化。

### 微任务和宏任务的区别

- 微任务进入主线程执行是一队一队的, 而宏任务进入主线程是一个一个的。
- 微任务是在主线程空闲时批量执行, 宏任务是在事件循环下一轮的最开始执行

## 3.1 DOM事件

### 3.1.1 DOM事件的级别有哪些？

> DOM级别一共可以分为四个级别：DOM0级、DOM1级、DOM2级和DOM3级。
>
> 而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。DOM1 ：该标准中未涉及到事件绑定的相关东西。

1. DOM0 : `element.onclick = function(e) {}` 
2. DOM2 : `element.addEventListener('click', function(e){}, false)`， 一个DOM元素可以添加多个事件
3. DOM3 : `element.addEventListener('keyup', function(e){}, false)`，在DOM2标准基础上面增加了新的事件类型：鼠标事件，键盘事件，焦点事件

### 3.1.2 DOM事件模型有哪些？

1. 事件捕获：从外向内, window -> document -> body -> button
2. 事件冒泡：从内向外，button -> body -> document -> window

### 3.1.3 DOM事件流？

浏览器为当前的页面与用户进行交互的过程中，点击鼠标后事件如何传入和响应的呢？

- 1. 捕获阶段：从外部容器开始向内
- 1. 目标阶段：事件通过捕获到达目标阶段
- 1. 冒泡阶段：从目标元素再上传到window对象

### 3.1.4 什么事件可以代理？什么事件不可以代理呢？

什么样的事件可以用事件委托，什么样的事件不可以用呢？

> 1. 通常支持事件冒泡（Event Bubbling）的事件类型为鼠标事件和键盘事件，例如：mouseover, mouseout, click, keydown, keypress。
> 2. 接口事件(**指的是那些不一定与用户操作有关的事件**)则通常不支持事件冒泡（Event Bubbling），例如：load, change, submit, focus, blur。

**很明显**：focus 和 blur 都属于不支持冒泡的接口事件。既然都不支持冒泡，那又如何实现事件代理呢？

### 3.1.5 IE和DOM事件流的区别？

IE采用冒泡型事件 Netscape使用捕获型事件 DOM使用先捕获后冒泡型事件

1. 冒泡型事件模型： button -> div -> body (IE浏览器本身只支持Bubbling不支持Capturing)
2. 捕获型事件模型： body -> div-> button (Netscape事件流，网景浏览器公司)
3. DOM事件模型： body -> div -> button -> button -> div -> body (先捕获后冒泡，除了IE以外的其他浏览器都支持标准的DOM事件处理模型)

规范和浏览器实现的差别：

- DOM2级事件规范的捕获阶段，事件从文档节点document开始传播，现代浏览器大多数都是从window对象开始传播事件的；
- DOM2级事件规范捕获阶段不涉及事件目标，现代浏览器大多数都在这个阶段包含事件目标。

### 3.1.6 事件对象event的属性方法的差别?

| IE                  | DOM               | 说明             |
| ------------------- | ----------------- | ---------------- |
| cancelBubble = true | stopPropagation() | 停止冒泡         |
| returnValue = false | preventDefault()  | 阻止元素默认事件 |
| srcEelement         | target            | 事件目标         |



### 3.1.7 描述DOM事件捕获的具体流程？

**window -> document -> html -> body -> ... -> 目标元素**

> 关键点： 注意根节点是window这个对象的

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="container">
      <style>
          #container {
              width: 200px;
              height: 200px;
              background-color: #ff255f;
          }
      </style>
  </div>
  <script>
      // 事件捕获机制
      window.addEventListener('click', function(){
          console.log('window capture');
      }, true)
      document.addEventListener('click', function () {
          console.log('document capture');
      }, true)
      document.documentElement.addEventListener('click', function () {
          console.log('HTML capture');
      }, true)
      document.body.addEventListener('click', function () {
          console.log('body capture');
      }, true)
      document.getElementById('container').addEventListener('click', function () {
          console.log('container capture');
      }, true)

      // 事件冒泡机制
      window.addEventListener('click', function(){
          console.log('window capture');
      })
      document.addEventListener('click', function () {
          console.log('document capture');
      })
      document.documentElement.addEventListener('click', function () {
          console.log('HTML capture');
      })
      document.body.addEventListener('click', function () {
          console.log('body capture');
      })
      document.getElementById('container').addEventListener('click', function () {
          console.log('container capture');
      })

      // 输出结果
      window capture  --> document capture --> HTML capture --> body capture --> container capture --> container capture -->  body capture --> HTML capture --> document capture --> window capture
  </script>
</body>
</html>
```

### 3.1.8 如何拿到HTML这个标签节点元素呢？(加分项)

```js
  var html = document.documentElement;
```

### 3.1.9 描述Event对象的常见应用？

1. `e.preventDefault() `: 阻止默认事件（如阻止a标签的默认跳转行为）
2. `e.stopPropagation() `: 阻止事件冒泡的行为
3. `e.stopImmediatePropagation()` : 事件响应的优先级的应用场景，如果一个元素绑定了多个事件，但是又不想让其他的事件执行的时候使用该方法【也会阻止冒泡】
4. `e.currentTarget `: 当前所绑定的事件对象

```js
  document.documentElement.onclick = function(e) {
    console.log(e.currentTarget, e.target);       // <html><body>...</body></html>（）给绑定事件的那个元素, 当前被点击的那个元素
  }
```

> `e.target` : 当前被点击的元素，父元素使用事件代理的方式来实现，可以直接使用该属性获取被点击的那个元素

#### Layout属性包括哪些？

1. offsetLeft、offsetTop、offsetHeight、offsetWidth: 相对于父对象的边距信息，且返回值为数字；left获取或设置相对于具有定位属性(position定义为relative)的父对象的边距信息，返回值为字符串10px
2. scrollTop/Left/Width/Height：滚动条在各个方向上拉动的距离，返回值为数字
3. clientTop/Left/Width/Height：浏览器的可视区域的大小
4. getComputedStyle()、currentStyle(in IE)：浏览器渲染DOM元素之后的宽度和高度等样式信息

#### 3.2.1 如何给一个按钮绑定一个自己定义的事件呢？

```js
// v1. 使用Event对象来自定义事件
// 开始创建一个自己定义的事件对象
var eve = new Event('customEvent');
// 使用dom2事件处理的方式来给这个元素绑定一个事件
var dom = document.documentElement;
dom.addEventListener('customEvent', function(e) {
    console.log('customEvent called!');
});
// 下面的这句话可以在适合的场景中来触发一个自己定义的事件对象
setTimeout(function(){
    // 在1s之后触发这个事件
    dom.dispatchEvent(eve);
}, 1000)


// v2. 使用CustomEvent来实现自定义事件
var dom = document.documentElement;
// 使用CustomEvent的方式可以在事件触发的时候传递一个参数，然后通过e.detail 的方式来获取这个参数信息
var myClick = new CustomEvent('myClick', {detail : {name : 'zhangsan', age : 24}});
dom.addEventListener('myClick', function(e){
    console.log(e.detail, e.target)
})
dom.dispatchEvent(myClick);
```



## 7. 通信

### 7.2 前后端如何进行通信呢？

1. Ajax（有同源策略限制）；Fetch API则是XMLHttpRequest的最新替代技术， 它是W3C的正式标准
2. WebSocket：支持跨域请求数据，没有同源策略的限制
3. CORS：新的协议通信标准；CORS则将导致跨域访问的请求分为三种：Simple Request，Preflighted Request以及Requests with Credential；cors相对于jsonp而言的好处就是支持所有的请求方式，不止是get请求，还支持post,put请求等等，而它的缺点就很明显，无法兼容所有的浏览器，对于要兼容到老式浏览器而言，还是使用jsonp好点

### 7.3 如何创建Ajax呢？

1. XMLHttpRequest对象的工作流程
2. 浏览器的兼容性处理【重点】
3. 事件的触发条件
4. 事件的触发顺序

```js
  function ajax(params){
    // 1. 创建对象，考虑兼容性【重点】
    var xhr = XMLHTTPRequest ? new XMLHTTPRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');      // *** 兼容性问题必须考虑
    // 2. 打开连接
    var type = params.type || 'GET',
        url = params.url || '',
        data = params.data || {},
        success = params.success,
        error = params.error,
        dataArr = [];
    for (var k in data) {
      dataArr.push(k + '=' + data[k]);
    }
    //带上Cookie
    xhr.withCredentials = true;
    if (type.toUpperCase() === 'GET') {
      // get
      url += '?' + dataArr.join('&');
      // 问号结尾的话，直接替换为空字符串
      xhr.open(type, url.replace(/\?$/g, ''), true);
      // GET 请求的话，是不需要再send方法中带上参数的
      xhr.send();
    }
    else {
      // POST
      xhr.open(type, url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // POST 请求需要把数据放在send方法里面， data = name=zhangsna&age=18&sex=male
      xhr.send(dataArr.join('&'));
    }
    // 开始监听变化
    xhr.onreadystatechange = function(){
      // 这里需要考虑强缓存和协商缓存的话直接处理，206是媒体资源的创建方式
      if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
          var res;
          if (success instanceof Function) {
            res = xhr.responseText;
            if (typeof res === 'string') {
              res = JSON.parse(res);
              // 开始执行成功的回调函数
              success.call(xhr, res);
            }
          } else {
            if (error instanceof Function) {
              // 失败的话直接返回这个responseText中的内容信息
              error.call(xhr, res);
            }
          }
      }
    }
  }
```

# 浏览器

## 10. 渲染机制

### 10.1 什么是DOCTYPE及作用？

1. DTD（Document Type Definition）：文档类型定义，是一系列的语法规则，用来定义XML或者(X)HTML的文件类型。浏览器会使用它来判断文档的类型，决定使用哪一种协议来解析，以及切换浏览器模式；
2. DOCTYPE： 是用来声明文档类型和DTD规范的，一个主要的用途是文件的合法性验证；如果文件代码不合法，那么浏览器解析的时候就会出现一些出错
3. 总结：Doctype就是通知浏览器当前的文档是属于那种类型的，包含哪些DTD。

```
  <!--HTML5的写法-->
  <DOCTYPE html>
  <!-- HTML 4.01  Strict
    1. 这个DTD 包含所有的HTML元素和属性
    2. 但是不包含展示性的和弃用的元素（比如font）
  -->
  <DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd" >
  <!-- HTML 4.0.1 Transitional
    1. 这个DTD 包含所有的HTML元素和属性
    2. 也包含展示性的和弃用性的元素（比如font）
  -->
  <DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" " http://www.w3.org/TR/html4/loose.dtd" >
```

------

> [!NOTE] 在W3C标准出来之前，不同的浏览器对页面渲染有不同的标准，产生了一定的差异。这种渲染方式叫做混杂模式。在W3C标准出来之后，浏览器对页面的渲染有了统一的标准，这种渲染方式叫做标准模式。<!DOCTYPE>不存在或者形式不正确会导致HTML或XHTML文档以混杂模式呈现，就是把如何渲染html页面的权利交给了浏览器，有多少种浏览器就有多少种展示方式。因此要提高浏览器兼容性就必须重视<!DOCTYPE>

### 10.2 严格模式和混杂模式

> [!NOTE] 严格模式和混杂模式都是浏览器的呈现模式，浏览器究竟使用混杂模式还是严格模式呈现页面与网页中的DTD（文件类型定义）有关，DTD里面包含了文档的规则。比如：loose.dtd

- **严格模式**：又称标准模式，是指浏览器按照W3C标准来解析代码，呈现页面
- **混杂模式**：又称为怪异模式或者兼容模式，是指浏览器按照自己的方式来解析代码，使用一种比较宽松的向后兼容的方式来显示页面。

------

### 10.3 浏览器的渲染过程？

[![浏览器渲染过程](https://github.com/cjiali/front-end-interview/raw/master/img/interview/dom_render.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/dom_render.jpg)

开始进行DOM解析，渲染DOM Tree

[![DOM树渲染](https://github.com/cjiali/front-end-interview/raw/master/img/interview/dom_tree.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/dom_tree.jpg)

开始进行CSS解析，渲染CSSOM Tree

[![CSSOM树渲染](https://github.com/cjiali/front-end-interview/raw/master/img/interview/cssom_tree.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/cssom_tree.jpg)

DOM树和CSS树的结合，最后会转换为Render Tree

[![Render树渲染](https://github.com/cjiali/front-end-interview/raw/master/img/interview/render_tree.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/render_tree.jpg)

Layout的过程，计算每一个DOM元素的位置、宽度、高度等信息，最终渲染并显示页面到浏览器

[![Layout的过程](https://github.com/cjiali/front-end-interview/raw/img/interview/layout.jpg)](https://github.com/cjiali/front-end-interview/blob/img/interview/layout.jpg)



### 介绍一下 JS 异步加载的方式

**动态脚本的加载**

```js
var script = document.createElement('script');
document.getElementsByTagName('head')[0].appendChild(script);

// 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
// <script src="script.js"></script>
```

**defer**

```html
<!-- 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。 -->
<script defer src="myscript.js"></script>
```

**async**

```html
  <!-- 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。 -->
  <script async src="script.js"></script>
```

**异步加载的区别？**

defer是在HTML解析完成之后（DOMContentLoaded事件执行之后）才会执行，如果是多个，会按照加载的顺序依次执行（按照顺序执行）

async是在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关（与顺序无关）

### 10.4 何时会触发Reflow？

> [!NOTE] 定义：DOM结构中每个元素都有自己的盒子模型，这些都是需要根据各种样式来计算并根据计算结果将元素放在它该出现的位置，这个过程就是reflow；

1. 当你增加、删除、修改DOM节点的时候，会导致Reflow或Repaint
2. 当你移动DOM的位置，或者设置动画的时候
3. 当你修改CSS样式的时候
4. 当你Resize窗口的时候（移动端没有这个问题，与浏览器有关），或者在滚动窗口的时候
5. 当你修改网页的默认的字体的时候

### 10.5 何时回触发Repaint？

> [!NOTE] 定义：当各种盒子的位置、大小以及其他属性，例如颜色、字体大小都确定下来以后，浏览器于是便按照元素各自的特性绘制了一遍，于是页面的内容出现了，这个过程就是repaint

1. DOM改动
2. CSS改动

### 10.6 如何最大程度上的减少浏览器的重绘Repaint过程(频率)呢？

1、避免在document上直接进行频繁的DOM操作，如果确实需要可以采用off-document的方式进行

- 1. 先将元素从document中删除，完成修改之后然后再把元素放回原来的位置
- 1. 将元素的display设置为none, 然后完成修改之后再把元素的display属性修改为原来的值
- 1. 如果需要创建多个DOM节点，可以使用DocumentFragment创建完毕之后一次性地加入document中去

```js
var frag = document.createDocumentFragment();
frag.appendChild(dom);    /*每次创建的节点先放入DocumentFragment中*/
```

2、集中修改样式

1. 尽可能少的修改元素style上的属性
2. 尽量通过修改className来修改样式(一次性修改)
3. 通过cssText属性来设置样式值

```js
  document.getElementById("d1").style.cssText = "color:red; font-size:13px;";
```

3、缓存Layout的属性值

对于Layout属性中非引用类型的值（数字型），如果需要多次访问则可以在一次访问时先存储到局部变量中，之后都使用局部变量，这样可以避免每次读取属性时造成浏览器的渲染。

```js
var width = el.offsetWidth;
var scrollLeft = el.scrollLeft;
```

4、设置元素的position为absolute或fixed

在元素的position为static和relative时，元素处于DOM树结构当中，当对元素的某个操作需要重新渲染时，浏览器会渲染整个页面。将元素的position设置为absolute和fixed可以使元素从DOM树结构中脱离出来独立的存在，而浏览器在需要渲染时只需要渲染该元素以及位于该元素下方的元素，从而在某种程度上缩短浏览器渲染时间。

## 缓存

### 1. 说一下浏览器的缓存机制吧？（面试重点）

浏览器缓存包含两种类型，即强缓存（也叫本地缓存）和协商缓存，浏览器在第一次请求发生后，再次请求某一资源时，会先获取该资源缓存的header信息，判断是否命中强缓存（cache-control和expires信息）

- 若命中强缓存，直接从缓存中获取资源信息，包括缓存header信息，而本次请求根本就不会与服务器进行通信；

- 如果没有命中强缓存，浏览器会发送请求到服务器，请求会携带第一次请求返回的有关缓存的header字段信息（`Last-Modified/If-Modified-Since`和`Etag/If-None-Match`），由服务器根据请求中的相关header信息来比对结果是否协商缓存命中；若命中，则服务器返回新的响应header信息更新缓存中的对应header信息，但是并不返回资源内容，它会告知浏览器可以直接从缓存获取；否则返回最新的资源内容

**普通的缓存机制(重点理解)**

[![浏览器缓存](https://www.52tech.tech/docs/img/browser-cache.jpg)](https://www.52tech.tech/docs/img/browser-cache.jpg)

强缓存与协商缓存的区别，可以用下表来进行描述：

|              | **获取资源形式** | **状态码**          | **发送请求到服务器**                       |
| ------------ | ---------------- | ------------------- | ------------------------------------------ |
| **强缓存**   | 从缓存取         | 200（from cache）   | 否，直接从缓存取                           |
| **协商缓存** | 从缓存取         | 304（not modified） | 是，正如其名，通过服务器来告知缓存是否可用 |

#### **强缓存**

直接从本地读取，不发送请求

```http
Response Headers
cache-control: max-age=315360000（相对时间，优先级比expires高）
expires: Sat, 10 Mar 2029 04:01:39 GMT(绝对时间)
```

**协商缓存**

问一下服务器，这个文件有没有过期，然后再使用这个文件

```http
Response Headers
last-modified: Tue, 12 Mar 2019 06:22:34 GMT（绝对时间）
etag: "52-583dfb6f4de80"
```

向服务器请求资源的时候，带上if-Modified-Since或者if-None-Match这个请求头，去询问服务器：

```http
Request Headers
if-Modified-Since: Tue, 12 Mar 2019 06:22:34 GMT
if-None-Match: "52-583dfb6f4de80"
```



### 2、如何验证资源是否过期？

- Last-Modified（上次修改时间）
  - 配合 If-Modified-Since 或 If-Unmodified-Since 使用
  - 如果请求的资源头中有Last-Modified这个头，这个头指定了一个时间。那么浏览器重新访问资源时就会带上If-Modified-Since这个头，其时间是Last-Modified的时间，服务器就会拿这个时间去对比上次修改的时间，然后告诉浏览器是否可以直接使用。
- Etag （数据签名）
  - 资源会依据它的内容产生一个唯一的数据签名，如果资源有更新，那么Etag就会发生变化。
  - 配合 If-Match 或 If-None-Match 使用

### 3. cookie和session的概念？

**cookie**：登录网站时，第一次输入用户名密码登录了，第二次再打开很多情况下就直接打开了，这个时候用到的一个机制就是 cookie。

**session**：在购物车中添加了商品之后客户端处可以知道添加了哪些商品，而服务器端如何判别呢，所以也需要存储一些信息就用到了session。

服务器通过设置`Set-Cookie`这个响应头，将cookie信息返回给浏览器，浏览器将响应头中的cookie信息保存在本地，当下次向服务器发送HTTP请求时，浏览器会自动将保存的这些cookie信息添加到请求头中。

通过cookie，服务器就会识别出浏览器，从而保证返回的数据是这个用户的。

- 通过`Set-Cookie`设置
- 下次请求会自动带上
- 键值对，可设置多个

**Set-Cookie属性**

- max-age：过期时间有多长，默认在浏览器关闭时失效
- expires：到哪个时间点过期
- secure：表示这个cookie只会在https的时候才会发送
- HttpOnly：设置后无法通过在js中使用document.cookie访问（保障安全，防止攻击者盗用用户cookie）
- domain：表示该cookie对于哪个域是有效的（关键点：cookie默认是不能直接跨域访问的，但是二级域名是可以共享cookie的）。 
  - cookie的跨域：通过在www.taobao.com 的server端提供一个获取当前域下所有cookie的 php的请求地址，然后该php获取到cookie之后将期并成 js 代码，也就是以上第二个截 - 图所看到的。然后再在 tmall用 jsonp 的方式跨域加载该 js 代码，从而实现 cookie 的跨域访问。

**session（理解原理）**

- 存放在服务器的一种用来存放用户数据的类似HashTable的结构
- 浏览器第一次发送请求时，服务器自动生成了HashTable和SessionID来唯一标识这个hash表，并将sessionID存放在cookie中通过响应发送到浏览器。浏览器第二次发送请求会将前一次服务器响应中的sessionID随着cookie发送到服务器上，服务器从请求中提取sessionID，并和保存的所有sessionID进行对比，找到这个用户对应的hash表。
  - 一般这个值是有时间限制的，超时后销毁，默认30min
- 当用户在应用程序的web页面间挑转时，存储在session对象中的变量不会丢失而是在整个用户会话中一直存在下去。
- session依赖于cookie，因为sessionID是存放在cookie中的。

### 2. sesssion与cookie的区别？（面试重点）

1. cookie存在客户端，session存在于服务端。
2. cookie在客户端中存放，容易伪造，不如session安全
3. session会消耗大量服务器资源，cookie在每次HTTP请求中都会带上，影响网络性能
4. 域的支持范围不一样，比方说a.com的Cookie在a.com下都能用，而www.a.com的Session在api.a.com下都不能用

## 跨域

### 1、跨域问题的产生原因？

**同源策略：**

- 端口相同
- 域名相同
- 协议相同

例子：`http://www.example.com/dir/page.html` 这个网址，协议是`http`，域名是`www.example.com`，端口是`80`

同源策略限制是从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。（一个源的文档或脚本是没有权利直接操作另外一个源的文档或脚本的）

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。**是浏览器做的努力**

**同源策略限制范围**

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

### 2、跨域通信的解决方法？

**JSONP**

浏览器上虽然有同源限制，但是像 srcipt标签、link标签、img标签、iframe标签，这种**在标签上通过src地址来加载一些内容的时候浏览器是允许进行跨域请求的**。

 **跨域原理：**

1. 创建一个script标签，这个script标签的src就是请求的地址；
2. 这个script标签插入到DOM中，浏览器就根据src地址访问服务器资源
3. 返回的资源是一个文本，但是因为是在script标签中，浏览器会执行它
4. 而这个文本恰好是函数调用的形式，即函数名（数据），浏览器会把它当作JS代码来执行即调用这个函数
5. 只要提前约定好这个函数名，并且这个函数存在于window对象中，就可以把数据传递给处理函数。

```js
function jsonp(url, onsuccess, onerror, charset){
    // 1. 全局注册一个callback
    var callbackName = 'callback' + Math.random() * 100;
    window[callbackName] = function(){
        if (onsuccess && typeof onsuccess === 'Function') {
            onsuccess(arguments[0]);
        }
    }
    // 2. 动态创建一个script标签
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    charset && script.setAttribute('charset', charset);
    script.setAttribute('src', url);
    script.async = true;
    // 3. 开始监听处理的过程
    script.onload = script.onreadystatechange = function(){
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            // 4. 成功之后移除这个事件
            script.onload = script.onreadystatechange = null;
            // 删除这个script的DOM对象（head.removeChild(script), 这个DOM节点的父节点相当于是head标签这个父节点）
            script.parentNode && script.parentNode.removeChild(script);
            // 删除函数或变量
            window[callbackName] = null;
        }
    }
    script.onerror = function(){
        if (onerror && typeof onerror === 'Function') {
            onerror();
        }
    }
    // 5. 开始发送这个请求(把这个标签放在页面中的head标签中即可)
    document.getElementsByTagName('head')[0].appendChild(script);
}
```

**Hash**

使用场景：当前的页面A通过iframe或者frame嵌入了跨域的页面B，在A页面中改变B的url中的hash值，B不会刷新，但是B可以用过`window.onhashchange`事件监听到hash变化。

```js
  // 1. A页面中的代码如下
  var B = document.getElementsByTagName('iframe');
  B.src = B.src + '#' + JSON.stringfy(data);
  // 2. B中的伪代码如下
  window.onhashchange = function(){
    var data = window.location.hash;    // 接受数据
    data = JSON.parse(data);
  }
```

**postMessage(HTML5中新增)**

使用场景： 可以实现窗口A(A.com)向窗口B(B.com)发送信息

```js
  // 1. 窗口B中的代码如下
  var BWindow = window;
  BWindow.postMessage(JSON.stringfy(data), 'http://www.A.com');   
  // 2. 窗口A中代码
  var AWindow = window;
  AWindow.addEventListener('message', function(e){
      console.log(e.origin);                  // http://www.B.com
      console.log(e.source);                  // BWindow

      e.source.postMessage('已成功收到消息');

      console.log(JSON.parse(e.data));        // data
  }, false)
  // 父窗口给子窗口发信息，需要用iframe的contentWindow属性作为调用主体
  // 子窗口给父窗口发的信息需要使用window.top，多层iframe使用window.frameElement
```

**WebSocket**

不受同源策略影响，可以直接使用

```js
  var ws = new window.WebSocket('ws://echo.websocket.org');

  // 打开连接
  ws.onopen = function(e){
    console.log('Connection open ……');
    ws.send('Hello WebSocket!');
  }

  // 接受消息
  ws.onmessage = function(e){
    console.log('Received Message : ', e.data);
  }

  // 关闭连接
  ws.onclose = function(e){
    console.log('Connection closed');
  }
```

**CORS**

> 支持跨域通信版本的Ajax，是一种新的标准（Origin头）【ajax的一个变种，适用于任何】

CORS(Cross Origin Resource Sharing)跨域资源请求: 浏览器在请求一个跨域资源的时候，如果是跨域的Ajax请求，会在请求头中加一个`origin`字段，但其是不知道这个资源服务端是否允许跨域请求的，浏览器会发送到服务端，如果服务器返回的头中没有`'Access-Control-Allow-Origin': '对应网址或 * '` 的话，那么浏览器就会把请求内容给忽略掉，并且在控制台报错。



```js
fetch('/get/name', {
    method : 'get'
}).then(function(response){
    console.log(response);
}).catch(function(err){
    // 出错了；等价于then的第二个参数
});
// 原因：浏览器默认会拦截ajax请求，会根据头中的origin消息进行判断处理消息；Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
```

**CORS请求的基本流程：**

1. 对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。
2. Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
3. 如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
4. 如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```js
  Access-Control-Allow-Origin: http://api.bob.com   // 必需的字段
  Access-Control-Allow-Credentials: true            // 可选字段： 是否允许发送cookie
  Access-Control-Expose-Headers: FooBar
  Content-Type: text/html; charset=utf-8
```

简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。OPTIONS表示当前的这个请求是用来询问的；服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

**CORS限制：**

允许的请求方法

- GET
- POST
- HEAD

允许的Content-Type

- text/plain
- multipart/form-data
- application/x-www-form-ulencoded

其他类型的请求方法和Content-Type需要通过**预请求验证**后然后才能发送

**CORS预请求：**

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求。

服务器在HTTP header中加入允许请求的方法和Content-Type后，其他指定的方法和Content-Type就可以成功请求了。

```
'Access-Control-Allow-Headers': '允许Content-Type'
'Access-Control-Allow-Methods': '允许的请求方法'
'Access-Control-Max-Age': '预请求允许其他方法和类型传输的时间'
```

参见：

http://www.ruanyifeng.com/blog/2016/04/cors.html

**JSONP和CORS的区别？**

1. JSONP只支持GET请求，CORS支持所有类型的HTTP请求
2. JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。



## URL请求细节

### 1. 从输入URL到页面加载完成的过程？（高频）

涉及到浏览器缓存、TCP连接、浏览器渲染等知识。

**基本流程：**

[![输入URL后.png](https://www.52tech.tech/docs/img/%E8%BE%93%E5%85%A5URL%E5%90%8E.png)](https://www.52tech.tech/docs/img/输入URL后.png)

- 判断是否需要跳转(301)
- 从浏览器中读取缓存
- DNS解析
- TCP连接
- HTTP请求发出
- 服务端处理请求，HTTP响应返回
- 浏览器拿到响应数据，解析响应内内容，把解析结果展示给用户

**详细流程（重点掌握）：**

1. 在浏览器地址栏输入URL
2. 浏览器查看是否有强缓存，如果请求资源在缓存中并且新鲜，跳转到转码步骤
   1. 如果资源未缓存，发起新请求
   2. 如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。
   3. 检验新鲜通常有两个HTTP头进行控制`Expires`和`Cache-Control`：
      - HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期
      - HTTP1.1增加了Cache-Control: max-age=,值为以秒为单位的最大新鲜时间
3. 浏览器**解析URL**获取协议，主机，端口，path
4. 浏览器**组装一个HTTP（GET）请求报文**
5. DNS解析，查找过程如下：
   1. 浏览器缓存
   2. 本机缓存
   3. hosts文件
   4. 路由器缓存
   5. ISP DNS缓存
   6. DNS查询（递归查询 / 迭代查询）
6. 端口建立TCP链接，三次握手如下：
   1. 客户端发送一个TCP的**SYN=1，Seq=X**的包到服务器端口
   2. 服务器发回**SYN=1， Ack=X+1， Seq=Y**的响应包
   3. 客户端发送**Ack=Y+1， Seq=X+1**
7. TCP链接建立后**发送HTTP请求**
8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序
9. 服务器检查**HTTP请求头是否包含缓存验证信息**如果验证缓存新鲜，返回**304**等对应状态码
10. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作
11. 服务器将**响应报文通过TCP连接发送回浏览器**
12. 浏览器接收HTTP响应，然后根据情况选择关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下：
    1. 主动方发送**FIN=1， Ack=X， Seq=Y**报文
    2. 被动方发送**ACK=Y+1， Seq=X**报文
    3. 被动方发送**FIN=1， Ack=Y+1， Seq=Z**报文
    4. 主动方发送**ACK=Z+1， Seq=Y+1**报文
13. 浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同
14. 如果资源可缓存，**进行缓存**
15. 对响应进行**解码**（例如gzip压缩）
16. 根据资源类型决定如何处理（假设资源为HTML文档）
17. **解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本**，这些操作没有严格的先后顺序，以下分别解释
18. 构建DOM树：
    1. **Tokenizing**：根据HTML规范将字符流解析为标记
    2. **Lexing**：词法分析将标记转换为对象并定义属性和规则
    3. **DOM construction**：根据HTML标记关系将对象组成DOM树
19. 解析过程中遇到图片、样式表、js文件，**启动下载**
20. 构建CSSOM树：
    1. **Tokenizing**：字符流转换为标记流
    2. **Node**：根据标记创建节点
    3. **CSSOM**：节点创建CSSOM树
21. [根据DOM树和CSSOM树构建渲染树](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction):
    1. 从DOM树的根节点遍历所有**可见节点**，不可见节点包括：1）`script`,`meta`这样本身不可见的标签。2)被css隐藏的节点，如`display: none`
    2. 对每一个可见节点，找到恰当的CSSOM规则并应用
    3. 发布可视节点的内容和计算样式
22. js解析如下：
    1. 浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时**document.readystate为loading**
    2. HTML解析器遇到**没有async和defer的script时**，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用document.write()把文本插入到输入流中。**同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容**
    3. 当解析器遇到设置了**async**属性的script时，开始下载脚本并继续解析文档。脚本会在它**下载完成后尽快执行**，但是**解析器不会停下来等它下载**。异步脚本**禁止使用document.write()**，它们可以访问自己script和之前的文档元素
    4. 当文档完成解析，document.readState变成interactive
    5. 所有**defer**脚本会**按照在文档出现的顺序执行**，延迟脚本**能访问完整文档树**，禁止使用document.write()
    6. 浏览器**在Document对象上触发DOMContentLoaded事件**
    7. 此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些**内容完成载入并且所有异步脚本完成载入和执行**，document.readState变为complete,window触发load事件
23. **显示页面**（HTML解析过程中会逐步显示页面）

- 补充知识：浏览器缓存包含两种类型，即强缓存（也叫本地缓存）和协商缓存
- 强缓存和协商缓存:https://www.cnblogs.com/wonyun/p/5524617.html

```
获取资源形式    状态码    发送请求到服务器
强缓存     从缓存取     200（from cache）    否，直接从缓存取
协商缓存     从缓存取     304（not modified）    是，正如其名，通过服务器来告知缓存是否可用
```

## 13.1 性能提升

### 13.1.1 提升页面性能的方法有哪些？

1. 资源压缩合并，减少HTTP请求；
2. 非核心代码的异步加载 ---> 异步加载的方式有哪些？ ---> 异步加载的区别？
3. **利用浏览器的缓存 ---> 缓存的分类 ---> 缓存的原理**
4. 使用CDN加速
5. **预解析DNS：DNS Prefetch 是一种DNS 预解析技术，当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行DNS的解析，减少用户等待时间，提高用户体验。（提前解析域名，而不是点击链接的时候才去进行DNS域名解析，可以节省DNS解析需要耗费的20-120毫秒时间）**

```html
<!-- https协议的网站，默认是关闭了DNS的预解析的，可以使用下面的语句开启  -->
<meta http-equiv="x-dns-prefetch-control" content="on">
<!-- 开始配置需要进行DNS预解析的域名 -->
<link rel="dns-prefetch" href="//www.zhix.net">                               <!--支持http和HTTPS-->
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />               <!--支持http的协议-->
<link rel="dns-prefetch" href="http://nsclick.baidu.com" />
<link rel="dns-prefetch" href="http://hm.baidu.com" />
<link rel="dns-prefetch" href="http://eiv.baidu.com" />
```

### 18. 使用 window.performace 来实现用户体验的数据记录呢？

![性能监控](https://www.52tech.tech/docs/img/%E6%80%A7%E8%83%BD%E7%9B%91%E6%8E%A7-timing.png)

# 8. Web 安全

## 8.1 CSRF

CSRF（Cross Site Request Forgy），打开同一浏览器时其他的网站对本网站造成的影响。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求；如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。

### 1. 介绍一下CSRF攻击的原理？

[![CSRF攻击原理](https://github.com/cjiali/front-end-interview/raw/master/img/interview/csrf.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/interview/csrf.jpg)

**可以成功攻击的条件：**

1. 目标网站存在CSRF漏洞的请求接口（一般为get请求）
2. 目标用户之前已经成功登录过这个网站（留下了Cookie）

### 2、如何防御 CSRF 攻击？

1. Get 请求不对数据进行修改

1. 不让第三方网站访问到用户 Cookie
2. 阻止第三方网站请求接口
3. 请求时附带验证信息，比如验证码或者 Token
4. 对 Cookie 设置 SameSite 属性。该属性表示 Cookie 不随着跨域请求发送，可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。
5. Token验证
   - 客户端发送时自动带上 cookie，而不会主动带上Token，所以在每次发送时主动发送Token
6. Referer验证
   - 对于需要防范 CSRF 的请求，可以通过验证 Referer 来判断该请求是否为第三方网站发起的。
7. 隐藏令牌
   - 主动在HTTP头部中添加令牌信息

禁止第三方网站带cookies

> **SameSite attribute**
>
> `SameSite` Cookie 允许服务器要求某个 cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）。
>
> SameSite cookies 是相对较新的一个字段，[所有主流浏览器都已经得到支持](https://developer.mozilla.org/en-US/docs/Web/HTTP/headers/Set-Cookie#Browser_compatibility)。
>
> 下面是例子：
>
> ```js
> Set-Cookie: key=value; SameSite=Strict
> ```
>
> SameSite 可以有下面三种值：
>
> - `None`**。**浏览器会在同站请求、跨站请求下继续发送 cookies，不区分大小写。
> - **`Strict`。**浏览器将只在访问相同站点时发送 cookie。（在原有 Cookies 的限制条件上的加强，如上文 “Cookie 的作用域” 所述）
> - **`Lax`。**与 **`Strict`** 类似，但用户从外部站点导航至URL时（例如通过链接）除外。 在新版本浏览器中，为默认选项，Same-site cookies 将会为一些跨站子请求保留，如图片加载或者 frames 的调用，但只有当用户从外部站点导航到URL时才会发送。如 link 链接

## 8.2 XSS

XSS ( Cross Site Scripting ) 是指恶意攻击者利用网站没有对用户提交数据进行转义处理或者过滤不足的缺点，进而添加一些代码，嵌入到web页面中去。使别的用户访问都会执行相应的嵌入代码。从而盗取用户资料、利用用户身份进行某种动作或者对访问者进行病毒侵害的一种攻击方式。

### 1. 介绍一下 XSS 攻击的原理？

**反射型**

> 通过url参数直接注入。

发出请求时，XSS代码出现在URL中，作为输入提交到服务器端，服务端解析后返回，XSS代码随响应内容一起传回给浏览器，最后浏览器执行XSS代码。这个过程像一次反射，故叫做反射型XSS。

**例如**：一个链接，里面的query字段中包含一个script标签，这个标签的src就是恶意代码，用户点击了这个链接后会先向服务器发送请求，服务器返回时也携带了这个XSS代码，然后浏览器将查询的结果写入Html，这时恶意代码就被执行了。

> 并不是在url中没有包含script标签的网址都是安全的，可以使用[短网址](https://www.52tech.tech/docs/前端知识体系/Web安全/dwz.com)来让网址变得很短。

**存储型**

存储型XSS会被保存到数据库，在其他用户访问（前端）到这条数据时，这个代码会在访问用户的浏览器端执行。

**例如**：比如攻击者在一篇文章的评论中写入了script标签，这个评论被保存数据库，当其他用户看到这篇文章时就会执行这个脚本。

### 2、如何防御 XSS 攻击？

对于 XSS 攻击来说，通常有两种方式可以用来防御。

- 转义字符
- CSP 内容安全策略

## 8.3 CSRF和XSS的区别呢？

1. CSRF：网站本身存在漏洞的接口，依赖这些登录过目标网站的用户来实现信息的窃取；
2. XSS：向页面中注入JS执行，JS函数体内执行目标任务；

> [!NOTE]
>
> 1、一定要说出中文名称，实现原理，防范措施都说出来
>
> 2、不要拖泥带水，言简意赅

## 8.4 什么是 HTTP CSP 内容安全策略？

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

- 限制资源获取
- 报告资源获取越权

通常可以通过两种方式来开启 CSP：

- 设置 HTTP Header 中的 `Content-Security-Policy`
- 设置 meta 标签的方式 `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">`

这一部分提供了一些常用的安全策略方案示例。

示例 1：一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名)

```http
Content-Security-Policy: default-src 'self'
```

示例 2：一个网站管理者允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)

```http
Content-Security-Policy: default-src 'self' *.trusted.com
```

示例 3：一个网站管理者允许网页应用的用户在他们自己的内容中包含来自任何源的图片, 但是限制音频或视频需从信任的资源提供者(获得)，所有脚本必须从特定主机服务器获取可信的代码.

```http
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

在这里，各种内容默认仅允许从文档所在的源获取, 但存在如下例外:

- 图片可以从任何地方加载(注意 "*" 通配符)。
- 多媒体文件仅允许从 `media1.com` 和 `media2.com` 加载(不允许从这些站点的子域名)。
- 可运行脚本仅允许来自于 `userscripts.example.com`。

示例 4：一个线上银行网站的管理者想要确保网站的所有内容都要通过SSL方式获取，以避免攻击者窃听用户发出的请求。

```http
Content-Security-Policy: default-src https://onlinebanking.jumbobank.com
```

该服务器仅允许通过HTTPS方式并仅从onlinebanking.jumbobank.com域名来访问文档。

示例 5： 一个在线邮箱的管理者想要允许在邮件里包含HTML，同样图片允许从任何地方加载，但不允许JavaScript或者其他潜在的危险内容(从任意位置加载)。

```http
Content-Security-Policy: default-src 'self' *.mailsite.com; img-src *
```

 注意这个示例并未指定[`script-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)。在此CSP示例中，站点通过 [`default-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src) 指令的对其进行配置，这也同样意味着脚本文件仅允许从原始服务器获取。

参见：

[HTTP CSP 内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/CSP)

# 计算机网络

## 1. 介绍一下OSI七层参考模型和TCP/IP五层模型

**OSI七层模型**

[<img src="https://www.52tech.tech/docs/img/OSI-%E4%B8%83%E5%B1%82%E6%A8%A1%E5%9E%8B.png" alt="OSI七层参考模型" style="zoom:50%;" />](https://www.52tech.tech/docs/img/OSI-七层模型.png)

**TCP/IP五层模型**

[<img src="https://www.52tech.tech/docs/img/TCP-IP-%E4%BA%94%E5%B1%82%E6%A8%A1%E5%9E%8B.png" alt="TCP/IP五层模型" style="zoom:50%;" />](https://www.52tech.tech/docs/img/TCP-IP-五层模型.png)

**各层的设备**

[<img src="https://www.52tech.tech/docs/img/TCP%E6%A8%A1%E5%9E%8B-%E5%90%84%E5%B1%82%E8%AE%BE%E5%A4%87.png" alt="各层设备" style="zoom:50%;" />](https://www.52tech.tech/docs/img/TCP模型-各层设备.png)

**各层对应协议**

[<img src="https://www.52tech.tech/docs/img/TCP%E6%A8%A1%E5%9E%8B-%E5%90%84%E5%B1%82%E5%8D%8F%E8%AE%AE.png" alt="各层协议" style="zoom:50%;" />](https://www.52tech.tech/docs/img/TCP模型-各层协议.png)

参见：

https://www.cnblogs.com/qishui/p/5428938.html

## 4. HTTP

HTTP是Hyper Text Transfer Protocol（超文本传输协议）的缩写。它是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。

### 4.1 HTTP协议的主要特点？

- 无连接(重点理解)
  - 限制每次连接只处理一个请求。
  - 服务器处理完客户的请求，并收到客户的应答后，即断开连接。
  - 采用这种方式可以节省传输时间。
- 无状态
  - 协议对于事务处理没有记忆能力。
- 简单快速
  - 客户向服务器请求服务时，只需传送请求方法和路径。
- 灵活
  - HTTP允许传输任意类型的数据对象。
  - 正在传输的类型由`Content-Type`加以标记。

### 4.2 HTTP报文的组成部分？

[![数据包](https://www.52tech.tech/docs/img/http-data.jpg)](https://www.52tech.tech/docs/img/http-data.jpg)

- 请求报文：
  - 请求行：请求方法 资源地址 HTTP版本 
  - 请求头：` key : value` 
  - 空行 : 
  - 请求体 : `name=zhangsan&age=18`
- 响应报文 : 
  - HTTP版本 状态码 状态行 
  - 响应头 
  - 空行 
  - 响应体

### 4.3 HTTP方法？

- GET : 获取资源
- POST ： 传输资源
- PUT ：更新资源
- DELETE ： 删除资源
- HEAD ：获取报文首部
- OPTIONS : 允许客户端查看服务器的性能。

### 4.4 POST和GET的区别？

1. **GET请求在浏览器回退的时候是无害的，而POST会再次提交请求**
2. GET请求产生的URL地址可以被收藏，而POST不可以
3. **GET请求会被浏览器主动缓存，而POST不会，除非主动设置**
4. GET请求只能进行URL编码，而POST支持多种编码方式
5. GET请求参数会被完整第保留在浏览器的历史记录里面，而POST参数不会被保留
6. **GET请求爱URL中传送的参数的长度是有限的（2KB），而POST没有限制**
7. 对参数的数据类型，GET值接受ASCII字符，而POST没有限制
8. POST比GET更安全，GET参数直接暴露在URL上，所以不能用来传递敏感信息 
9. **GET参数通过URL传递，POST参数直接放在了Request body中**

### 4.5 HTTP状态码？

**1XX 指示信息（面试考点）**

表示请求已接收，继续处理

**2XX 成功**

- **200** OK： 客户端请求成功
- 204 No content：表示请求成功，但响应报文不含实体的主体部分
- 205 Reset Content：表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- **206** Partial Content：进行范围请求

**3XX 重定向**

- **301** Moved Permanently ： 永久性重定向，表示资源已被分配了新的 URL

- **302** Found ：临时性重定向，表示资源临时被分配了新的 URL

- 303 See Other：表示资源存在着另一个 URL，应使用 GET 方法获取资源

- **304** Not Modified ：未修改，重定位到浏览器。

  > 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。如果网页自请求者上次请求后再也没有更改过，您应将服务器配置为返回此响应（称为 If-Modified-Since HTTP 标头）。服务器可以告诉 Googlebot 自从上次抓取后网页没有变更，进而节省带宽和开销。

- 307 Temporary Redirect：临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

**4XX 客户端错误**

- **404** Not Found：在服务器上没有找到请求的资源
- **403** Forbidden：表示对请求资源的访问被服务器拒绝
- 400 Bad Request ：请求报文存在语法错误
- 401 Unauthorized ：表示发送的请求需要有通过 HTTP 认证的认证信息

**5XX 服务器错误**

- **500** Internal Server Error ：表示服务器端在执行请求时发生了错误
- 501 表示服务器不支持当前请求所需要的某个功能
- **503** Service Unavailable ： 表明服务器暂时处于超负载或正在停机维护，无法处理请求
- 504 Gateway Timeout：当服务器作为网关，不能及时得到响应时返回此错误代码。

参见：

[HTTP 响应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### 4.6 什么是持久连接？

> HTTP协议采用“**请求-应答**”模式，并且HTTP是基于TCP进行连接的。普通模式（非keep-alive）时，每个请求或应答都需要建立一个连接，完成之后立即断开。

当使用**持久连接**模式（keep-alive，又连接重用）时，客户端到服务器端连接持续有效，即不关闭底层的TCP连接，当出现对服务器的后继请求时，使用`Keep-alive`字段可以避免重新建立连接。

```html
Conection: keep-alive
```



### 4.7 什么是管线化？

**基本概念**

- 在使用持久连接（Keep-alive）的情况下，某个连接上的消息的传递类似于：请求1 --> 响应1 --> 请求2 --> 响应2 --> 请求3 --> 响应3
- 管线化的过程： 请求1 --> 请求2 --> 请求3 --> 响应1 --> 响应2 --> 响应3

[![pipe](https://www.52tech.tech/docs/img/pipe.png)](https://www.52tech.tech/docs/img/pipe.png)

管线化后，请求和响应不再是依次交替的了，可以支持一次性发送多个请求，并一次性接收多个响应。

- 只有 GET 与 HEAD 请求可以进行管线化，POST有限制
- 初次创建连接时不应该启动管线机制，因为服务器不一定支持该协议

**管线化的特点（重点）**

1. **管线化机制通过持久连接完成，仅在HTTP1.1版本之后支持**
2. **只有GET和HEAD请求可以进行管线化，POST有所限制的**
3. **初次创建连接的时候不应该启动管线机制，因为对方（服务器）不一定支持HTTP1.1版本的协议**
4. 管线化不会影响到响应到来的顺序，HTTP响应返回的顺序并未改变
5. HTTP1.1 要求服务器支持管线化，但并不要求服务器也对响应进行管线化处理，只是要求对于管线化的请求不失败即可
6. 由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器和代理程序对管线化的支持并不好，因此现代的浏览器如Chrome和Firefox默认并没有开启管线化支持

## HTTPS

**HTTPS协议 = HTTP协议 + SSL/TLS协议**，在HTTPS数据传输的过程中，需要用SSL/TLS对数据进行加密和解密，需要用HTTP对加密后的数据进行传输，由此可以看出HTTPS是由HTTP和SSL/TLS一起合作完成的。

**SSL**的全称是Secure Sockets Layer，即安全套接层协议，是为网络通信提供安全及数据完整性的一种安全协议。SSL协议在1994年被Netscape发明，后来各个浏览器均支持SSL，其最新的版本是3.0。

**TLS**的全称是Transport Layer Security，即安全传输层协议，最新版本的TLS（Transport Layer Security，传输层安全协议）是IETF（Internet Engineering Task Force，Internet工程任务组）制定的一种新的协议，它建立在SSL 3.0协议规范之上，是SSL 3.0的后续版本。在TLS与SSL3.0之间存在着显著的差别，主要是它们所支持的加密算法不同，所以TLS与SSL3.0不能互操作。虽然TLS与SSL3.0在加密算法上不同，但是在我们理解HTTPS的过程中，我们可以把SSL和TLS看做是同一个协议。

HTTPS为了兼顾安全与效率，**同时使用了对称加密和非对称加密**。数据是被对称加密传输的，对称加密过程需要客户端的一个密钥，为了确保能把该密钥安全传输到服务器端，采用非对称加密对该密钥进行加密传输，总的来说，**对数据进行对称加密，对称加密所要使用的密钥通过非对称加密传输**。

[![加密](https://www.52tech.tech/docs/img/httpscrypt.png)](https://www.52tech.tech/docs/img/httpscrypt.png)

**传输秘钥**

HTTPS在传输的过程中会涉及到三个密钥：

- 服务器端的公钥和私钥，用来进行非对称加密
- 客户端生成的随机密钥，用来进行对称加密

**传输细节（重点理解）**

一个HTTPS请求实际上包含了两次HTTP传输，可以细分为8步。

1. 客户端向服务器发起HTTPS请求，连接到服务器的443端口
2. 服务器端有一个密钥对，即公钥和私钥，是用来进行非对称加密使用的，服务器端保存着私钥，不能将其泄露，公钥可以发送给任何人。
3. 服务器将自己的公钥发送给客户端。
4. 客户端收到服务器端的公钥之后，会对公钥进行检查，验证其合法性，如果发现发现公钥有问题，那么HTTPS传输就无法继续。严格的说，这里应该是验证服务器发送的数字证书的合法性。如果公钥合格，那么客户端会生成一个随机值，这个随机值就是用于进行对称加密的密钥，我们将该密钥称之为client key，即客户端密钥，这样在概念上和服务器端的密钥容易进行区分。然后用服务器的公钥对客户端密钥进行非对称加密，这样客户端密钥就变成密文了，至此，HTTPS中的第一次HTTP请求结束。
5. 客户端会发起HTTPS中的第二个HTTP请求，将加密之后的客户端密钥发送给服务器。
6. 服务器接收到客户端发来的密文之后，会用自己的私钥对其进行非对称解密，解密之后的明文就是客户端密钥，然后用客户端密钥对数据进行对称加密，这样数据就变成了密文。
7. 然后服务器将加密后的密文发送给客户端。
8. 客户端收到服务器发送来的密文，用客户端密钥对其进行对称解密，得到服务器发送的数据。这样HTTPS中的第二个HTTP请求结束，整个HTTPS传输完成。

**TLS 握手过程**

[![TLS](https://www.52tech.tech/docs/img/tls.png)](https://www.52tech.tech/docs/img/tls.png)

1. 客户端发送一个随机值，需要的协议和加密方式
2. 服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的协议和加密方式来使用对应的方式，发送自己的证书（如果需要验证客户端证书需要说明）
3. 客户端收到服务端的证书并验证是否有效，验证通过会再生成一个随机值，通过服务端证书的公钥去加密这个随机值并发送给服务端，如果服务端需要验证客户端证书的话会附带证书
4. 服务端收到加密过的随机值并使用私钥解密获得第三个随机值，这时候两端都拥有了三个随机值，可以通过这三个随机值按照之前约定的加密方式生成密钥，接下来的通信就可以通过该密钥来加密解密.

通过以上步骤可知，在 TLS 握手阶段，两端使用非对称加密的方式来通信，但是因为非对称加密损耗的性能比对称加密大，所以在正式传输数据时，两端使用对称加密的方式通信。

参见：

https://www.jianshu.com/p/14cd2c9d2cd2

> 

# 二三面（知识深度面）



## 16. 错误监控/如何保证前端产品的上线质量？

### 16.1 前端错误的分类？

1. 即时运行错误：代码错误
2. 资源加载错误：图片/css/js文件加载失败

### 16.2 错误的捕获方式？

#### 16.2.1 即时运行错误的捕获方式

```js
// 方法一：使用try catch捕获
try {
    // ...
} catch (e) {
    // error
} finally {
    // handle error
}

// 方法二：使用window.onerror 捕获错误
// 无法捕获到资源加载错误
window.onerror = function(msg, url, line, col, error){
    // ...
}  
window.addEventListener('error', function(msg, url, line, col, error){
    // ...
})
```

#### 16.2.2 资源加载错误（不会向上冒泡）

```js
// 方法一: 直接在script, img这些DOM标签上面直接加上onerror事件
Object.onerror = function(e){
    // ...
}

// 方法二：window.performace.getEntries(间接获取资源加载错误的数量)
var loadedResources = window.performance.getEntries();           // 1. 获取浏览器中已经加载的所有资源（包括各个阶段的详细加载时间）
var loaderImgs = loadedResources.filter(item => {
    return /\.jpg|png|gif|svg/.test(item.name)
});
var imgs = document.getElementsByTagName('img');                // 2. 获取页面中所有的img集合
var len = imgs.length - loaderImgs.length;                      // 3. 加载失败的图片数量
console.log('图片加载失败数量：', len, '条');


// 方法三： 使用事件捕获的方式来实现Error事件捕获
// 使用事件捕获的方式来实现资源加载错误的事件的捕获：window ---> document --> html --- > body ---> div ---...
window.addEventListener('error', function (msg) {
    console.log(msg);
}, true);
```

#### 16.2.3 补充的方法

```js
// 使用事件捕获的方式来实现
window.addEventListener('error', function (msg) {
    console.log('资源加载异常成功捕获：', msg);
}, true);
// 使用事件冒泡的方式是只能捕获到运行的时候的一些异常
window.addEventListener('error', function (e) {
    console.log('运行异常成功捕获1：', e.message, e.filename, e.lineno, e.colno, e.error);
}, false);

// 这种方式是可以按照参数的方式来接受相关的参数信息
window.onerror = function (msg, url, line, col, error) {
    console.log('运行异常成功捕获2：', msg, url, line, col, error);
}
```

#### 16.2.4 问题的延伸：跨域的js运行错误可以捕获吗，错误提示是什么？应该怎么处理呢？

**错误信息**

```
errorinfo :
Resource interpreted as Script but transferred
错误信息：Script error
出错文件：
出错行号：0
出错列号：0
错误详情：null
```

**处理方法**

**第一步**：在script标签上增加crossorigin属性

```html
<!-- script 表情添加crossorigin属性 -->
<!-- 除了 script，所有能引入跨域资源的标签包括 link 和 img 之类，都有一样的属性 -->
<script crossorigin  src="http://www.lmj.com/demo/crossoriginAttribute/error.js"></script>
```

**第二步**：设置js资源响应头'Access-Control-Allow-Origin: * ',服务器端需要开启

```js
// 服务器可以直接设置一个响应头信息
res.setResponseHeader('Access-Control-Allow-Origin', 'www.lmj.com');
```

### 16.3 上报错误的基本原理？

1. 采用Ajax通信的方式来上报
2. 利用Image对象进行上报（cnzz）[重点理解掌握]

```js
// 下面的两种方式都是可以实现错误信息的上报功能的
(new Image).src = 'http://www.baidu.com?name=zhangsna&age=18&sex=male'
(new Image()).src = 'https://www.baidu.com?name=zhangsan'
```

## 17. 如何使用JS获取客户端的硬件信息呢？

```js
  // IE 浏览器提供的获取电脑硬件的API
var locator = new ActiveXObject ("WbemScripting.SWbemLocator");
var service = locator.ConnectServer(".");
var properties = service.ExecQuery("SELECT * FROM Win32_Processor");
```



# 三四面（业务项目面）

> [!NOTE]

- 知识面要广
- 理解要深刻
- 内心要诚实：没了解过，问面试官有哪些资料可以学习
- 态度要谦虚
- 回答要灵活：把握一个度，不要和面试官争执对错
- - 要学会赞美：被问住了可以回答，适当赞美（没面试官理解的那么深，虚心请教）

## 19.介绍一下你做过的项目？

[![项目介绍](https://github.com/cjiali/front-end-interview/raw/master/img/%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/项目介绍.jpg)

### 19.1 项目介绍模板（业务能力体现）

1. 我做过什么业务？
2. 负责的业务有什么业绩？
3. 使用了什么技术方案？
4. 突破了什么技术难点？
5. 遇到了什么问题？
6. 最大的收获是什么？

### 19.2 团队协作能力

[![项目介绍](https://github.com/cjiali/front-end-interview/raw/master/img/%E5%9B%A2%E9%98%9F%E5%8D%8F%E4%BD%9C%E8%83%BD%E5%8A%9B.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/团队协作能力.jpg)

### 19.3 事务推动能力

[![项目介绍](https://github.com/cjiali/front-end-interview/raw/master/img/%E4%BA%8B%E5%8A%A1%E6%8E%A8%E5%8A%A8%E8%83%BD%E5%8A%9B.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/事务推动能力.jpg)

### 19.4 带人能力

[![项目介绍](https://github.com/cjiali/front-end-interview/raw/master/img/%E5%B8%A6%E4%BA%BA%E8%83%BD%E5%8A%9B.jpg)](https://github.com/cjiali/front-end-interview/blob/master/img/带人能力.jpg)

# 终面（HR面）

## 20. 技术终面或HR面试要点

> [!NOTE] 主要考察点：乐观积极、主动沟通、逻辑顺畅、上进有责任心、有主张，做事果断、职业竞争力、职业规划

### 20.1 职业竞争力

1. **业务能力**：可以做到行业第一
2. **思考能力**：对同一件事可以从不同角度去思考，找到最优解
3. **学习能力**：不断学习新的业务，沉淀、总结
4. **无上限的付出**：对于无法解决的问题可以熬夜、加班

### 20.2 职业规划

1. **目标是什么**：在业务上成为专家，在技术上成为行业大牛
2. **近阶段的目标**：不断的学习积累各方面地经验，以学习为主
3. **长期目标**：做几件有价值的事情，如开源作品、技术框架等
4. **方式方法**：先完成业务上的主要问题，做到极致，然后逐步向目标靠拢