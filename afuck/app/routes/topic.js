const Router = require('koa-router')
const middle = require('../middlewares')
const tokenService = require('../services/token')

const router = Router()

const { Topic } = require('../models')

//获取主题
router.get('/', middle.token.isUser, async (ctx, next) => {
    ctx.body = 'angry core!'
})

//发布主题
router.post('/', middle.token.isUser ,async (ctx, next) => {
    const token = ctx.getToken() || ctx.query.token
    const userId = tokenService.getUserByToken(token)
    let body = ctx.body
    body.userId = userId
    const rlt = await Topic.create(body)
    return ctx.send(rlt)

})

//审核主题列表
router.get('/examine', middle.token.isAdmin, async (ctx, next) => {


})

//审核主题
router.post('/examine', middle.token.isAdmin, async (ctx, next) => {


})

//删除主题
router.post('/delete/:topicId', middle.token.isMe, async (ctx, next) => {
    const { topicId } = ctx.params
    const rlt  = await Topic.update({ deletedAt: new Date() },{
        where:{
            id: topicId
        }
    })
    return ctx.send(rlt)

})

module.exports = router