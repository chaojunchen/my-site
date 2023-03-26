import Mock, { mock } from "mockjs"
Mock.mock('/api/user', 'get', function () {


    return {
        id: '88888888888',
        qq: "2779468840",
        weixin: "18485647168",
        mail: "chaojunchen793@gmail",
        github:"2779468840@qq.com"
    }
})