/**
 * 通过判断对象的原型链中是否包含找到相应类型（构造函数）的 `prototype`
 * @param {Object} instance
 * @param {Function} constructor
 */
export function $instanceof(instance, constructor) {
    let prototype = constructor.prototype;
    let __proto__ = instance.__proto__;
    do {
        if (__proto__ === prototype) return true;
    } while ((__proto__ = __proto__.prototype));

    return false;
}

export default $instanceof;
