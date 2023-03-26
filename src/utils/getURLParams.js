
export default function (url) {

    const splitArr = url.split("?");

    let result = null;
    if (splitArr.length - 1) {
        result = {};
        const parms = splitArr[1]
        parms.split("&").forEach((item) => {

            const temp = item.split("=")
            result[temp[0]] = +temp[1]
        })
    }
    return result;
}