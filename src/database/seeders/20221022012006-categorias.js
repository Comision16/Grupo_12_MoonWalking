'use strict';

const categorias = ['Urbano','Deportivo'];

const categories = categorias.map(categoria => {
  return {
    name : categoria,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Categories',categories, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
