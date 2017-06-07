const Router = require('koa-router')
const middle = require('../middlewares')
const { User,Token } = require('../models')
const crypto = require('crypto')
const router = Router()
const FuckError = require('../services/error')

//登陆
router.post('/sigin', async (ctx, next) => {
    const { name, password } = ctx.request.body
    if( !name || !password ){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'NAME AND PASSWORD IS REQUIRED'))
    }
    const pwd = crypto.createHmac('sha256', password).update('fuck').digest('hex')
    const user = await User.findOne({
        where : {
            name,
            password: pwd
        }
    })
    if( !user ){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'NAME OR PASSWORD IS WRONG'))
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
        rlt = await Token.update({token: token}, {
            where: {
                userId: user.id
            }
        })
    }
    if( !rlt ){
        return ctx.throw(500,'SERVER ERR','UPDATE TOKEN FAIL')
    }
    return ctx.body = {
        name: user.name,
        nickname: user.nickname,
        sex: user.sex,
        token
    }

})

//查询用户
router.get('/:userId', middle.token.isAdmin , async (ctx, next) => {
    ctx.body = ' get userInfo'
})


//注册
router.post('/sigup', async (ctx, next) => {
    const { name, password, nickname, sex } = ctx.request.body
    if( !name || !password || !nickname || !sex ){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', 'NAME AND PASSWORD AND NICKNAME AND SEX IS REQUIRED'))
    }
    const rt = await User.findOne({
        where: {
            name
        }
    })
    if( rt ) {
        return ctx.throw(new FuckError(400,'BAD_REQUEST', ' USER IS EXISTED'))
    }
    const pwd = crypto.createHmac('sha256', password).update('fuck').digest('hex')
    const user = {
        name,
        password: pwd,
        nickname,
        sex
    }
    const rlt = await User.create(user)
    if( !rlt ){
        return ctx.throw(500,'SERVER ERR','CREATE USER FAIL')
    }
    return ctx.body = 'welcome to fuuuuuuuuuuuuuuuuuuuck !'
})

//登出
router.post('/sigout' , middle.token.isUser , async (ctx, next) => {
    const token = ctx.query.token
    const rlt = await Token.destroy({
        where: {
            token,
        }
    })
    if( !rlt ) {
        return ctx.throw(500,'SERVER ERR','DELETE TOKEN FAIL')
    }
    return ctx.body = 'sigout success!'

})


module.exports = router