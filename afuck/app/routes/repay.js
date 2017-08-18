/**
 * Created by foxtail on 17/7/17.
 */
const Router = require('koa-router')
const router = Router()
const crypto = require('crypto')
const request = require('request-promise')

const website = 'http://www.yijiapay.net/interace/gateway'
const merchantid = '15128'
const merchantkey = 'c0760ec534f234ba9f0b89bf402e4996'
const notifyurl = 'http://dnf.yoyicu.com/test/'
const resulturl = 'http://baidu.com'


const getSign = async (body) => {
    const str = `merchantid=${merchantid}&orderid=${k.orderid}&money=${k.money}&channeltype=${k.channeltype}&bankcode=${k.bankcode}&cardid=${k.cardid}&cardpass=${k.cardpass}&notifyurl=${k.notifyurl}&resulturl=${k.resulturl}&merchantkey=${merchantkey}`
    return crypto.createHash('md5').update(str).digest('hex')
}

router.post('/', async (ctx, next) => {
    const body = ctx.body
    let sign
    try{
        sign = await getSign(body)
    }catch (err){
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', '参数错误'))
    }
    if(!sign) {
        return ctx.throw(new FuckError(400, 'BAD_REQUEST', '未知错误'))
    }
    const { orderid, money, channeltype, bankcode ,cardid, cardpass, custom } = body
    const res = await request({
        method: 'POST',
        uri: website,
        body: {
            merchantid,
            orderid,
            money,
            channeltype,
            bankcode,
            cardid,
            cardpass,
            notifyurl,
            resulturl,
            custom
        },
        json: true
    })

    ctx.body = rlt

})

//router.delete('/:replyId(\\d{1,20})', middle.token.isMe , async (ctx, next) => {
//    const { topicId } = ctx.params
//    const rlt = await Topic.update({ deletedAt: new Date()}, {
//        where: {
//            id: topicId
//        }
//    })
//    ctx.body = rlt
//
//})

module.exports = router