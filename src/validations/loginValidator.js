const { check, body } = require("express-validator");
const {loadUsers} = require('../data/productModule');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = [
  check("email")
    .notEmpty()
    //.withMessage("Debes completar el campo obligatorio")
    .bail()
    .isEmail().withMessage("Debes incluir un email válido"),
    body("password")
    .notEmpty()
    //.withMessage("Debes completar el campo obligatorio")
    .bail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        const pass = bcryptjs.compareSync(value, user.password);
        if (!pass) {
          return Promise.reject("Contraseña incorrecta");
        }
      } else {
        return Promise.reject("Email incorrecto");
      }
    }
    )
];