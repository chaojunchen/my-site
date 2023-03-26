module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: "https://localhost:8080/"
            }
        }
    }
}

// 请求网址: https://suggest.taobao.com/sug?k=1&area=c2c&q=%E5%8D%97%E6%9E%81%E4%BA%BA&code=utf-8&ts=1679020923564&callback=__jp12
