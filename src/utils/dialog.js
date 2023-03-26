
/**
 * 
 * @param {String } type  弹出的类型，成功|警告
 * @param {String} text 提示内容
 * @param {Object} targetDom 在哪个dom中弹出。
 * @param {Number} duration 显示多久
 */
import getRootDom from "./getRootDom";
import Icon from "../components/Icon.vue"


import styles from "../style/dialog.module.less"


let hasDialog = false;


function dialog (options = {}) {
    let { type = 'success', text = '这是一个弹出框', targetDom, duration = 2000, callback } = options
    if (hasDialog) {
        hasDialog.remove();
    }

    const dialog = document.createElement('div');
    const IconDom = getRootDom(Icon, { type })
    const textDom = document.createElement('div')

    // 添加类名
    IconDom.classList.add(styles.icon)


    textDom.innerText = text;
    textDom.className = styles.text;


    dialog.appendChild(IconDom);
    dialog.appendChild(textDom);
    dialog.className = `${styles.dialog} ${styles['dialog-' + type]}`


    // 是否传入了目标元素，并且改变目标元素的position。
    if (targetDom) {
        const posi = getComputedStyle(targetDom)['position']
        if (posi === 'static') {
            targetDom.style.position = 'relative';
        }
    } else {
        // 没有，那么将插入到body元素中。
        // 如果body也没有定位，那么该弹出框会自动相对于视口定位。
        targetDom = document.body;
    }

    targetDom.appendChild(dialog);


    // dialog弹出。
    dialog.clientWidth;
    dialog.style.opacity = 1;
    dialog.style.transform = `translate(-50%, -50%)`

    hasDialog = dialog;

    // 一处dialog元素。
    function removeDailog () {
        dialog.remove();
        dialog.removeEventListener('transitionend', removeDailog);
        hasDialog = false;
    }

    // 消失
    setTimeout(() => {
        dialog.style.opacity = 0;
        dialog.style.transform = `translate(-50%, -50%) translatey(-100px)`
        dialog.addEventListener('transitionend', removeDailog, { once: true })
        callback && callback();
    }, duration);

}


export default dialog;