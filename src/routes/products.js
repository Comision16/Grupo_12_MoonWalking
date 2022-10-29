var express = require('express');
var router = express.Router();
const {detail, store, add, carrito, search, update, edit,remove} = require('../controllers/productsControllers');
const productValidator = require('../validations/productValidator');
const adminsCheck = require('../middlewares/adminsCheck');
const uploadProducts = require('../middlewares/uploadFileProducts');

/* GET home page. */
router
.get('/detalle/:id', detail)
.get ('/add', adminsCheck, add)
.get('/edit/:id', uploadProducts.single('image'),adminsCheck, edit)
.put('/update/:id', adminsCheck, update)
.post('/add', uploadProducts.single('image'), productValidator, store)
.get('/carrito', carrito)
.get('/search',search)
.delete('/delete/:id', adminsCheck, remove)

module.exports = router;