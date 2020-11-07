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
