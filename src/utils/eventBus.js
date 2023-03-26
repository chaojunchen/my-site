const listeners = {}


export default {
    // 注册
    $on: function (eventName, execute) {
        // 以事件名为属性，添加set记录
        if (!listeners[eventName]) {
            listeners[eventName] = new Set();
        }
        listeners[eventName].add(execute);
    },
    // 删除
    $off: function (eventName, execute) {
        // 该事件名有没有注册，    有注册但是没有监听者。
        if (!listeners[eventName] || !listeners[eventName].size) return;
        listeners[eventName].delete(execute);
    },
    // 抛出事件了，执行注册的函数。
    $emit: function (eventName, param) {
        if (!listeners[eventName] || !listeners[eventName].size) return;
        listeners[eventName].forEach(item => item(param))
    }
}