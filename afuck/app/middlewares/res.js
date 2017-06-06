const FuckError = require('../error')
const res_format = (ctx) => {
    if(ctx.body && ctx.status < 400) {
        ctx.body = {
            result: 'SUCCESS',
            data: ctx.body
        }
    }

}

const res = async (ctx, next) => {
    try {
        await next()
    }
    catch (error) {
        if(error instanceof FuckError){
            ctx.status = error.status
            ctx.body = {
                result: error.name,
                message: error.message
            }
        }else{
            throw error
        }

    }
    res_format(ctx)

}

module.exports = res


