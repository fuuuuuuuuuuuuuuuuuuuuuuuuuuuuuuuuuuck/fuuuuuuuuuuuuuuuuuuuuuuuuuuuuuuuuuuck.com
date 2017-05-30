const Router = require('koa-router')

const router = Router()

router.get('/', async (ctx, next) => {
    ctx.body = 'angry core!'
})

module.exports = router