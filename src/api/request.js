import axios from "axios";
import { dialog } from "../utils";



const request = axios.create();



// 响应拦截。
request.interceptors.response.use(function (response) {
    const data = response.data;

    // 请求出现错误了
    if (data && data.code !== 0) {
        dialog('error', data.msg, 2000)
        return null;
    }

    return data.data;
})


export default request;