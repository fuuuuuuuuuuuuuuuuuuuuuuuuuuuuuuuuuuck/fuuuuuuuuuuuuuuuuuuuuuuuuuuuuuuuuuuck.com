const port = Number.parseInt(process.env.PORT) || 7000

module.exports = {
    port,
    redisUrl: '127.0.0.1:6379/1',
    secretKeyBase: 'xxx'
}