const Router = require('koa-router')
const middle = require('../middlewares')
const { User,Token } = require('../models')
const crypto = require('crypto')
const router = Router()

//登陆
router.post('/sigin', async (ctx, next) => {
    const { name, password } = ctx.request.body
    const pwd = crypto.createHmac('sha256', password).update('fuck').digest('hex')
    const user = await User.findOne({
        where : {
            name,
            password: pwd
        }
    })
    if( !user ){
        return ctx.throw(404, 'NAME OR PASSWORD ERR')
    }
    const token = crypto.createHmac('sha256', new Date().getTime().toString() ).update('fuck').digest('hex')
    const tokenInfo = await Token.findOne({
        where: {
            userId: user.id
        }
    })
    let rlt
    if( !tokenInfo ){
        rlt = await Token.create({
            userId: user.id,
            token,
        })
    }
    else {
        rlt = await Token.update(token, {
            where: {
                userId: user.id
            }
        })
    }
    return ctx.send(rlt)

})

//查询用户
router.get('/:userId', middle.token.isAdmin , async (ctx, next) => {
    ctx.body = ' get userInfo'
})


//注册
router.post('/sigup', async (ctx, next) => {
    const { name, password, nickname, sex } = ctx.request.body
    const rt = await User.findOne({
        where: {
            name
        }
    })
    console.log(rt)
    if( rt ) {
        return ctx.throw(401,' USER IS EXISTED')
    }
    const pwd = crypto.createHmac('sha256', password).update('fuck').digest('hex')
    const user = {
        name,
        password: pwd,
        nickname,
        sex
    }
    const rlt = await User.create(user)
    return ctx.body = 'angry core!'
})

//登出
router.post('/sigout' , middle.token.isUser , async (ctx, next) => {
    const token = ctx.getToken() || ctx.query.token
    const rlt = await Token.destroy({
        where: {
            token,
        }
    })
    return ctx.send(rlt)

})


module.exports = router