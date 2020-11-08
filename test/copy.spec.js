const { shallowCopy, deepCopy } = require("../src/copy");

describe("#copy", () => {
    let target = {
        a: {
            b: {
                c: 'd'
            }
        }
    };
    test("test deepCopy", () => {
        let deepClone = deepCopy(target);
        expect(deepClone).toEqual({
            a: {
                b: {
                    c: 'd'
                }
            }
        })
        deepClone.a.b.c = 1;
        expect(target).toEqual({
            a: {
                b: {
                    c: 'd'
                }
            }
        });
    });
    test("test shallowCopy", () => {
        let shallowClone = shallowCopy(target);
        expect(shallowClone).toEqual({
            a: {
                b: {
                    c: 'd'
                }
            }
        })
        shallowClone.a.b.c = 1;
        expect(target).toEqual({
            a: {
                b: {
                    c: 1
                }
            }
        })
    });
});
