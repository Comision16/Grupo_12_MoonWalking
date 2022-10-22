"use strict";

const productos = [
  {
    id: 1,
    image: "zapa 1.jpg",
  },
  {
    id: 2,
    image: "zapa 2.jpg",
  },
  {
    id: 3,
    image: "zapa 3.jpg",
  },
  {
    id: 4,
    image: "zapa 4.jpg",
  },
  {
    id: 5,
    image: "zapa 10.jpg",
  },
  {
    id: 6,
    image: "zapa 11.jpg",
  },
  {
    id: 7,
    image: "zapa 6.jpg",
  },
  {
    id: 8,
    image: "zapa 8.jpg",
  },
  {
    id: 9,
    image: "zapa jordan.jpg",
  },
  {
    id: 10,
    image: "zapa 9.jpg",
  },
  {
    id: 11,
    image: "zapa 5.jpg",
  },
  {
    id: 12,
    image: "zapa 7.jpg",
  },
];

const images = productos.map(({id, image}) => {
  return {
   file : image,
   productId : id,
    createdAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
