import inherit from "../src/inherit";

describe("#inherit", () => {
    function Animal(name) {
        this.name = name || "Animal";
        // 实例方法
        this.sleep = function () {
            return this.name + " is sleeping.";
        };
    }
    // 原型方法
    Animal.prototype.eat = function (food) {
        return `${this.name} is eating ${food}.`;
    };

    /**
     * 1、原型链继承：将父类的实例作为子类的原型
     *
     * 来自原型对象的所有属性被所有实例共享
     * 创建子类实例时，无法向父类构造函数传参
     */
    test("test inherit by prototype", () => {
        function Cat() {}
        Cat.prototype = new Animal();
        Cat.prototype.name = "Tom";

        //　Test Code
        let cat = new Cat();
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Cat).toBe(true); //true
        expect(cat instanceof Animal).toBe(true); //true
    });
    /**
     * 2、构造继承：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
     *
     * 只能继承父类的实例属性和方法，不能继承原型属性/方法
     * 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
     */
    test("test inherit by constructor", () => {
        function Cat(name) {
            Animal.call(this);
            this.name = name || "Cat";
        }

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat).toBe(undefined); // toBe('Tom is eating fish.');
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Cat).toBe(true); // true
        expect(cat instanceof Animal).toBe(false); // false
    });

    /**
     * 3、实例继承：为父类实例添加新特性，作为子类实例返回
     *
     * 实例是父类的实例，不是子类的实例
     * 不支持多继承
     */
    test("test inherit by instance", () => {
        function Cat(name) {
            let instance = new Animal();
            instance.name = name || "Cat";
            return instance;
        }

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Cat).toBe(false); // false
        expect(cat instanceof Animal).toBe(true); // true
    });

    /**
     * 4、拷贝继承
     *
     * 效率较低，内存占用高（因为要拷贝父类的属性）
     */
    test("test inherit by copy", () => {
        function Cat(name) {
            let animal = new Animal();
            for (let p in animal) {
                Cat.prototype[p] = animal[p];
            }
            this.name = name || "Cat";
        }

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Cat).toBe(true); // true
        expect(cat instanceof Animal).toBe(false); // false
    });

    /**
     * 5、组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
     *
     * 调用了两次父类构造函数，生成了两份实例
     */
    test("test inherit by combination", () => {
        function Cat(name) {
            Animal.call(this);
            this.name = name || "Cat";
        }
        Cat.prototype = new Animal();
        Cat.prototype.constructor = Cat;

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Animal).toBe(true); // true
        expect(cat instanceof Cat).toBe(true); // true
    });

    /**
     * 6、寄生组合继承：通过寄生方式，砍掉父类的实例属性，这样在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
     */
    test("test inherit by parasitic combination", () => {
        function inherit(C, P) {
            // 创建一个没有实例方法的类
            let F = function () {};
            F.prototype = P.prototype;
            //将实例作为子类的原型
            C.prototype = new F();
            C.prototype.constructor = C;
            return C;
        }
        function Cat(name) {
            Animal.call(this);
            this.name = name || "Cat";
        }
        inherit(Cat, Animal);

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Animal).toBe(true); // true
        expect(cat instanceof Cat).toBe(true); //true
    });

    test("test inherit", () => {
        /* function inherit(C, P){
            // 创建一个没有实例方法的类
            let F = function () {};
            F.prototype = P.prototype;
            // 将实例作为子类的原型
            C.prototype = new F(); // 父类实例
            C.prototype.constructor = C; // constructor 归位
            C.prototype.uber = P.prototype; // 保留父类原型
            return C;
        } */
        function Cat(name) {
            Animal.call(this);
            this.name = name || "Cat";
        }
        inherit(Cat, Animal);

        // Test Code
        let cat = new Cat("Tom");
        expect(cat.name).toBe("Tom");
        expect(cat.eat("fish")).toBe("Tom is eating fish.");
        expect(cat.sleep()).toBe("Tom is sleeping.");
        expect(cat instanceof Animal).toBe(true); // true
        expect(cat instanceof Cat).toBe(true); //true
    });
});
