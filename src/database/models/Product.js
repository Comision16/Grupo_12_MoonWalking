module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';

    const cols = {
        idProducts : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(250),
            allowNull : false,
        },
        brand :{
            type : dataTypes.STRING(45),
            allowNull : false,
        },
        price : {
            type : dataTypes.DECIMAL(5,3),
            allowNull : false,
        },
        description : {
            type : dataTypes.TEXT,
            allowNull : false,
        },
        dues : {
            type : dataTypes.BOOLEAN,
            allowNull : false,
        },
        idSize : {
            type : dataTypes.INTEGER,
            allowNull : false,
        },
        image : {
            type : dataTypes.STRING(200),
            allowNull : false,
        },
        stock : {
            type : dataTypes.INTEGER,
            allowNull : true,
        },
        category : {
            type : dataTypes.STRING(45),
            allowNull : false,
        }
    }

    const config = {
        tableName : 'products',
        timestamps : false,
        underscored : false
    }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsToMany(models.Size, {
            as : 'Size',
            through: "ProductHasSize",
            foreignKey: 'sizes_idSize',
            otherKey: 'products_idProducts'
        })
    }

    return Product
}