/**
 * new 执行过程：
 * - 新生成一个对象
 * - 链接到原型: `obj.__proto__ = constructor.prototype`
 * - 绑定this: `constructor.apply(obj)`
 * - 返回新对象(如果构造函数有自己的返回值时，则返回该值)
 */
export function $new() {
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

export default $new;
