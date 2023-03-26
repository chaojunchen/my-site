import Home from "@/views/Home/index.vue"
import Article from "@/views/Article/index.vue"
import About from "@/views/About/index.vue"
import Message from "@/views/Message/index.vue"
import Project from "@/views/Project/index.vue"
import ArticleDetail from "@/views/Article/Detail.vue"
export default [
    {
        path: "/",
        component: Home,
        name: 'Home'
    },
    {
        path: "/article",
        component: Article,
        name: "Article",
    },
    {
        path: "/about",
        component: About,
        name: "About"
    },
    {
        path: "/message",
        component: Message,
        name: "Message",
    },
    {
        path: "/article/cate/:categoryId",
        component: Article,
        name: "ArticleCategory"
    },
    {
        path: "/project",
        component: Project,
        name: "Project"
    },
    {
        path: "/article/:articleId",
        component: ArticleDetail,
        name: "ArticleDetail",
    }
]