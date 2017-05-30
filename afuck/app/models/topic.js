// topic model

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('topic', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })
};