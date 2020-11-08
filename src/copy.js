/**
 * 浅拷贝
 * @param {*} target
 */
export function shallowCopy(target) {
    // 只拷贝对象
    if (!target || typeof target !== "object") return;
    // 根据 target 的类型判断是新建一个数组还是对象
    let clone = Array.isArray(target) ? [] : {};
    // 遍历 target，并且判断是 target 的属性才拷贝
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = target[key];
        }
    }

    return clone;
}

/**
 * 深拷贝
 * @param {*} target
 */
export function deepCopy(target) {
    if (!target || typeof target !== "object") return;

    let clone = Array.isArray(target) ? [] : {};

    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = typeof target[key] === "object" ? deepCopy(target[key]) : target[key];
        }
    }

    return clone;
}

export default { shallowCopy, deepCopy };
