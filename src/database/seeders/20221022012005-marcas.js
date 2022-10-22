'use strict';

const marcas = [
  {
    name :  "Puma",
    image : "logo_puma.jpg"
  },
  {
    name :  "Adidas",
    image : "logo_adidas.jpg"
  },
  {
    name :  "Nike",
    image : "logo_nike.jpg"
  },
  {
    name :  "Converse",
    image : "logo_convers.jpg"
  },
  {
    name :  "Reebok",
    image : "logo_reebok.jpg"
  },
  {
    name :  "Vans",
    image : "logo_vans.jpg"
  },
  {
    name :  "Under Armour",
    image : "logo_armour.jpg"
  },
  {
    name :  "New Balance",
    image : "logo_nb.jpg"
  },
  {
    name :  "Fila",
    image : "filacolor.jpg"
  }
]

const brands = marcas.map(({name,image}) => {
  return {
    name,
    image,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Brands',brands, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Brands', null, {});
    
  }
};
