const Koa = require('koa')
const http = require('http')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const resource = require('koa-static')
const path = require('path')


const routes = require('./routes')
const config = require('../config/config')

const app = new Koa()

onerror(app)
app.use(convert(cors()))
app.use(convert(logger()))
app.use(bodyParser())
app.use(resource(path.join(__dirname,'../public')))

app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(routes.routes(), routes.allowedMethods())

app.on('error', (error, ctx) => {
    console.log('代码愤怒了' + JSON.stringify(ctx.onerror))
    console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', () => console.log('listening on port ' + config.port))

module.exports = app