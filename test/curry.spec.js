import curry from "../src/curry"

describe('#curry', ()=>{
    function sum(x, y, z) {
        return x+y+z;
    }
    
    test('test curry', ()=>{
        expect(curry(sum)(1, 2, 3)).toBe(6);
        expect(curry(sum, 1)(2, 3)).toBe(6);
        expect(curry(sum, 1, 2)(3)).toBe(6);
        expect(curry(sum, 1, 2, 3)).toBe(6);
    });
})
