const { readdirSync } = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const cfg = require('../../config/database')[env]


const basename = path.basename(module.filename)
const sequelize = new Sequelize(cfg)
const db = {}

readdirSync(__dirname)
    .filter((file) =>{
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        let model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object
    .keys(db)
    .forEach( (name) => {
        if (db[name].associate) {
            db[name].associate(db);
        }
    })

db.sequelize = sequelize
db.Sequelize = Sequelize
//db.sequelize.sync()

module.exports = db