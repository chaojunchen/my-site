module.exports = {
    devServer: {
        proxy: {
            "/sug": {
                target: 'https://suggest.taobao.com'
            }
        }
    }
}
