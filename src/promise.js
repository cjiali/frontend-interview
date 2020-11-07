/**********************************************************************************************************************
简易版本的 Promise  封装步骤(this <== Promise.prototype)：
第一步： 列出三大块  `resolve/reject`, `executor(resolve,reject)`, `this.then/this.catch`
第二步： `resolve/reject` 中切换状态并异步执行所有的回调方法，`executor(resolve,reject)` 立即同步执行，`this.then/this.catch` 中注册所有的回调方法
第三步： `resolve/reject` 函数体内使用 `setTimeout` 进行包裹，以防止尚未进行 then 注册就直接执行 `resolve/reject` 的回调方法
第四步： `this.then/this.catch` 需返回 this 以实现链式调用
第五步： 状态管理： `pending` 状态注册回调方法, `fulfilled` 执行成功时的回调方法, `rejected` 执行错误时的回调方法
**********************************************************************************************************************/
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

let $status = PENDING, // 给 Promise 对象指定 status 属性，初始值为 'pending'
    $value = undefined, // 给 Promise 对象指定一个存储结果的 data
    $callbacks = []; // 每个元素的结构：{onResolved(){}，onRejected(){}}

/**
 * $Promise 构造函数
 * executor: 执行器函数
 */
export function $Promise(executor) {
    // const self = this;
    // self.status = 'pending'; // 给 Promise 对象指定 status 属性，初始值为 'pending'
    // self.data = undefined; // 给 Promise 对象指定一个存储结果的 data
    // self.callbacks = []; // 每个元素的结构：{onResolved(){}，onRejected(){}}

    function resolve(result) {
        if (PENDING !== $status) {
            // 如果当前状态不是 'pending'，则不执行
            return;
        }
        // 将状态改为 'resolved'
        $status = RESOLVED;
        // 保存 value 的值
        $value = result;
        // 如果有待执行的 callback 函数，立即异步执行回调函数 onResolved
        if ($callbacks.length > 0) {
            setTimeout(() => {
                $callbacks.forEach(({ onResolved }) => {
                    onResolved(result);
                });
            });
        }
    }

    function reject(error) {
        if (PENDING !== $status) {
            return;
        }
        // 将状态改为 'rejected'
        $status = REJECTED;
        // 保存 value 的值
        $value = error;
        // 如果有待执行的 callback 函数，立即异步执行回调函数 onRejected
        if ($callbacks.length > 0) {
            setTimeout(() => {
                $callbacks.forEach(({ onRejected }) => {
                    onRejected(error);
                });
            });
        }
    }

    try {
        // 立即同步执行 executor
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**
 * Promise 原型对象的 then 方法
 * 指定一个成功/失败的回调函数
 * 返回一个新的 Promise 对象
 */
$Promise.prototype.then = function (onResolved, onRejected) {
    /**
     * 值穿透：
     * 解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
     *      也即，当传入 then 的不是函数的时候，这个then是无效的。
     * 原理：当 then中 传入的不算函数，则这个 then 返回 promise 的 data 将会保存上一个的 promise.data。
     */
    onResolved = typeof onResolved === 'function' ? onResolved : (res) => res;
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : (err) => {
                  throw err;
              };

    return new $Promise((resolve, reject) => {
        function handle(callback) {
            try {
                const result = callback($value);
                if (result instanceof $Promise) {
                    result.then(
                        (res) => {
                            resolve(res);
                        },
                        (err) => {
                            reject(err);
                        },
                    );
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        if (PENDING === $status) {
            $callbacks.push({
                onResolved() {
                    handle(onResolved);
                },
                onRejected() {
                    handle(onRejected);
                },
            });
        } else if (RESOLVED === $status) {
            setTimeout(() => {
                handle(onResolved);
            });
        } else {
            setTimeout(() => {
                handle(onRejected);
            });
        }
    });
};

/**
 * Promise 原型对象的 catch 方法
 * 指定一个失败的回调函数
 * 返回一个新的 Promise 对象
 */
$Promise.prototype.catch = function (onRejected) {
    /**
     * catch 方法的作用跟 then 方法的第二个回调函数一样
     */
    return this.then(undefined, onRejected);
};

/**
 * Promise 函数对象的 resolve 方法
 * 返回一个指定结果的 Promise 对象
 */
$Promise.resolve = function (result) {
    /**
     * Promise.resolve方法可以传三种值
     *      1. 不是 promise
     *      2. 成功状态的 promise
     *      3. 失败状态的 promise
     * 例如：
     *      Promise.resolve(1)
     *      Promise.resolve(Promise.resolve(1))
     *      Promise.resolve(Promise.reject(1))
     */
    return new $Promise((resolve, reject) => {
        if (result instanceof $Promise) {
            result.then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                },
            );
        }
    });
};

/**
 * Promise 函数对象的 reject 方法
 * 返回一个指定 error 的失败状态的 Promise 对象
 */
$Promise.reject = function (error) {
    return new $Promise((resolve, reject) => {
        reject(error);
    });
};

/**
 * Promise 函数对象的 all 方法
 * 返回一个 Promise 对象，只有当所有 Promise 都成功时返回的 Promise 状态才成功
 */
$Promise.all = function (promises) {
    const values = new Array(promises.length);
    let count = 0; // 计状态为 'resolved' 的promise的数量
    return new $Promise((resolve, reject) => {
        // 遍历promises，获取每个promise的结果
        promises.forEach((p, i) => {
            $Promise.resolve(p) // 把不是 promise 的值包装成 promise
                .then(
                    (res) => {
                        // 遍历所有的 promise 的状态都为 'resolved',则返回的 promise 状态为 'resolved'
                        // p 状态为 resolved，将值保存起来
                        values[i] = value;
                        count++;
                        // 如果全部 p 都为 'resolved' 状态，return 的 promise 状态为 resolved
                        if (count === promises.length) {
                            resolve(values);
                        }
                    },
                    (err) => {
                        // 只要有一个失败，return 的 promise 状态就为 'reject'
                        reject(err);
                    },
                );
        });
    });
};

/**
 * Promise 函数对象的 race 方法
 * 返回一个 Promise 对象，状态由第一个完成的 Promise 决定
 */
$Promise.race = function (promises) {
    return new $Promise((resolve, reject) => {
        // 遍历promises，获取每个promise的结果
        promises.forEach((p, index) => {
            Promise.resolve(p) // 把不是 promise 的值包装成 promise
                .then(
                    (res) => {
                        // 只要有一个成功，返回的 promise 的状态就为 'resolved'
                        resolve(res);
                    },
                    (err) => {
                        // 只要有一个失败，返回的 promise 状态就为 'reject'
                        reject(err);
                    },
                );
        });
    });
};

/* 向外暴露 $Promise */
export default $Promise;
