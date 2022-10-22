module.exports = (sequelize, dataTypes) => {
    const alias = 'User';

    const cols = {
        idUser : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        firstName : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        lastName : {
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        dni : {
            type : dataTypes.INTEGER,
            allowNull : false,
        },
        email : {
            type : dataTypes.STRING(200),
            allowNull : false,
        },
        password : {
            type : dataTypes.STRING(200),
            allowNull : false,
        },
        image : {
            type : dataTypes.STRING(200),
            allowNull : false,
        },
        idRol : {
            type : dataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'rols',
                key: 'idRol'
            }
        },
        idPedido : {
            type : dataTypes.INTEGER,
            allowNull : true,
        } 
    }
    const config = {
        tableName : 'users',
        timestamps : false,
        underscored : false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Rol, {
            as : 'Rol',
            foreignKey: 'idRol'
        })
    }

    return User
}