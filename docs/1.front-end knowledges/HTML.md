# HTML基础强化

## 1.如何理解HTML？

1. HTML类似于一份word“文档”
2. 描述文档的“结构”
3. 有区块和大纲

## 2.对WEB标准的理解？

> Web标准是由一系列标准组合而成。一个网页主要由三部分组成：结构层、表现层和行为层。

对应的标准也分三方面：

- 结构化标准语言主要包括XHTML和HTML以及XML，
- 表现层标准语言主要包括CSS，
- 行为标准主要包括对象模型，DOM、ECMAScript等

**2.1 结构层标准**

> 结构化标准语言，就是W3C规定的主要包括HTML和XHTML以及XML，在页面body里面我们写入的标签都是为了页面的结构。

1. 标签的书写，需要开始和结束。单便签除外；
2. 块级元素不能放在p标签里面。li内可以包含div标签。
3. 块元素里面可以放在块和内联，特殊的 p和 h1—h6里面不要放块元素，li和div可以放很多。因为这两个标签，本身就有容器的属性
4. 内联里面要放内联，不要放块。（嵌套关系）
5. 结构与表现分离
6. 命名一定要规范

**2.2 表现层标准**

> 表现标准语言主要包括CSS（Cascading Style Sheets）层叠式样式表，通过CSS样式表，W3C创建CSS标准的目的是以CSS取代HTML表格式布局、帧和其他表现的语言，通过CSS样式可以是页面的结构标签更具美感。

1. 尽可能使用外部引入的方式，达到分离的目的
2. CSS选择器，优先级
3. 代码简洁

**2.3 行为层标准**

> 行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，标准主要包括对象模型（如W3C DOM）、ECMAScript并要求这三部分分离。

- DOM是Document Object Model文档对象模型的缩写。DOM解决了Netscaped的Javascript和Microsoft的Jscript之间的冲突，给予web设计师和开发者一个标准的方法，让他们来访问他们站点中的数据、脚本和表现层对像。
- ECMAScript是ECMA(EuropeanComputer Manufacturers Association)制定的标准脚本语言（JAVAScript）

## 3.对W3C的认识？

> W3C对web标准提出了规范化的要求，也就是在实际编程中的一些代码规范。

主要包含如下几点：

**3.1 对于结构的要求**

- 1）标签字母要小写
- 2）标签要闭合
- 3）标签不允许随意嵌套

**3.2 对于css和js的要求**

- 1）尽量使用外链css样式表和js脚本。使结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。
- 2）样式尽量少用行间样式表，使结构与表现分离，标签的id和class等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版。
- 3）不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。

## 4.什么是前端语义化？

语义化就是让机器可以读懂内容，web页面的解析是由搜索引擎来进行搜索，机器来解析。

**4.1 标签是有语义的**

h1~h6、thead、ul、ol等标签，初期的语义化标签：程序员利用HTML标签的id和class属性，进一步对HTML标签进行描述，如对页脚HTML标签添加如id="footer"或者class="footer"的属性（值）（使用有语义的对于需要声明的变量和class，id）

**4.2 HTML5的语义标签**

w3C采用了header/footer; section（章节、页眉、页脚）/article（内容区域）; nav导航；aside 不重要的内容；em(emphasize)/strong增强; i(icon)制作图标

## 5.谈一下页面布局架构？

- CSS布局：table布局，float布局，flex布局（瀑布流布局），inline-block布局
- 三大框架，页面架构

## 6.HTML的版本问题？

1. HTML4/4.0.1(SGML)(标签允许不结束)
2. XHTML(XML)（标签必须结束，属性必须带引号，属性必须有值，标签属性必须有值）
3. HTML5（类似于HTML4的写法）

**关键点：**HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的置标语言

## 7.HTML5新增的内容有哪些？

1. 新的区块标签：section,article,nav,aside
2. 表单增强：日期、时间、搜索（修改type的类型实现）；表单验证；placeholder
3. 语义增强：header/footer; section/article; nav导航；aside 不重要的内容；em(emphasize)/strong增强; i(icon)制作图标

## 8.HTML的元素分类？

- 块级元素block（方块形状，占据一整行）：div ul ol li dl dt dd h1 h2 h3 h4…p
- 行内元素inline（一行中的某个位置）：a b span img input select strong（强调的语气）
- inline-block（行内，有宽高属性）：selection

**行内元素：**a、b、span、img、input、strong、select、label、em、button、textarea 

**块级元素：**div、ul、li、dl、dt、dd、p、h1-h6、blockquote 

**空元素：** br、meta、hr、link、input、img

## 9.HTML嵌套关系？

1. 块级元素可以包含行内元素
2. 块级元素不一定能包含块级元素(p标签不能包含div标签)
3. 行内元素“一般”不能包含块级元素（a包含div是可以的）

## 10.HTML的默认样式？

1. 默认样式的意义
2. 默认样式代理的问题
3. CSS Reset 的作用

```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
Copy
```

## 11.使用ajax方式来提交数据可以不使用form标签吗？

1. form标签可以使用submit, reset
2. 使用form可以直接一次性获取所有的form窗体的数据属性
3. form可以较好地实现表单验证等功能

**11.1 Form表单提交**

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>login test</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="login test">   
</head>
<body>
<div id="form-div">
    <form id="form1" action="/users/login" method="post">
        <p>用户名：<input name="userName" type="text" id="txtUserName" tabindex="1" size="15" value=""/></p>
        <p>密　码：<input name="password" type="password" id="TextBox2" tabindex="2" size="16" value=""/></p>
        <p><input type="submit" value="登录">&nbsp<input type="reset" value="重置"></p>
    </form>
</div>
</body>
</html>
Copy
```

**11.2 ajax提交**

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <title>login test</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
        <meta http-equiv="description" content="ajax方式">
        <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
        <script type="text/javascript">
            function login() {
                $.ajax({
                    //几个参数需要注意一下
                    type: "POST",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: "/users/login" ,//url
                    data: $('#form1').serialize(),
                    success: function (result) {
                        console.log(result);//打印服务端返回的数据(调试用)
                        if (result.resultCode == 200) {
                            alert("SUCCESS");
                        };
                    },
                    error: function() {
                        alert("异常！");
                    }
                });
            }
        </script>
    </head>
    <body>
        <div id="form-div">
            <form id="form1" onsubmit="return false" action="##" method="post">
                <p>用户名：<input name="userName" type="text" id="txtUserName" tabindex="1" size="15" value="" /></p>
                <p>密　码：<input name="password" type="password" id="TextBox2" tabindex="2" size="16" value="" /></p>
                <p><input type="button" value="登录" onclick="login()">&nbsp;<input type="reset" value="重置"></p>
            </form>
        </div>
    </body>
</html>
```

**扩展思考：**Form表单提交数据给一个非同源的网址，如在A网址(http://www.A.com)上直接向B网站(http://www.B.com)发送数据请求， 为什么不会触发浏览器的同源策略限制呢？

