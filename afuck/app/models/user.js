// user model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            readonly: true
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        passworld: {
            type: DataTypes.STRING(191),
            allowNull: false
        }
    })
}