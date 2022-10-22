'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Size, {
        as: 'sizes',
        through : 'ProductHasSizes',
        foreignKey : 'productId',
        otherKey : 'sizeId'
      })

      this.belongsTo(models.Category, {
        as : 'category',
        foreignKey : 'categoryId'
      })

      this.belongsTo(models.Brand, {
        as : 'brand',
        foreignKey : 'brandId'
      })

      this.hasMany(models.Image, {
        as : 'images',
        foreignKey : 'productId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    dues: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};