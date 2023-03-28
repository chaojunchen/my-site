import defaultSrc from "../assets/lazyDefault.gif"
import { eventBus, random, debounce } from "@/utils/index.js"

let lazyImgs = [];




/**
 * 
 * @param {object} imgObj   
 * @param {boolean} onScroll 是否在滚动中执行
 */


// 设置单个img。
function setImg (imgObj) {


    const { el: targetImg, src } = imgObj;
    targetImg.src = defaultSrc;
    // 是否在可视窗口中。
    const visible = isVisible(targetImg);
    if (visible) {
        const tempImg = document.createElement('img');
        tempImg.src = src;

        tempImg.onload = function () {
            // 防止加载过快，看不到效果。
            imgObj.isFinish = true;
            targetImg.src = src;
            // 马上移除加载完毕的。
            lazyImgs = lazyImgs.filter(item => !item.isFinish)
        }
    }
}

// 看传入的dom是否出现在了视口中
function isVisible (el) {

    const rect = el.getBoundingClientRect()
    const top = rect.top;
    // 可见视口高度。
    const screenHeight = document.documentElement.clientHeight;


    // 在视口上边。
    if (top + rect.height <= 0) {
        return false;
    }

    // 视口中。
    if (screenHeight - top >= 0) {
        return true;
    }

    //下面
    return false
}

// 设置所有img
function setAllImg () {
    lazyImgs.forEach(item => setImg(item))
}

const debounceFn = debounce((targetDom) => {
    setAllImg();
}, 1000)





//监听事件 
eventBus.$on("mainScroll", debounceFn)

export default {
    inserted (el, binding) {
        const tempObj = {
            el: el,
            src: binding.value,
            isFinish: false,//是否已经加载过了
        }
        lazyImgs.push(tempObj);
        setImg(tempObj);
    },

    unbind (el) {
        // 留下新的img
        lazyImgs = []
    }
}
