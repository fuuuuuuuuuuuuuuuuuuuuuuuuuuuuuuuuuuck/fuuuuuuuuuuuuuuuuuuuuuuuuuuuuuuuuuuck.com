const Router = require('koa-router')
const middle = require('../middlewares')
const tokenService = require('../services/token')

const router = Router()

const { Topic, Reply } = require('../models')

router.get('/:topicId(\\d{1,20})', middle.token.isUser, async (ctx, next) => {
    ctx.body = 'angry core!'
})

router.post('/:topicId', middle.token.isUser ,async (ctx, next) => {
    const { topicId } = ctx.params
    let body = ctx.body
    if( !body.content )return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'TITTLE AND CONTENT IS REQUIRED'))
    const token = ctx.query.token
    const userId = tokenService.getUserByToken(token)
    body.userId = userId
    body.topicId = topicId
    const rlt = await Reply.create(body)
    ctx.body = rlt


})

router.delete('/:replyId(\\d{1,20})', middle.token.isMe , async (ctx, next) => {
    const { topicId } = ctx.params
    const rlt = await Topic.update({ deletedAt: new Date()}, {
        where: {
            id: topicId
        }
    })
    ctx.body = rlt

})

module.exports = router