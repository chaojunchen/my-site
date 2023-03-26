
import SRC from "@/assets/loading.svg"


function crateImg () {
    const img = document.createElement("img")
    img.src = SRC;
    img.style.position = 'absolute';
    img.style.left = '50%'
    img.style.top = '50%'
    img.style.transform = 'translate(-50%,-50%)'
    return img;
}

export default {
    inserted (el, binding) {

        // 旧的img元素，  有就移除，在添加新的。
        const oldImg = el.getElementsByClassName("directive-loading-img")[0]
        oldImg && oldImg.remove();

        const img = crateImg();
        const posi = getComputedStyle(el)['position']
        if (posi === 'static') {
            el.style.position = 'relative';
        }
        img.classList.add("directive-loading-img")
        el.appendChild(img);
        return;


    },
    update (el, binding) {
        const img = el.getElementsByClassName("directive-loading-img")[0]
        // 还处于加载中时。
        if (binding.value) {
            img.style.display = 'block';
            return;
        }
        // 不是在加载中
        img.style.display = 'none';
    },
}