// token model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('token', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            readonly: true
        },
        userId: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    })
};