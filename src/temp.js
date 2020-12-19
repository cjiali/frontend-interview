// 题 1
var A = function() {}; 
A.prototype.n = 1; 
var b = new A(); 
A.prototype = { n: 2, m: 3 }; 
var c = new A(); 
console.log(b.n); // 2
console.log(b.m); // 3
console.log(c.n); // 2
console.log(c.m); // 3



// 题 2
function myNew(fn){
    let obj = new Object();
    obj.__proto__ = fn.prototype;
    obj.constructor = fn;
    let args = [].unshift(arguments)
    let result = fn.apply(this, args);
    return typeof result === 'object' ? result : obj;
}

// 题 3
function Foo() {
    getName = function () {
        alert (1);
    };
    return this;
}
var getName;
function getName() {
    alert (5);
}
Foo.getName = function () {
    alert (2);
};
Foo.prototype.getName = function () {
    alert (3);
};
getName = function () {
    alert (4);
};

getName(); // 4

// 题 4
// reduce((acc,cur, idx, arr)=>{},init)
// map((val,idx,arr)=>{})

function myMap(arr,cb){
    if(!Array.isArray(arr)) return arr;
    return arr.reduce((acc, cur, idx)=>{
        acc.push(cb(cur, idx, arr))
        return acc;
    },[])
    
}

let arr = [1, 2, 3];

console.log(myMap(arr, (item)=>'val:'+item))

// 题 5
function eventProxy(parent, child, type, handler){
    parent.addEventListener(type, (event)=>{
        if(event.target === child){
            handler(event);
        }
    });
}

// 题 6
// url
// dns->ip： inter
// 访问 ip 地址
// 后端服务器处理访问请求
// 浏览器接收后端处理结果
// 浏览器解析响应的资源
// 资源渲染

// 题 7
domA.style.width = (domA.offsetWidth + 1) + 'px' 
domB.style.width = (domB.offsetWidth + 1) + 'px' 
domC.style.width = (domC.offsetWidth + 1) + 'px'

// 题 9
// [['a', 'b'], ['n', 'm'], ['0', '1']] => ["an0", "an1", "am0", "am1", "bn0", "bn1", "bm0", "bm1"]
// a b
// n m n m
// 0 1, 0 1, 0 1
function test(arr){
    let res = [];
    for(let i=0; i< arr.length; i++){
        let item = arr[i];
        // arr[0][0]+arr[1][0]+arr[2][0]
        let tempArr = []
        for(let j=0; j<item.length; j++){
           if(i===0){
               tempArr.push(""+item[j])
           }else{
            // console.log(res)
               res.forEach(v=>{
                   tempArr.push(`${v}${item[j]}`)
               })
           }
        }
        res = tempArr;
    }
    return res;
}

function dfs(arr, node, res=[]){
    // 出口
    if(!arr.length) return;
    // 状态改变
    let tempArr = arr.shift();
    // 遍历子节点
    //dfs(arr, i+1, j, res);
    //dfs(arr, i, j+1, res);
    tempArr.forEach(item=>{
        res.push(dfs(arr, item, res))
    })
}

//console.log(test([['a', 'b'], ['n', 'm'], ['0', '1']]))

// 题 11
async function async1(){
    console.log('async1 start')// 3
    await async2() // 4
    console.log('async1 end') // 5
}
async function async2(){
    console.log('async2') // 4
}
console.log('script start')// 1
setTimeout(function(){
    console.log('setTimeOut') // 9
}, 0)
async1()// 2
new Promise(function(resolve){
    console.log('promise1') // 6
    resolve()
}).then(function(){
    console.log('promise2') // 8
})
console.log('script end') // 7

// 'script start'
// 'async1 start'
// 'async2'
// 'async1 end'
// 'promise1'
// 'script end'
// 'promise2'
// 'setTimeOut'
