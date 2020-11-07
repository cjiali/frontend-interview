import mock from '../src/new'

describe('#new', ()=>{
    function Person(name) {
        this.name = name;
    }
    
    test('test new', ()=>{
        let person = mock(Person, "somebody");
        expect(person instanceof Person).toBe(true);
    });
})
