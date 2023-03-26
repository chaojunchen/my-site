export default function (fn, delay = 100) {
    let timer = null;
    return (...arg) => {
        clearInterval(timer);
        timer = setTimeout(() => {
            fn(...arg);
        }, delay);
    }

}