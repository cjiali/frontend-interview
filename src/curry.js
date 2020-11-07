export function curry(fn, ...args) {
    return args.length >= fn.length
        ? fn(...args)
        : function () {
              return curry(fn, ...args, ...arguments);
          };
}

export default curry;
