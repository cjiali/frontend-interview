// const { $Promise } = require("../src/promise");
import $Promise from "../src/promise";

describe("#promise", () => {
    test("executor resolved", (done) => {
        let promise = new $Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(true);
                //reject(true)
            }, 100);
        });

        promise.then(
            (value) => {
                try {
                    expect(value).toBe(true);
                    done();
                } catch (e) {
                    done(e);
                }
            },
            (reason) => {
                // console.log('onRejected:', reason);
            },
        );
    });
});
