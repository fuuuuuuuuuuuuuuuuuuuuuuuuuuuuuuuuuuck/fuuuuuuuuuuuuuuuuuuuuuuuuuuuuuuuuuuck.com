// user model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            readonly: true
        },
        type: {
            type: DataTypes.STRING(191),
            allowNull:false,
            defaultValue: 'USER'
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        sex : {
            type: DataTypes.STRING(10),
            allowNull: false,
            readonly: true
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            readonly: true
        }
    }, {
        defaultScope: {
            attributes: ['id', 'name', 'nickname', 'sex']
        },
    })
}