const Router = require('koa-router')
const middle = require('../middlewares')

const router = Router()

const { Topic, Reply } = require('../models')

router.get('/:topicId', middle.token.isUser, async (ctx, next) => {
    ctx.body = 'angry core!'
})

router.post('/:topicId', middle.token.isUser ,async (ctx, next) => {
    const { topicId } = ctx.params
    const token = ctx.getToken() || ctx.query.token
    const userId = tokenService.getUserByToken(token)
    let body = ctx.body
    body.userId = userId
    body.topicId = topicId
    const rlt = await Reply.create(body)
    ctx.send(rlt)


})

router.post('/delete/:replyId', middle.token.isMe , async (ctx, next) => {
    const { topicId } = ctx.params
    const rlt = await Topic.update({ deletedAt: new Date()}, {
        where: {
            id: topicId
        }
    })
    ctx.send(rlt)

})

module.exports = router