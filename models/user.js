module.exports = (sequelize, DataTypes) => {
    const NotificationSetting = sequelize.define('NotificationSetting', {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        userId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        notifications: {
            defaultValue: false,
            allowNull: true,
            type: DataTypes.BOOLEAN,
        },
        comments: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        videoCalls: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        moreActivities: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    }, {
        freezeTableName: true,
        timestamps: true
    });

    (async () => {
         
            await sequelize.sync();
        
    })();

    return NotificationSetting
};