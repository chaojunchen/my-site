// 把主区域滚动事件跑到事件总线

export default function (refName) {
    return {
        methods: {
            toTop () {
                this.$refs[refName].scrollTop = 0;
            },
            mainScroll () {
                this.$bus.$emit("mainScroll", this.$refs[refName])
            }
        },
        mounted () {
            this.$refs[refName].addEventListener('scroll', this.mainScroll)
            this.$bus.$on("toTop", this.toTop);
        },
        beforeDestroy () {
            this.$bus.$emit("mainScroll", null)
            this.$refs[refName].removeEventListener("scroll", this.mainScroll);
            this.$bus.$off("toTop", this.toTop)
        }
    }
}