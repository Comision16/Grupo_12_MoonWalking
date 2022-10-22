module.exports = (sequelize, dataTypes) => {
    const alias = 'Size';

    const cols = {
        idSize : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        number : {
            type : dataTypes.BOOLEAN,
            allowNull : true,
        }
    }

    const config = {
        tableName : 'sizes',
        timestamps : false,
        underscored : false
    }
    
    const Size = sequelize.define(alias, cols, config);

    Size.associate = (models) => {
        Size.belongsToMany(models.Product, {
            as : 'products',
            through: "ProductHasSize",
            foreignKey: 'products_idProducts',
            otherKey: 'sizes_idSize'
        })
    }

    return Size
}