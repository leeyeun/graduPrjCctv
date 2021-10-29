module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'store', 
        {
            storeid: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER

            },
            storeName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            address: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            number: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            time: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            sit: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            introduce: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING(1024),
                allowNull: true
            },
            view_cnt : {
                type : DataTypes.INTEGER, 
                allowNull : false,
                defaultVale : 0
            },
            likes : {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultVale : 0
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
            freezeTableName: true,
        }
    )
};