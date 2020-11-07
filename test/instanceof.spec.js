import $instanceof from '../src/instanceof'

describe('#instanceof', ()=>{
    function Person(name) {
        this.name = name;
    }
    
    test('test instanceof', ()=>{
        let person = new Person("somebody");
        expect($instanceof({}, Person)).toBe(false);
        expect($instanceof(person, Person)).toBe(true);
    });
})
