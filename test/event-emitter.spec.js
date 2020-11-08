import EventEmitter from "../src/event-emitter";

describe("#event-emitter", () => {
    let fn0 = jest.fn(),
        fn1 = jest.fn(),
        fn2 = jest.fn(),
        fn3 = jest.fn();
    test("test resolved", () => {
        let job = new EventEmitter();

        job.on("done", fn0);
        expect(job.events).toEqual({
            done: [fn0],
        });

        job.on("done", fn1);
        expect(job.events).toEqual({
            done: [fn0, fn1],
        });

        job.on("done", fn2);
        expect(job.events).toEqual({
            done: [fn0, fn1, fn2],
        });

        job.off("done", fn2);
        expect(job.events).toEqual({
            done: [fn0, fn1],
        });

        job.once("start", fn3);
        expect(job.events['start']).toBeTruthy();

        let time0 = new Date();
        job.emit('start', time0);
        let time1 = new Date();
        job.emit('start', time1);
        expect(fn3.mock.calls.length).toBe(1)
        expect(fn3.mock.calls[0][0]).toBe(time0)

        let time2 = new Date();
        job.emit('done', time2);
        expect(fn0.mock.calls.length).toBe(1)
        expect(fn1.mock.calls.length).toBe(1)
        expect(fn2.mock.calls.length).toBe(0)
        expect(fn0.mock.calls[0][0]).toBe(time2)
        expect(fn1.mock.calls[0][0]).toBe(time2)

        let time3 = new Date();
        job.emit('done', time3);
        expect(fn0.mock.calls.length).toBe(2)
        expect(fn1.mock.calls.length).toBe(2)
        expect(fn2.mock.calls.length).toBe(0)
        expect(fn0.mock.calls[1][0]).toBe(time3)
        expect(fn1.mock.calls[1][0]).toBe(time3)
    });
});
