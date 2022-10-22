'use strict';

const talles = [35,36,37,38,39,40,41,42,43,44,45]

const sizes = talles.map((number) => {
  return {
    number,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Sizes',sizes, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Sizes', null, {});
    
  }
};
