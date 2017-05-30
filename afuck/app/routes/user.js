const Router = require('koa-router')

const router = Router()

router.post('/login', async (ctx, next) => {
    ctx.body = 'user login!'
})

router.get('/:userId', async (ctx, next) => {
    ctx.body = ' get userInfo'
})

module.exports = router