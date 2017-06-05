const { Token } = require('../models')

module.exports = {
    getUserByToken : async (token) => {
        let userId
        const _token = await Token.findOne({
            where: {
                token
            }
        })
        if(_token){
            userId = _token.userId
        }
        return userId
    }
}