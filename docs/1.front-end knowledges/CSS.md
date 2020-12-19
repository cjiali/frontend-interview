# CSS基础

## 1.CSS样式（选择器）的优先级？

**1.1 权重的计算规则**

1. 第一等：无条件优先的属性只需要在属性后面使用`!important`，它会覆盖页面内任何位置定义的元素样式。
2. 第二等：内联样式，如：`style="color:red;"`，权值为`1000`.（该方法会造成css难以管理，所以不推荐使用）
3. 第三等：ID选择器，如：`#header`，权值为`0100`.
4. 第四等：类选择器、如：`.bar`， 权值为`0010`.
5. 第五等：类型（标签）选择器和伪元素选择器，如：`div::first-line` 权值为`0001`.
6. 第六等：通配符，子选择器，相邻选择器等。如`*`、`>`、`+`，权值为`0000`.
7. 继承的样式没有权值。

CSS选择器的优先级：`!important` > 行内样式 > ID选择器 > 类选择器 > 标签选择器 > 其他

**1.2 实际案例**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            a{color: yellow;} /* 权值：0,0,0,1 */
            div a{color: green;} /* 权值：0,0,0,2 */
            .demo a{color: black;} /* 权值：0,0,1,1 */
            .demo input[type="text"]{color: blue;} /* 权值：0,0,2,1 */
            .demo *[type="text"]{color: grey;} /* 权值：0,0,2,0 */
            #demo a{color: orange;} /* 权值：0,1,0,1 */
            div#demo a{color: red;} /* 权值：0,1,0,2 */
        </style>
    </head>
    <body>
        <a href="">第一条应该是黄色</a> <!-适用第1行规则->
        <div class="demo">
            <input type="text" value="第二条应该是蓝色" /><!-适用第4、5行规则，第4行优先级高->
            <a href="">第三条应该是黑色</a><!-适用第2、3行规则，第3行优先级高->
        </div>
        <div id="demo">
            <a href="">第四条应该是红色</a><!-适用第5、6行规则，第6行优先级高->
        </div>
    </body>
</html>
```



## 2.雪碧图的作用？

减少HTTP的请求次数，提高加载的性能 在一些情况下可以减少图片的大小

> 关键在于对`background-position`概念的理解和使用

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>购物车特效</title>
        <style type="text/css">
            *{
                margin: 0;
                padding: 0;
            }
            .select{
                margin: 0 auto;
                display: block;
                width: 1000px;
                height: 35px;
                background-color:#F5FFFA;
            }
            div{
                width: 42px;
                height: 34px;
                background-image: url(amazon-sprite_.png);
                background-repeat: no-repeat;
                background-position: -8px -335px;
            }
            div:hover{
                background-image: url(amazon-sprite_.png);
                background-repeat: no-repeat;
                background-position: -55px -335px;
            }
        </style>
    </head>
    <body>
        <a href="https://www.baidu.com" target='_blank' class="select">
            <div></div>
        </a>
    </body>
</html>
```

## 3.自定义字体的使用场景？

- 宣传/品牌/banner等固定文案
- 字体图标中使用

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            @font-face{
                font-family: '字体名称随便起'; 
                src: url('../font/字体名称.eot');
                src:url('../font/字体名称.woff') format('woff'),
                    url('../font/字体名称.ttf') format('truetype'),
                    url('../font/字体名称.svg') format('svg');
            }
            /* 使用方法：html中的代码中加一个h1或者其他的，里面写你自己想要的特殊文字 */
            h1{
                font-size:36px; 
                color:#ccc;
                font-family: "字体名称随便起";
            }
        </style>
    </head>
</html>
```

## 4.Base64的使用？

**4.1 概念**

Base64 就是一种基于 64 个可见字符（26个大写字母，26个小写字母，10个数字，加上个`+`、 `/` 刚好64个字符）来表示二进制数据的表示方法。

**扩展：**不可见字符其实并不是不显示，只是这些字符在屏幕上显示不出来，比如：换行符、回车、退格......字符。

Base64 字符表中的字符原本用 6 个 bit 就可以表示，现在前面添加 2 个 0，变为 8 个 bit，会造成一定的浪费。因此，Base64 编码之后的文本，要比原文大约三分之一。

**4.2 原理**

- 第一步，将待转换的字符串每三个字节分为一组（每个字节占8bit），共24个二进制位。
- 第二步，将上面的24个二进制位每6个一组，共分为4组。
- 第三步，在每组前面添加两个0，每组由6个变为8个二进制位，总共32个二进制位，即四个字节。
- 第四步，根据Base64编码对照表（见下图）获得对应的值。

**4.3 作用**

- 用于减少HTTP请求
- 适用于小图片
- base64编码图片之后的体积约为原图的4/3

## 5.伪类和伪元素的区别？

- 前者是单冒号，后者是双冒号
- 伪元素是真的有元素

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            li:first-child {
                height: 20px;
                width: 100px;
                background-color: #139aff;
            }
            li:last-child {
                height: 60px;
                width: 100px;
                background-color: #89ff56;
                line-height: 60px;
            }
            p:first-of-type {
                background-color:  red;
            }
            p:last-of-type {
                background-color:deeppink;
            }
            /*每个p标签之前新增一个Hello文本*/
            .container p::before {
                content: 'Hello';
            }
            .container p::after {
                content: 'Thanks';
            }
            .container p::first-letter {
                font-size: 32px;
            }
            .container p::first-line {
                background-color: #f1ffad;
            }
            /*所有选中的元素会变色*/
            .container p::selection {
                background-color: #1025ff;
                color: red;
            }
        </style>
    </head>
    <body>
        <ul>
            <li>111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
            <li>555</li>
        </ul>
        <div>
            <h1>h1文本</h1>
            <p>p文本1</p>
            <p>p文本2</p>
            <p>p文本3</p>
            <p>p文本4</p>
        </div>

        <div class="container">
            <p> css1 </p>
            <p> css2 </p>
            <p> css3 </p>
            <p>我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素,我在学伪元素</p>
        </div>
    </body>
</html>
```

