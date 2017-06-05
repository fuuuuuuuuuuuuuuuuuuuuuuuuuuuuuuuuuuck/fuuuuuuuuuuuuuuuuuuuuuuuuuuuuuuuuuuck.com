// topic model

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reply', {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        TopicId: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        toUser: {
            type: DataTypes.BIGINT(20),
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
};