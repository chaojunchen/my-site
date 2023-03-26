

export default function (duration, fn) {
    let preTime = new Date().getTime();

    return (e) => {
        let nowTime = new Date().getTime();

        if (nowTime - preTime >= duration) {
            fn(e);
            preTime = nowTime;
        }



    }

}