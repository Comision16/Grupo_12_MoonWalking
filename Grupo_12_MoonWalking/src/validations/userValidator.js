const { check, body } = require("express-validator");

const {loadUsers} = require('../data/productModule');

module.exports = [
  check("firstName")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Debe incluir minímo 3 caracteres").bail()
    .isAlpha('es-ES').withMessage('Únicamente caracteres alfabéticos'),
  check("lastName")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio").bail()
    .isAlpha('es-ES').withMessage('Unicamente caracteres alfabéticos'),
  check("dni")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage("El DNI no debe incluir simbolos"),
  body("email")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isEmail().withMessage("Debes incluir un email válido").bail()
    .custom((value, {req}) => {
        const user = loadUsers().find(user => user.email === value);
        if(user){
            return false
        }else{
            return true
        }
    }).withMessage("Email existente"),
  check("password")
    .notEmpty()
    .withMessage("Debes completar el campo obligatorio")
    .bail()
    .isNumeric({ no_symbols: true }).withMessage("No debe incluir símbolos").bail()
    .isLength({min: 5,
    max: 10}).withMessage("La contraseña debe incluir entre 5 y 10 caracteres"),
    body('password2')
    .notEmpty().withMessage("Debes confirmar la contraseña").bail()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            return false
        }else {
            return true
        }
    }).withMessage("Ambas contraseñas no coiciden")
];
