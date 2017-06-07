const Router = require('koa-router')
const middle = require('../middlewares')
const tokenService = require('../services/token')
const FuckError = require('../services/error')
const router = Router()

const { Topic } = require('../models')

//获取主题
router.get('/', middle.token.isUser, async (ctx, next) => {
    const topics = await Topic.findAll({
        where: {
            examine: 1
        },
        limit: 10
    })
    ctx.body = topics
})


//发布主题
router.post('/', middle.token.isUser ,async (ctx, next) => {
    const token = ctx.query.token
    const userId = await tokenService.getUserByToken(token)
    let body = ctx.request.body
    if( !body.tittle || !body.content ){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'TITTLE AND CONTENT IS REQUIRED'))
    }
    body.userId = userId
    console.log(body)
    const rlt = await Topic.create(body)
    return ctx.body = rlt

})

//审核主题列表
router.get('/examine', middle.token.isAdmin, async (ctx, next) => {
    const topics = await Topic.findAll({
        where: {
            examine: 0,
            deletedAt: null
        },
        limit: 10
    })
    ctx.body = topics

})

//审核主题
router.post('/examine', middle.token.isAdmin, async (ctx, next) => {
    const { topicId, } = ctx.request.body
    if( !topicId || !examine ){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'TOPICID AND EXAMINE IS REQUIRED'))
    }
    if(['0','-1','1'].indexOf(examine + '') === -1){
        return  ctx.throw(new FuckError(400, 'BAD_REQUEST', 'TOPICID AND EXAMINE IS REQUIRED'))
    }
    const rlt = await Topic.upate({ examine: examine }, {
        where: {
            id: topicId
        }
    })
    return ctx.body = rlt


})


//我的主题
router.get('/mytopic', middle.token.isMe, async (ctx, next) => {
    const { topicId } = ctx.params
    const token = ctx.query.token
    const userId = tokenService.getUserByToken(token)
    const rlt = await Topic.findAll({
        where: {
            userId,
            deletedAt: null
        },
        limit: 10
    })
    return ctx.body = rlt

})

//删除主题
router.post('/delete/:topicId', middle.token.isMe, async (ctx, next) => {
    const { topicId } = ctx.params
    const rlt  = await Topic.update({ deletedAt: new Date() },{
        where:{
            id: topicId
        }
    })
    return ctx.body = rlt

})

module.exports = router