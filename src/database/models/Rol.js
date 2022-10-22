module.exports = (sequelize, dataTypes) => {
    const alias = 'Rol';

    const cols = {
        idRol : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        admin : {
            type : dataTypes.BOOLEAN,
            allowNull : true,
        },
        user : {
            type : dataTypes.BOOLEAN,
            allowNull : true,
        }
    }

    const config = {
        tableName : 'rol',
        timestamps : false,
        underscored : false
    }
    
    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany(models.User, {
            as : 'User',
            foreignKey: 'idRol'
        })
    }

    return Rol
}