export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;

        return this;
    }

    off(event, callback) {
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter((fn) => fn !== callback);

        return this;
    }

    emit(event, ...args) {
        let callbacks = this.events[event];
        callbacks.forEach((fn) => {
            fn(...args);
        });

        return this;
    }

    once(event, callback) {
        let wrapFn = (...args) => {
            callback(...args);

            this.off(event, wrapFn);
        };
        this.on(event, wrapFn);

        return this;
    }
}

export default EventEmitter;
