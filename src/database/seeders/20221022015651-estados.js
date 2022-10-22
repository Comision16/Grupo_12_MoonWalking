"use strict";

const estados = ['Pendiente','Rechazado','Pagado'];

const statuses = estados.map(estado => {
  return {
   state : estado,
    createdAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Statuses", statuses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
