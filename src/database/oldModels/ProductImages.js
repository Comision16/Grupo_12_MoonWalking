module.exports = (sequelize, dataTypes) => {
    const alias = 'ProductImage';

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
        tableName : 'productsImages',
        timestamps : false,
        underscored : false
    }
    
    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            as :'Product',
            foreignKey: 'idProduct'
        })
    }

    return ProductImage
}