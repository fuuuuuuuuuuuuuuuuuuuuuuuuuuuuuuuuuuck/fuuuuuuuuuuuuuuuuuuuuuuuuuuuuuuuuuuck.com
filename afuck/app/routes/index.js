const Router = require('koa-router')
const path = require('path')
const { readdirSync } = require('fs')
const router = Router()

const basename = path.basename(module.filename)

readdirSync(__dirname)
    .filter((file) =>{
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        //let temp = require(path.join(__dirname, file))
        //router.use(temp.routes(), temp.allowedMethods())
        router.use(`/${file.split('.')[0]}`,require(`./${file}`).routes())
    })


module.exports = router