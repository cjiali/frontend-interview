import "../src/call"

describe('#call', ()=>{
    let obj = {
        foo: "foo"
    }
    function foo(str) {
        this.foo = str;
        return true;
    }
    
    test('test $call', ()=>{
        expect(obj.foo).toBe('foo');
        expect(foo.$call(obj, 'hello')).toBe(true)
        expect(obj.foo).toBe('hello');
    });
})
