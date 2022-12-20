const {check} = require('express-validator')
module.exports= [
    check('name')
     .notEmpty().bail()
     .isLength({
        min: 4
     }),//.withMessage('Como minimo 4 caracteres'),

     check('price')
     .notEmpty()//.withMessage('Campo obligatorio')
     .bail()
     .isNumeric({
        no_symbols : true
     }),//.withMessage('Debe ser un numero entero'),

     check('discount')
     .isNumeric({
        no_symbols : true
     })//.withMessage('Debe ser un numero entero')
     .bail()
     .isInt({
        max: 100
     }),//.withMessage('No puede ser mayor que 100%'),

     check('description')
     .notEmpty()//.withMessage('Campo obligatorio')
     .bail()
     .isLength({
        min: 10,
        max: 200
     }),//.withMessage('Deben ser entre 10 a 200 caracteres'),

     check('brandId')
     .notEmpty(),//.withMessage('Campo obligatorio'),

     check('categoryId')
     .notEmpty(),//.withMessage('Campo obligatorio'),

     
]