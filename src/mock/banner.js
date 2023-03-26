import Mock from "mockjs"

import mid1 from "../assets/mid1.jpg"
import big1 from "../assets/big1.jpg"


import mid2 from "../assets/mid2.jpg"
import big2 from "../assets/big2.jpg"

import mid3 from "../assets/mid3.jpg"
import big3 from "../assets/big3.jpg"



Mock.mock("/api/banner", "get", function () {
    return {
        code: 0,
        msg: '',
        data: [
            {
                id: "3",
                midImg: mid1,
                bigImg: big1,
                title: "听我怒吼",
                description: "兰尼斯特有债必偿",
                color: "246,213,17"
            },
            {
                id: "1",
                midImg: mid2,
                bigImg: big2,
                title: "凛冬将至",
                description: "人唯有恐惧的时候方能勇敢",
                color: "168,171,174"
            },
            {
                id: "2",
                midImg: mid3,
                bigImg: big3,
                title: "血火同源",
                description: "如果我回头，一切都完了",
                color: '187,43,1'
            },

        ]
    }
})


