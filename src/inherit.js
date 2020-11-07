
export function inherit(C, P){
    // 创建一个没有实例方法的类
    let F = function () {};
    F.prototype = P.prototype;
    // 将实例作为子类的原型
    C.prototype = new F(); // 父类实例
    C.prototype.constructor = C; // constructor 归位
    C.prototype.uber = P.prototype; // 保留父类原型
    return C;
}

export default inherit;
