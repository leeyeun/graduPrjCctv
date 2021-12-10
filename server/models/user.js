module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user', 
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull : false,
            },
            admin : {
                type: DataTypes.STRING(3),
                allowNull : false
            },

            id: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};