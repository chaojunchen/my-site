import Mock from "mockjs"

import './banner.js'
import "./article.js"
import { random } from "../utils/index.js"

Mock.setup({
    timeout: random(400, 4300)
})