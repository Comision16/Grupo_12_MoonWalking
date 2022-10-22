module.exports = (sequelize, dataTypes) => {
    const alias = 'UserImage';

    const cols = {
        idImage : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        filename : {
            type : dataTypes.STRING(255),
            allowNull : false,
        },
        idUser : {
            type : dataTypes.INTEGER,
            allowNull : false,
        }
    }

    const config = {
        tableName : 'userImages',
        timestamps : false,
        underscored : false
    }
    
    const UserImage = sequelize.define(alias, cols, config);

    UserImage.associate = (models) => {
        UserImage.belongsTo(models.User, {
            as :'User',
            foreignKey: 'idUser'
        })
    }

    return UserImage
}