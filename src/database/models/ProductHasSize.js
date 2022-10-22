module.exports = (sequelize, dataTypes) => {
    const alias = 'ProductHasSize';

    const cols = {
        products_idProducts : {
            type : dataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'products',
                key: 'idProducts'
            }
        },
        sizes_idSize : {
            type : dataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'sizes',
                key: 'idSize'
            }
        }
    }

    const config = {
        tableName : 'products_has_sizes',
        timestamps : false,
        underscored : false
    }
    
    const ProductHasSize = sequelize.define(alias, cols, config);



    return ProductHasSize
}