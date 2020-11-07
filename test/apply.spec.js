import "../src/apply"

describe('#call', ()=>{
    let obj = {
        foo: "foo"
    }
    function foo(str) {
        this.foo = str;
        return true;
    }
    
    test('test apply', ()=>{
        expect(obj.foo).toBe('foo');
        expect(foo.$apply(obj, ['hello'])).toBe(true)
        expect(obj.foo).toBe('hello');
    });
})
