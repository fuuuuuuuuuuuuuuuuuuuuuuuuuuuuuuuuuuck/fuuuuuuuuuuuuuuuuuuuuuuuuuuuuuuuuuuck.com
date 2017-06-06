
const { Token, Reply, Topic } = require('../models')
const FuckError = require('../error')

const checkToken = {
    isUser : async (ctx, next) => {
        const token = ctx.query.token
        if( !token ){
            return ctx.throw( new FuckError(401, 'UNAUTHORIZED','TOKEN IS REQUIRED'))
        }
        let rlt
        rlt = await Token.findOne({
            where: {
                token
            }
        })

        if ( !rlt ){
            return ctx.throw(new FuckError(400, 'BAD REQUEST','USER IS INVALID' ))
        }
        return await next()

    },
    isAdmin : async (ctx, next) => {
        const token = ctx.query.token
        if( !token ){
            return ctx.throw( new FuckError(401, 'UNAUTHORIZED','TOKEN IS REQUIRED'))
        }
        let rlt
        rlt = await Token.findOne({
            where: {
                token: token
            }
        })
        if ( !rlt ){
            return ctx.throw(new FuckError(400, 'BAD REQUEST','USER IS INVALID' ))
        }
        if ( rlt.type !== 'ADMIN'){
            return ctx.throw( new FuckError(403, 'FORBIDDEN','PERMISSION DENIED'))
        }
        return await next()

    },
    isMe : async ( ctx, next ) => {
        const { replyId, topicId } = ctx.params
        let _info
        if( replyId ){
            _info = await Reply.findOne({
                where: {
                    id: replyId
                }
            })
        }
        if( topicId ){
            _info = await Topic.findOne({
                where: {
                    id: topicId
                }
            })
        }
        if(!_info){
            return ctx.throw(new FuckError(400, 'BAD REQUEST','USER IS INVALID' ))
        }
        const token = ctx.query.token
        if( !token ){
            return ctx.throw( new FuckError(400, 'BAD REQUEST','TOKEN IS REQUIRED'))
        }
        let rlt
        rlt = await Token.findOne({
            where: {
                token: token
            }
        })
        if( rlt.userId !== _info.userId){
            return ctx.throw( new FuckError(403, 'FORBIDDEN','PERMISSION DENIED'))
        }

        return await next()

    }
}
module.exports = checkToken