export default function delegateEvent(element, type, listeners/* a map format: {[selector]:[listener, args]} */) {
    // 判断是否支持 addEventListener
    if (element.addEventListener) {
        // 给父元素添加事件
        element.addEventListener(type, function(event) {
        // 获取当前触发的元素
            const target = event.target;
            Object.keys(listeners).forEach(selector => {
                const [listener, args] = listeners[selector];
                // 判断当前元素是否是我需要的
                if (target.matches(selector)/* target.nodeName.toLowerCase() === tag */) {
                    listener(event,args);
                }
            });
        });
    } else {
        // 兼容IE
        element.attachEvent("on" + type, function() {
            const target = window.event.srcElement;
            Object.keys(listeners).forEach(selector => {
                const [listener, args] = listeners[selector];
                // 判断当前元素是否是我需要的
                if (target.matches(selector)/* target.nodeName.toLowerCase() === tag */) {
                    listener( window.event, args);
                }
            });
        });
    }
}
