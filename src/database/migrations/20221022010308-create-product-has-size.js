'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductHasSizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Products'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },
      sizeId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Sizes'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductHasSizes');
  }
};