## 6.如何美化CheckBox？

1. `label[for]`和`id`
2. 隐藏原生的 input
3. `:checked` + `label` 选择器

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            #value1{
                display: none;
            }
            #value1:checked+label{
                color:blue;
                background: #4cda60;
            }
            #value1:checked+label:before{
                left:31px;
            }
            #value1+label{
                cursor: pointer;
                color:red;
                display: block;
                width:60px;
                height: 30px;
                background: #fafbfa;
                border-radius: 15px;
                position: relative;
                box-shadow:inset 0 0 0 0 #eee,0 0 1px rgba(0,0,0,0.4);
                transition: background 0.1s;
                -webkit-transition: background 0.1s;
                -moz-transition: background 0.1s;
                -o-transition: background 0.1s;
            }
            #value1+label:before{
                content:'';
                position: absolute;
                background: #fff;
                top:1px;
                left:1px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                box-shadow:0 3px 1px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.3);
                transition: left 0.1s;
                -webkit-transition: left 0.1s;
                -moz-transition: left 0.1s;
                -o-transition: left 0.1s;
            }
        </style>
    </head>
    <body>
        <input type="checkbox" name="timeType" value="1" id="value1" checked="checked"/>
        <label for="value1"></label>
    </body>
</html>
```



# CSS布局

## 1.实现两栏/三栏布局的方法?

1. 表格布局
2. float + margin 布局
3. inline-block 布局
4. flexbox 布局（兼容性的问题）

**1.1 基础布局**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            .layout {
                margin-top: 10px;
            }
            .layout div{
                min-height: 100px;
            }
        </style>
    </head>
    <body>
        <!--1.浮动的方式来实现布局-->
        <section class="layout float">
            <style>
                .layout.float .left {
                    float: left;
                    width: 300px;
                    background-color: #48adff;
                }
                .layout.float .main {
                    margin-left: 300px;
                    background-color: #ff4344;
                }
            </style>
            <article class="left-main">
                <div class="left"></div>
                <div class="main">
                    <h1>浮动两栏布局</h1>
                    <p>两栏布局的中间部分</p>
                    <p>两栏布局的中间部分</p>
                </div>
            </article>
        </section>
        <!--2.定位的方式来实现布局-->
        <section class="layout absolute">
            <style>
                .layout.absolute .left-main {
                    width: 100%;
                }
                .layout.absolute .left {
                    left : 0;
                    width: 300px;
                    background-color: #48adff;
                    position: absolute;
                }
                .layout.absolute .main {
                    /*默认是以正常文档流的方式来展现的*/
                    background-color: #ff4344;
                    margin-left: 300px;
                    right: 0;
                }
            </style>
            <article class="left-main">
                <div class="left"></div>
                <div class="main">
                    <h1>绝对定位两栏布局</h1>
                    <p>两栏布局的中间部分</p>
                    <p>两栏布局的中间部分</p>
                </div>
            </article>
        </section>
        <!--3.flex布局的实现-->
        <section class="layout flex">
            <style>
                .layout .left-main {
                    display: flex;
                }
                .layout .left {
                    width: 300px;
                    background-color: #48adff;
                }
                .layout .main {
                    flex: 1;
                    background-color: #ff4344;
                }
            </style>
            <article class="left-main">
                <div class="left"></div>
                <div class="main">
                    <h1>flex两栏布局</h1>
                    <p>两栏布局的中间部分</p>
                    <p>两栏布局的中间部分</p>
                </div>
            </article>
        </section>
        <!--4.table布局的实现-->
        <section class="layout table">
            <style>
                .layout .left-main {
                    display: table;
                    width: 100%;
                }
                .layout .left {
                    display : table-cell;
                    width: 300px;
                    background-color: #48adff;
                }
                .layout .main {
                    background-color: #ff255f;
                }
            </style>
            <article class="left-main">
                <div class="left"></div>
                <div class="main">
                    <h1>table两栏布局</h1>
                    <p>两栏布局的中间部分</p>
                    <p>两栏布局的中间部分</p>
                </div>
            </article>
        </section>
        <!--5.grid布局-->
        <section class="layout grid">
            <style>
                .layout.grid .left-main {
                    display: grid;
                }
                .layout.grid .left-main {
                    grid-template-rows : 100px;
                    /*按照顺序指定盒子的宽度*/
                    grid-template-columns : 300px  auto;
                }
                .layout.grid .left {
                    background-color: #48adff;
                }
                .layout.grid .main {
                    background-color: #ff4344;
                }
            </style>
            <article class="left-main">
                <div class="left"></div>
                <div class="main">
                    <h1>grid两栏布局</h1>
                    <p>两栏布局的中间部分</p>
                    <p>两栏布局的中间部分</p>
                </div>
            </article>
        </section>
    </body>
</html>
```

