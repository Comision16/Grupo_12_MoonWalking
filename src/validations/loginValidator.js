const { check, body } = require("express-validator");
const {loadUsers} = require('../data/productModule');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isEmail().withMessage("Debes incluir un email válido"),
  body("password")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio").bail()
    .custom(async (value, {req}) => {
        // let user = loadUsers().find(user => user.email === req.body.email && bcryptjs.compareSync(value, user.password))
        try {
          let user = await db.User.findAll({ where: {email: {[db.Sequelize.Op.eq] : req.body.email} }});
         
          if(user.length == 1 && bcryptjs.compareSync(value, user[0].password)){
          return user ? true : false
        }
        } catch (error) {
          console.log(error)
          return false
        }
       
       
    }).withMessage('Credenciales inválidas'),
];