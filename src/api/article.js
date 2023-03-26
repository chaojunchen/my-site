import request from "./request";


// 文章分类
export async function getArticleCate (params = {}) {
    return await request.get("/api/articleCategory", {
        params
    })
}

// 文章列表
export async function getArticleList (params = { page: 1, limit: 10, categoryId: -1 }) {
    return await request.get('/api/article', {
        params 
    })

}


// 文章详情
export async function getArticleDetail (id) {
    return await request.get('/api/articleDetail', {
        params: {
            id,
        }
    })
}


// 根据文章id获取评论
export async function getComment (articleId = -1, page = 1, limit = 10) {
    return await request.get("/api/comment/", {
        params: {
            articleId,
            page,
            limit
        }
    })
}

/**
 * 提交评论
 * @param {
 *  nickName:"昵称"
 *  text："提交的评论"
 *  id:"文章的id"
 * } 
 */
export async function postComment (info = {}) {
    return await request.post('/api/comment', info)
}