**1.2 圣杯布局**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>实现三栏水平布局之圣杯布局</title>
        <style type="text/css">
            /*基本样式*/
            .left, .right, .main {
                min-height: 300px;
            }
            .left {
                width: 200px;
                background-color:thistle;
            }
            .main {
                background-color: #999;
            }
            .right {
                width: 300px;
                background-color: violet;
            }
            /* 圣杯布局关键代码 */
            .left, .main, .right {
                float: left;
                position: relative;
            }
            .main {
                width: 100%;
            }
            .container {
                padding-left: 200px;
                padding-right: 300px;
            }
            .left {
                margin-left: -100%;
                left: -200px;
            }
            .right {
                margin-left: -300px;
                right: -300px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="main">main</div>
            <div class="left">left</div>
            <div class="right">right</div>
        </div>
    </body>
</html>
```



**1.3 双飞翼布局**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>双飞翼布局</title>
        <style>
            .left,
            .right,
            .main {
                min-height: 200px;
            }
            .left {
                width: 200px;
                background-color: thistle;
            }
            .main {
                background: #999;
            }
            .right {
                width: 300px;
                background-color: violet;
            }
            /* 双飞翼布局重点 */
            .left,
            .main,
            .right {
                float: left;
            }
            .main {
                width: 100%;
            }
            .main-inner {
                margin-left: 200px;
                margin-right: 300px;
            }
            .left {
                margin-left: -100%;
            }
            .right {
                margin-left: -300px;
            }
        </style>
    </head>
    <body>
        <div class="main"><div class="main-inner">中心区</div></div>
        <div class="left">left</div>
        <div class="right">right</div>
    </body>
</html>
```

## 2.absolute/fixed/static/sticky 定位?

- `absolute`相对于最近的`absolute/relative`进行定位
- `sticky`相对于屏幕进行定位
- `fixed`是相对于屏幕的可视区域的，也会直接脱离于文档流独立存在的
- 元素未滚动，在当前可视区域他的top值不生效，只有margin生效，滚动起来后margin失效，top值生效

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style type="text/css">
            p{
                font-size:11pt;
                color:#363636;
                text-indent:2em;
            }
            .parent{
                width:500px;
                height:150px;
                margin-top:20px;
                margin-left:20px;
                border:solid 1px #555555;
                background:#aaaaaa;
            }
            .parent div{
                width:100px;
                height:80px;
                float:left;
                background:#708090;
                border:dashed 1px #008B8B;
                font-size:12pt;
                font-weight:bold;
                color:#104E8B;
            }
        </style>
    </head>
    <body>
        <!--relative定位!-->
        <section>
            <h2>relative</h2>
            <p>相对定位是一个非常容易掌握的概念。如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直或水平位置，让这个元素“相对于”它的起点进行移动。</p>
            <div class="parent">
                <div>child 1</div>
                <div style="position:relative;left:20px;top:20px;">child 2</div>
                <div>child 3</div>
            </div>
        </section>
        <!--absolute定位!-->
        <section>
            <h2>absolute</h2>
            <p>绝对定位的元素的位置相对于最近的已定位祖先元素，如果元素没有已定位的祖先元素，那么它的位置相对于最初的包含块。
                对于定位的主要问题是要记住每种定位的意义。</p>
            <p>绝对定位是“相对于”最近的已定位祖先元素，如果不存在已定位的祖先元素，那么“相对于”最初的包含块。所以如果要设定元素与其父元素的绝对位置定位就必须设定父元素的定位。</p>
            <p>注释：根据用户代理的不同，最初的包含块可能是画布或 HTML 元素。</p>
            <div class="parent" style="position:relative;"><!--如果该处不定位，那么child5框的定位是相对于最初的包含块!-->
                <div>child 4</div>
                <div style="position:absolute;left:20px;top:20px;">child 5</div>
                <div>child 6</div>
            </div>
        </section>
        <!--fixed定位!-->
        <section>
            <h2>fixed</h2>
            <p>元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。</p>
            <div class="parent">
                <div>child 7</div>
                <div style="position:fixed;right:20px;top:20px;">child 8</div>
                <div>child 9</div>
            </div>
        </section>
        <!--static定位!-->
        <section>
            <h2>static</h2>
            <p>元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。</p>
            <div class="parent">
                <div>child 10</div>
                <div style="position:static;right:20px;top:20px;">child 11</div>
                <div>child 12</div>
            </div>
        </section>
    </body>
</html>
```

## 3.什么是层叠上下文？如何形层叠上下文？层叠顺序是怎样的？

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            .father-green {
                width:500px;
                height:300px;
                background-color:green;
            }
            .son-red {
                width:200px;
                height:100px;
                background-color:red;
                display:inline-block;
            }
            .subson-yellow {
                height:50px;
                width:200px;
                background-color: yellow;

            }
            .son-purple {
                width: 200px;
                height:100px;
                background-color:purple;
                display:inline-block;
                margin-left:-50px;
            }
            .mather-pink {
                width: 300px;
                height:100px;
                background-color:pink;
            }
            .daughter-blue {
                width:100px;
                height:50px;
                background-color:blue;
                margin-top:-20px;
            }
        </style>
    </head>
    <body>
        <div class="father-green">
            <div class="son-red">
                <div class="subson-yellow">
                    我是孙子辈的我是孙子辈的我是孙子辈的
                </div>
            </div>

            <div class="son-purple">
                我是第二个子元素
            </div>
        </div>
        <div class="mather-pink"><div class="daughter-blue">daughter-blue</div>
        </div>
    </body>
</html>
```

[![页面显示的层级关系](https://www.52tech.tech/docs/img/css-%E5%B1%82%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%87.png)](https://www.52tech.tech/docs/img/css-层叠上下文.png)

**3.1 形成层叠上下文的方法？**

- 根元素
- position值为 absolute|relative，且 z-index值不为 auto
- position 值为 fixed|sticky
- z-index 值不为 auto 的flex元素，即：父元素 display:flex|inline-flex
- opacity 属性值小于 1 的元素
- transform 属性值不为 none的元素
- mix-blend-mode 属性值不为 normal 的元素
- filter、 perspective、 clip-path、 mask、 mask-image、 mask-border、 motion-path 值不为none 的元素
- perspective 值不为 none 的元素
- isolation 属性被设置为 isolate 的元素
- will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
- -webkit-overflow-scrolling 属性被设置 touch的元素

 **Note:** 

- 层叠上下文可以包含在其他层叠上下文中，并且一起组建了一个有层级的层叠上下文
- 每个层叠上下文完全独立于它的兄弟元素，当处理层叠时只考虑子元素，这里类似于BFC
- 每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会在父级叠上下文中按顺序进行层叠

**3.2 CSS层叠上下优先级**

[![层叠上下优先级顺序](https://www.52tech.tech/docs/img/css-%E5%B1%82%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%87%E4%BC%98%E5%85%88%E7%BA%A7.png)](https://www.52tech.tech/docs/img/css-层叠上下文优先级.png)

- 1.形成堆叠上下文环境的元素的背景与边框
- 2.拥有负 z-index 的子堆叠上下文元素 （负的越高越堆叠层级越低）
- 3.正常流式布局，非 inline-block，无 position 定位（static除外）的子元素
- 4.无 position 定位（static除外）的 float 浮动元素
- 5.正常流式布局， inline-block元素，无 position 定位（static除外）的子元素（包括 display:table 和 display:inline ）
- 6.拥有 z-index:0 的子堆叠上下文元素
- 7.拥有正 z-index: 的子堆叠上下文元素（正的越低越堆叠层级越低）

**3.3 层叠上下文的堆叠顺序？**

[![层叠上下文的堆叠顺序](https://www.52tech.tech/docs/img/css-%E5%B1%82%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%872.png)](https://www.52tech.tech/docs/img/css-层叠上下文2.png)



**总结：**层叠上下文（border/background）< 负z-index < block块状盒子 < 浮动的盒子 < `inline/inline-block`水平盒子 <` z-index:auto` 或者 `z-index:0 `< 正z-index（**定位**并设定了正的z-index值，z-index值越大 层级越高）

## 4.如何解决inline-block 的间隙问题？

**4.1 字符间距问题**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            *{
                margin: 0;
                padding: 0;
            }
            ul{
                list-style: none;
            }
            li{
                display: inline-block;
                width: 100px;
                height: 100px;
                background: red;    
            }
        </style>
    </head>
    <body>
        <ul>
            <li>111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
            <li>555</li>
        </ul>
    </body>
</html>
```

[![CSS字符间距问题](https://www.52tech.tech/docs/img/css-%E5%AD%97%E7%AC%A6%E9%97%B4%E8%B7%9D%E9%97%AE%E9%A2%98.jpg)](https://www.52tech.tech/docs/img/css-字符间距问题.jpg)





**4.2 解决方法**

- 1.解决方法1：直接删除换行符（IE1像素残留）
- 2.设置父元素的font-size为0，在子元素重新设置字体大小（低版本safari 兼容性）
- 3.父元素 设置font-size：0 ；letter-spacing：-3px ，子元素重新设置font-size（推荐方案）

## 5.BFC是什么？如何清除浮动？

> BFC：浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。它是指一个独立的块级渲染区域，只有Block-level BOX参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关

**5.1 如何触发BFC?**

- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed

**5.2 BFC布局规则**

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的**margin会发生重叠（高频考点）**
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

**5.3 如何清除浮动？**

1. 原因：浮动的元素不会占据父元素的布局空间（父元素布局不会管浮动元素）
2. 清除方式： 让盒子负责自己的布局

5.3.1 添加额外标签

```html
<div class="main left">.main{float:left;}</div>
<div class="side left">.side{float:right;}</div>
<div style="clear:both;"></div>
<div class="footer">.footer</div>
```

5.3.2 父元素设置 overflow：hidden

```html
<div class="wrap" id="float3" style="overflow:hidden; *zoom:1;">
    <h2>3)父元素设置 overflow </h2>
    <div class="main left">.main{float:left;}</div>
    <div class="side left">.side{float:right;}</div>
</div>
<div class="footer">.footer</div>
```

5.3.3 使用:after 伪元素

```html
<style type="text/css">
 .clearfix:after {  
   content: ".";
    display: block; 
    height: 0; 
    clear: both; 
    visibility: hidden;  
    }  
.clearfix {
  display: inline-block;
  *zoom:1;
  }  /* for IE/Mac */  
</style>
<!--[if IE]>
 <style type="text/css">
 .clearfix {zoom: 1;/* triggers hasLayout */  display: block;/* resets display for IE/Win */} </style>
<![endif]-->
```

5.3.4 双伪元素清除法(推荐)

```css
.clearfix:before,.clearfix:after{
   content:"";
   display:table;
}
.clearfix:after{
  clear:both;
}
.clearfix{
  *zoom:1;
}
```

## 6.如何适配移动端？

### 6.1 viewport进行缩放

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
Copy
```

### 6.2 使用rem

rem是什么(CSS3新增)，初始值：1rem=16px？ rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位



 Note

rem(1rem = 16px) / viewport（固定宽度） / media query（屏幕大小自适应）

### 6.3 设计上（响应式方法）

隐藏（移动端隐藏元素） 折行（横排变纵排） 自适应（留下自适应的空间）（media query）

### 6.4 固定宽度做法

定宽布局（版心）

## 7.em和rem的区别？

1. rem 单位翻译为像素值是由 html 元素的字体大小决定的。 此字体大小会被浏览器中字体大小的设置影响，除非显式重写一个具体单位。
2. em 单位转为像素值，取决于他们使用的字体大小。 此字体大小受从父元素继承过来的字体大小，除非显式重写与一个具体单位

## 8.垂直居中的6中实现方式？

### 8.1 方法一：基于视口的垂直居中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .wrapper {
      overflow: hidden;
      width: 1000px;
      height: 500px;
      background: #999;
    }
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;


      /* 1vh = 1% * 视口高度 */
      margin: 50vh auto;
      transform: translateY(-50%);
    }

  </style>
  <body>
    <div class="wrapper">
      <div class="center">
        基于视口的垂直居中<br />
        不要求原生有固定的宽高。<br />
        但是这种居中是在整个页面窗口内居中，不是基于父元素<br />

      </div>
    </div>
  </body>
</html>
Copy
```

### 8.2 方法二：定宽居中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;

      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -9rem;
      margin-top: -5rem;
    }
  </style>
  <body>
    <div class="center">
        要求原生有固定的宽高。<br/>
        position: absolute;<br/>
        top和left 为 50%;<br/>
        margin上为高的一半<br/>
        margin左为宽的一半<br/>
    </div>

  </body>
</html>
Copy
```

### 8.3 方法三：calc居中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;

      position: absolute;
      top: calc(50% - 5em);
      left: calc(50% - 9em);
    }
  </style>
  <body>
    <div class="center">
        要求原生有固定的宽高。<br/>
        position: absolute;<br/>
        top 为 calc(50% 剪 一半高)
        left 为 calc(50% 剪 一半宽)
    </div>

  </body>
</html>
Copy
```

### 8.4 方法四：transform居中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
  <body>
    <div class="center">
        不要求原生有固定的宽高。<br/>
        position: absolute;<br/>
        top和left 为 50%;<br/>
        transform: translate(-50%, -50%);
    </div>

  </body>
</html>
Copy
```

### 8.5 方法五：flex居中方法1

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .wrapper {
      width: 1000px;
      height: 600px;
      background: #999;

      display: flex;
    }
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;

      margin: auto;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">
        使用flex居中<br/>
        父元素 display: flex; <br/>
        居中块： margin: auto;
      </div>
    </div>
  </body>
</html>
Copy
```

### 8.6 方法六: flex居中方法2

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>垂直居中</title>
  </head>
  <style>
    .wrapper {
      width: 1000px;
      height: 600px;
      background: #999;

      display: flex;
      /* 盒子横轴的对齐方式 */
      justify-content: center;
      /* 盒子纵轴的对齐方式 */
      align-items: center;
    }
    .center {
      width: 18em;
      height: 10em;
      text-align: center;
      background-color: orange;
      color: #fff;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">
        使用flex居中<br/>
        父元素 display: flex; <br/>
        justify-content: center;<br/>
        align-items: center;<br/>
      </div>
    </div>
  </body>
</html>
Copy
```

## 9.水平居中的4种实现方式？

### 9.1 方法一：text-align的center属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>水平元素居中</title>
  </head>
  <style>
    .wrapper {
      text-align: center;
      height: 1000px;
    }
    .center {
      display: inline-block;
      width: 500px;
      height: 200px;

      background: orange;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">如果需要居中的元素为常规流中 inline / inline-block 元素，为父元素设置 text-align: center;</div>
    </div>
  </body>
</html>
Copy
```

### 9.2 方法二：margin的auto属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>水平元素居中</title>
  </head>
  <style>
    .wrapper {
      width: 100%;
      height: 500px;

      text-align: center; /* 3 */
    }
    .center {
      width: 500px;
      text-align: left; 
      margin: 0 auto; 

      background-color: orange;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">
          父元素上设置 text-align: center;<br />
          居中元素上margin 为 auto。
      </div>
    </div>
  </body>
</html>
Copy
```

### 9.3 方法三：绝对定位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>水平元素居中</title>
  </head>
  <style>
    .wrapper {
      width: 80%;
      height: 500px;
      background: #888;

      position: relative;
    }
    .center {
      width: 500px;
      position: absolute;
      left: 50%;
      margin-left: -250px;

      background-color: orange;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">如果元素positon: absolute; 那么 0）设置父元素postion: relative 1）为元素设置宽度，2）偏移量设置为 50%，3）偏移方向外边距设置为元素宽度一半乘以-1</div>
    </div>
  </body>
</html>
Copy
```

### 9.4 方法四：相对定位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>水平元素居中</title>
  </head>
  <style>
    .wrapper {
      width: 80%;
      height: 500px;
      background: #888;
    }
    .center {
      width: 500px;
      position: relative;
      left: 50%;
      margin-left: -250px;

      background-color: orange;
    }
  </style>
  <body>
    <div class="wrapper">
      <div class="center">如果元素positon: relative。 那么 1）为元素设置宽度，2）偏移量设置为 50%，3）偏移方向外边距设置为元素宽度一半乘以-1</div>
    </div>
  </body>
</html>
Copy
```

## 10 居中问题要点总结

### 10.1 被居中元素宽高固定

#### 10.1.1 绝对定位+margin

top和left 为 50%， margin的left和top为自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9rem;
  margin-top: -5rem;
}
Copy
```

#### 10.1.2 绝对定位+calc

top和lefe为父元素一半剪自身一半

```css
.center {
  position: absolute;
  top: calc(50% - 5em);
  left: calc(50% - 9em);
}
Copy
```

### 10.2 被居中元素宽高不定

##### 10.2.1 transform变换

使用CSS3 的 `transform`将位置在中心点平移自身宽高一半

```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
Copy
```

#### 10.2.2 flex布局+auto

```css
.wrapper {
  display: flex;
}
.center {
  margin: auto;
}
Copy
```

#### 10.2.3 flex布局+align

父元素指定子元素居中。

```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
Copy
```

### 10.3 在浏览器窗口中居中

#### 10.3.1 基于视口的垂直居中

不要求原生有固定的宽高，但是这种居中是在整个页面窗口内居中，不是基于父元素 `css .center{ margin: 50vh auto; transform: translateY(-50%); }`

# CSS效果

## 1.使用div绘制图形（三角形）？

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .triangle-top {
            width: 0;
            height: 0;
            border-width: 0 40px 40px;
            border-style: solid;
            border-color: transparent transparent red;
        }

        .triangle-bottom {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 40px 40px 0 40px;
            border-color: blueviolet transparent transparent transparent;
        }

        .triangle-left {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 40px 0 40px 40px;
            border-color: transparent transparent transparent #89ff56;
        }

        .triangle-right {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 40px 40px 40px 0;
            border-color: transparent yellowgreen transparent;
        }


        /*缺口的三角形*/
        .box{
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height:0;
            border: 6px solid transparent;
        }
        .b1{
            /*底层的盒子三角形相当于全部是黑色的*/
            border-bottom-color:#000 ;
        }
        .b2{
            /*上层的为白色覆盖*/
            border-bottom-color:#fff ;
        }
    </style>
</head>
<body>

<div class="triangle-top"></div>
<div class="triangle-bottom"></div>
<div class="triangle-left"></div>
<div class="triangle-right"></div>

<div class="box b1"></div>
<div class="box b2"></div>
</body>
</html>
Copy
```

## 2.如何产生一个不占空间的边框?( box-sizing属性)?



 Note

知识点：IE和标准盒子模型的异同点 [![标准盒子模型](https://www.52tech.tech/docs/img/css-%E6%A0%87%E5%87%86%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.jpg)](https://www.52tech.tech/docs/img/css-标准盒子模型.jpg)

- 标准盒子模型：元素的width或height=content的width或height；

[![IE盒子模型](https://www.52tech.tech/docs/img/css-IE%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.jpg)](https://www.52tech.tech/docs/img/css-IE盒子模型.jpg)

- IE盒子模型：元素的width或height=content的width或height+padding*2+border*2；

```css
    /*IE盒子模型：width_sum = margin + width*/
    .border-box-use {
        box-sizing : border-box;
        /*通过IE的盒子模型设置出来之后，这个盒子内容区域的宽度实际只有180px
            这里指定的width 实际上是包含了border的宽度的
        */
        width: 200px;
        height: 200px;

        border: 10px solid #89ff56;
    }

    /*标准盒子模型：width_sum = margin + width + padding + width*/
    .border-content-box-use {
        /*设置为标准的盒子模型，默认值*/
        box-sizing: content-box;

        width: 200px;
        height: 200px;

        padding: 1px;
        border: 10px solid #ff255f;
    }

    .parent-box-inhrit {
        /*设置当前的盒子模型是从父级盒子中继承，这里相当于是继承了IE的盒子模型*/
        box-sizing: inherit;
        width: 50px;
        height: 50px;
        background-color: #48adff;

        border: 1px solid #000;

        /*对一个元素自身设置padding，相当于是把盒子撑大了*/
        padding: 5px;
    }
Copy
```

### 2.1 使用box-shadow实现

```css
/*box-shadow 制作边框*/
.box-shadow-border {
    width: 200px;
    height: 200px;
    /*设置外阴影：x y 模糊区域 扩展区域*/
    box-shadow: 0 0 0 10px red , 0 0 0 10px blue;
}
Copy
```

### 2.2 使用outline实现

在元素边框边缘的外围绘制一条包围元素的线，包括outline-color、outline-style、outline-width三个子属性的设置，可缺省，无固定顺序。轮廓不占据页面空间，也不一定是矩形。即不会增加额外的width或者height。

```css
.borner-no-space {
    width: 200px;
    height: 200px;
    outline: 10px solid red;
}
Copy
```

## 3.如何实现IOS图标的圆角？

```css
/*clip-path的使用
            1. 对容器进行裁剪
            2. 常见集合图形
            3. 自定义路径
*/
.container-clippath {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    background-image: url("bg.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    /*开始进行区域裁剪*/
    /*clip-path: circle(50px at 100px 100px);*/
    /*clip-path: inset(100px 50px);*/
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    /*同时，也是支持svg矢量图的裁剪*/
}

.container-clippath:hover {
    clip-path: circle(80px at 100px 100px);
}
Copy
```

## 5.说下背景图的居中显示/重复/改变大小?

```css
background-position： 背景图片相对容器原点的起始位置
background-repeat
background-size : cover/contain(设置大小)
Copy
```

[![background-position](https://www.52tech.tech/docs/img/css-background-position.png)](https://www.52tech.tech/docs/img/css-background-position.png)

```css
/* 一个值: 这个值指定图片的宽度，那么第二个值为auto */
background-size: auto
background-size: 50%
background-size: 3em
background-size: 12px

/* 两个值: 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50% auto
background-size: 3em 25%
background-size: auto 6px
background-size: auto auto
/*多重背景，请用逗号隔开，在CSS语法中凡语法后跟*或者#，都是可以无限重复的，但是必须用逗号隔开。 */
background-size: auto, auto     /* 不要跟background-size: auto auto混淆了 */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain

background-size: inherit
Copy
```

## 6.如何平移/放大一个元素？如何实现0.5px的边框？



 Note

知识点:transform的灵活使用

```html
<style>
.custom-border{
    width:200px;
    margin:10px auto;
    height:100px;
    border:1px solid #333;
    background-color:#eee;
    padding:10px;
}
.scale-border{
    margin:10px auto;
    height:100px;
    position:relative;
    padding:10px;
    width: 200px;
}
.border{
    -webkit-transform:scale(0.5);
    transform:scale(0.5);
    position:absolute;
    border:1px solid #333;
    top:-50%;
    right:-50%;
    bottom:-50%;
    left:-50%;
    background-color:#eee;
}
.content{
    position:relative;
    z-index:2;
}
</style>

<body>
    <div class="custom-border border-color">边框宽度1px</div>
    <div class="scale-border">
        <div class="content">边框宽度0.5px</div>
        <div class="border border-color"></div>
    </div>
</body>
</html>
Copy
```

## 7.如何实现3D效果（旋转的硬币）？

```css
/* 1. 设置一个透视变换，相机距离图像的距离 */
/* perspective : 500px */
/* 2. 设置视觉查看的样式 */
/* transform-style : perspective-3d */
/* 3. 变换图像 */
/* transform : translate rotate */


/*旋转的硬币效果*/
.money {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #48adff;
    border: 2px solid #000;

    /*开启3D效果*/

    perspective: 500px;
    transform-style: preserve-3d;
    /*transform : rotateY(180deg);*/
    animation : rotate 2s linear infinite;
}

@keyframes rotate {
    from {
        transform : rotateY(0deg);
    }
    to {
        transform : rotateY(360deg);
    }
}
Copy
```

# CSS动画

## 1.CSS动画的实现方式？

CSS动画类型：

### 1. transition补间动画

- 位置-平移： left/right/margin/transform
- 方位-旋转: transform
- 大小-缩放： transform
- 透明度： opacity
- 线性变换： transform

### 2. keyframe关键帧动画

### 3. 逐帧动画

## 2.过渡动画和关键帧动画的区别？

1. 过度动画需要有状态的变化
2. 关键帧动画不需要状态的变化
3. 关键帧动画的控制更加精细

## 3.如何实现逐帧动画？

```
/*逐帧动画（关键帧动画的一种特殊情形）*/
/* 1. 适用于无法补间的动画
    2. 猎豹奔跑的过程中实际上是有补间的
    3. 使用steps(1)去掉补间
    4. 资源较大
*/
.container-every-frame {
 /*1的含义：这里需要设置每一个区间之间只有一个动画，那么就不会有补间了*/
    animation-timing-function: steps(1);
}
```

## 4.CSS动画的性能怎么样？

1. 性能不坏
2. 部分情况下优于JS
3. JS可以做到更好
4. 部分高危属性：box-shadow(阴影效果的实现会消耗性能)

## 5.使用CSS3动画实现一个轮播图效果？

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>图片轮换</title>
    <style type="text/css">
        div,img{
            margin: 0;
            padding: 0;
        }
        .div_first{
            width: 1000px;
            height: 300px;
            margin-top: 100px;
            margin-left: 250px;
            overflow: hidden;
        }
        .div_second{
            width: 4000px;
            position: relative;
            animation: myimg 12s linear infinite normal; 
        }
        @keyframes myimg{
            0{
                left: 0;
            }
            5%{
                left: 0;
            }

            30%{
                left: -1000px;
            }
            35%{
                left: -1000px;
            }

            60%{
                left: -2000px;
            }
            65%{
                left: -2000px;
            }

            95%{
                left: -3000px;
            }
            100%{
                left: -3000px;
            }
        }
    </style>
</head>
<body>
    <div class="div_first">
        <div class="div_second">
            <img src="../../img/风景1.jpg" alt="">
            <img src="../../img/风景1.jpg" alt="">
            <img src="../../img/风景1.jpg" alt="">
            <img src="../../img/风景1.jpg" alt="">
        </div>
    </div>
</body>
</html>
```

# CSS预处理器

## 1.常见的CSS预处理器有哪些？

> [!NOTE] css预处理器：用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作，可以让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处
>
> - Sass(Scss)：2007,ruby编写
> - Less: 2009，js编译

### 1.1 使用流程？

1. 基于CSS的另外一种语言
2. 通过工具编译成CSS
3. 添加了很多CSS不具备的特性
4. 同时CSS文件的组织方式

### 1.2 预处理器的作用有哪些？

1. 帮助开发者更好组织CSS代码（变量，mixIn）
2. 提高代码的复用性
3. 代码的可维护性增强

## 2.Less/Sass预处理器的功能？

1. 嵌套： 反映层级和约束
2. 变量和计算： 减少重复代码
3. Extend和mixIn： 代码片段的抽离
4. 循环: 适用于复杂有规律的样式
5. import：可以实现CSS文件的模块化

## 3.CSS预处理器的优缺点？

- 优点： 提高代码的复用率和可维护性
- 缺点： 引入了编译的过程，有一定的学习成本

> 前端工程化：预处理不再是唯一的手段了，可以使用工程化构建工具进行处理

## 4.scss和less的区别？

1. 编译环境不一样
2. 变量符不一样，Less是@，而Scss是$，而且变量的作用域也不一样。
3. 输出设置，Less没有输出设置，Sass提供4种输出选项：
4. Sass支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。
5. 引用外部CSS文件
6. 工具库不同

# Bootstrap

## 1.Bootstrap 的优缺点？

- 优点：CSS代码结构合理，现成的代码可以直接使用（响应式布局）
- 缺点：定制流程较为繁琐，体积大

## 2.如何实现响应式布局？

- 原理：通过media query设置不同分辨率的class
- 使用：为不同分辨率选择不同的class

## 3.如何定制自己的bootstrap样式?

1. 使用CSS同名类覆盖（门槛低，见效快，可能会有bug）
2. 修改源码重新构建（一次性彻底解决） [ bootstrap.scss是入口文件，修改这个文件内容之后，使用node-sass重新编译scss文件 node-sass --output-style expanded bootstrap/custom/scss/bootstrap.scss > bootstrap/custom/dist/css/bootstrap.css ]
3. 引用Scss源文件，修改变量(类似于预处理器的使用方式, 徐亚什么模块引入什么模块，会更加灵活，推荐) [ 1. 创建一个自己的custom.scss文件 `$primary: greed; @import './botstrap-custom/scss/bootstrap.scss'` ]

## 4.如何实现一个响应式布局框架？

> [!NOTE] 面试常考考点，要求模拟实现boostrap的底层实现原理。

上面的[!NOTE]是行匹配模式，默认情况下支持类型NOTE，TIP，WARNING和DANGER。

### 4.1 JS的模拟实现

```
<style>
    .container{
　　　　height: 40px;
       margin: 0 auto;
       background-color: rebeccapurple;
   }
</style>
<div class="container"></div>
<script>
    window.addEventListener("load", function () {
        // 1. 获取容器
        let container = document.querySelector(".container");
        let clientW = 0;
        resize();
        // 2. 监听窗口的大小变化
        window.addEventListener("resize", resize);
        function resize() {
            // 2.1 获取改变后的宽度
            clientW = window.innerWidth;
            // 2.2 判断
            if(clientW >= 1200){ // 超大屏幕
                container.style.width = "1170px";
            }else if(clientW >= 992){ // 大屏幕
                container.style.width = "970px";
            }else if(clientW >= 768){ // 小屏幕
                container.style.width = "750px";
            }else { // 超小屏幕
                container.style.width = "100%";
            }
        }
    });
</script>
```

### 4.2 CSS的模拟实现

```
<style>
        .container{
            height: 40px;
            margin: 0 auto;
            background-color: rebeccapurple;
        }

        /*媒体查询*/
        @media screen  and (max-width: 768px){
            .container{
                width: 100%;
            }
        }
　　　　　
        @media screen  and (min-width: 768px) and (max-width: 992px){
            .container{
                width: 750px;
            }
        }
        @media screen  and (min-width: 992px) and (max-width: 1200px){
            .container{
                width: 970px;
            }
        }
        @media screen  and (min-width: 1200px){
            .container{
                width: 1170px;
            }
        }
</style>
<div class="container"></div>
```

> [!NOTE] 关键点：mediaQuery, 浮动，响应式布局，resize事件

# CSS工程化方案

## 1.如何解决CSS的模块化问题？

1. 使用Less，Sass等CSS预处理器
2. 使用PostCSS插件（postcss-import/precss）
3. 使用webpack处理CSS（css-loader + style-loader）

## 2.PostCSS是什么？

1. PostCSS是一个平台，具体要取决于这个平台上面的插件可以做什么

2. 常用的插件如下

   ```
   //  1. 可以添加属性前缀，适应所有的浏览器
       const autoprefixer = require('autoprefixer');
       // 2. 将所有的import 导入进来的模块全部合并为一个文件
       // const atImport = require('postcss-import');
       // 3.  实现代码的压缩优化
       // const cssnano = require('postcss-cssnano');
       // 4. cssnext提前使用CSS的高级语法
       // const cssnext = require('postcss-cssnext');
       // 5. precss 类似于sass的语法处理
       // const precss = require('precss')
   ```

   1. import实现模块的合并（模块分开，提前合并）
   2. CSS语法检查，兼容性检查
   3. 压缩文件

## 3.CSS modules是什么？如何使用?

1. 解决类名冲突的问题
2. 使用PostCSS或者Webpack等构建工具进行编译
3. 在HTML模板中使用编译过程产生的类名（对象.类名的方式来获取）

## 4.为什么使用JS来引用，加载CSS？

1. JS作为入口，管理资源具有天然优势（HTML，CSS本身是无法管理模块和资源的）
2. 将组件的结果、样式、行为封装到一起，增强组件内聚（减少代码耦合）
3. 可以做更多的处理（webpack，使用CSS Modules 解决了命名的冲突问题）

## 5. PostCSS的实现原理说一下？

> [!NOTE] PostCSS是一个通过JS插件转换样式表的工具，它本身并不是一门新的CSS语言，而是一个平台或者是生态心态，提供插件扩展服务即JS API，开发者可以根据这些接口，定制开发插件， 目前比较流行的插件工具如：Autoprefixer 、Stylelint 、CSSnano。

### 5.1 解析步骤

1. 将CSS解析成抽象语法树(AST树)
2. 将AST树”传递”给任意数量的插件处理
3. 将处理完毕的AST树重新转换成字符串

### 5.2 处理机制

Source string → Tokenizer → Parser → AST → Processor → Stringifier

#### 5.2.1 Tokenizer

> [!NOTE] 将源css字符串进行分词

举个例子： .className { color: #FFF; } 通过Tokenizer后结果如下：

```
[
    ["word", ".className", 1, 1, 1, 10]
    ["space", " "]
    ["{", "{", 1, 12]
    ["space", " "]
    ["word", "color", 1, 14, 1, 18]
    [":", ":", 1, 19]
    ["space", " "]
    ["word", "#FFF" , 1, 21, 1, 23]
    [";", ";", 1, 24]
    ["space", " "]
    ["}", "}", 1, 26]
]
```

以word类型为例，参数如下：

```
const token = [
     // token 的类型，如word、space、comment
    'word',
 
    // 匹配到的词名称
    '.className',
 
    // 代表该词开始位置的row以及column，但像 type为`space`的属性没有该值
    1, 1,
 
    // 代表该词结束位置的row以及column，
    1, 10
]
```

#### 5.2.2 Parser

> [!NOTE] 经过Tokenizer之后，需要Parser将结果初始化为AST

```
this.root = {
    type: 'root',
    source: { input: {css: ".className { color: #FFF; }", hasBOM: false, id: "<input css 1>"},
                   start: { line: 1, column: 1 } ,
                  end: { line: 1, column: 27 }
    },
   raws:{after: "", semicolon: false}
   nodes // 子元素
}
```

#### 5.2.3 Processor

经过AST之后，PostCSS提供了大量JS API给插件用

#### 5.2.4 Stringifier

插件处理后，比如加浏览器前缀，会被重新Stringifier.stringify为一般CSS。

## 6.谈一下你对前端工程化的理解？

参考博客：

- https://www.cnblogs.com/fsyz/p/8274727.html
- https://www.cnblogs.com/onebox/p/9570518.html