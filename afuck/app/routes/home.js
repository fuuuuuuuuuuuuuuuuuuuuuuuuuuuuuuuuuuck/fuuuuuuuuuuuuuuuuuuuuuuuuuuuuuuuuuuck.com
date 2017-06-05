const Router = require('koa-router')
//const middle = require('../middlewares')


const router = Router()

router.get('/', async (ctx, next) => {
    ctx.body = 'angry core!'
})

module.exports = router