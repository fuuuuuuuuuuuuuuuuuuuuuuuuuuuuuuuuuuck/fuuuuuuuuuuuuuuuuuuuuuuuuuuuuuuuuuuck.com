const { readdirSync } = require('fs')
const path = require('path')
const basename = path.basename(module.filename)

const middleware = {}

readdirSync(__dirname)
    .filter((file) =>{
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        middleware[file] = require(path.join(dirname, file))
    })

module.exports = middleware