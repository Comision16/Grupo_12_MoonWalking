const { check, body } = require("express-validator");
const {loadUsers} = require('../data/productModule');
const bcryptjs = require('bcryptjs');

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isEmail().withMessage("Debes incluir un email válido"),
  body("password")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio").bail()
    .custom((value, {req}) => {
        let user = loadUsers().find(user => user.email === req.body.email && bcryptjs.compareSync(value, user.password))
        return user ? true : false
    }).withMessage('Credenciales inválidas'),
];