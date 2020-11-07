import "../src/bind";

describe("#bind", () => {
    let obj = {
        msg: "hello",
    };

    function hi(msg) {
        this.msg = msg;
    }

    function hello(name) {
        return this.msg + " " + name;
    }

    test("test $bind", () => {
        expect(new (hi.$bind(obj))("hi")).toEqual({ msg: "hi" });
        expect(hello.$bind(obj)("world")).toBe("hello world");
    });
});
