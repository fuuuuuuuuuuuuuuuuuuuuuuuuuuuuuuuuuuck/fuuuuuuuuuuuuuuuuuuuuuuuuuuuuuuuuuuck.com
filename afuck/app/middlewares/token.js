
const { Token, Reply, Topic } = require('../models')

console.log(Token)

//const getToken = async (ctx, next) => {
//    const token = ctx.query.token
//    if( !token ){
//        return ( 401, 'UNAUTHORIZED')
//    }
//    return await next()
//}
const checkToken = {
    isUser : async (ctx, next) => {
        const token = ctx.query.token
        if( !token ){
            return ( 401, 'UNAUTHORIZED')
        }
        let rlt
        try{
            rlt = await Token.find({
            })
        }
        catch(err){
            console.log('1',err)
        }

        if ( !rlt ){
            return (401, 'UNAUTHORIZED')
        }
        return await next()


    },
    isAdmin : async (ctx, next) => {
        const token = ctx.query.token
        if( !token ){
            return ( 401, 'UNAUTHORIZED')
        }
        let rlt
        try{
            rlt = await Token.findOne({
                where: {
                    token: token
                }
            })
        }
        catch(err){
            console.log('3',err)
        }

        if ( !rlt ){
            return (401, 'UNAUTHORIZED')
        }
        if ( rlt.type !== 'ADMIN'){
            return (401, 'UNAUTHORIZED')
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
            return ctx.throw(404,' NOT FOUND ID')
        }
        const token = ctx.query.token
        if( !token ){
            return ( 401, 'UNAUTHORIZED')
        }
        let rlt
        try {
            rlt = await Token.findOne({
                where: {
                    token: token
                }
            })
        }
        catch(err){
            console.log('2',err)
        }

        if( rlt.userId !== _info.userId){
            return ctx.throw('401', 'UNAUTHORIZED')
        }

        return await next()

    }
}
module.exports = checkToken