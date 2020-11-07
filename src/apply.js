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
