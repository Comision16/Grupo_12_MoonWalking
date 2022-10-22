"use strict";
const {hashSync} = require('bcryptjs')

const usuarios = [
  {
    firstName: 'Admin',
    lastName: 'MoonWalking',
    dni: null,
    email: 'admin@moonwalking.com',
    password: hashSync('123123',10),
    image: 'default.jpg',
    rolId: 1
    },
    {
      firstName: 'User',
      lastName: 'MoonWalking',
      dni: null,
      email: 'user@moonwalking.com',
      password: hashSync('123123',10),
      image: 'default.jpg',
      rolId: 2
      },
 
];

const users = usuarios.map(({firstName,lastName,dni,email,password,image,rolId}) => {
  return {
    firstName,
    lastName,
    dni,
    email,
    password,
    image,
    rolId,
    createdAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
