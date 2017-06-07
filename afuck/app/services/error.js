/**
 * Created by foxtail on 17/6/6.
 */
class FuckError extends Error{
    constructor(status, error_name, error_message){
        super()
        this.status = status
        this.name = error_name
        this.message = error_message
    }
}
module.exports = FuckError