var express = require('express');
var router = express.Router();
const {detail, store, add, carrito, search, update, edit,remove} = require('../controllers/productsControllers');
const productValidator = require('../validations/productValidator');
const adminsCheck = require('../middlewares/adminsCheck');

/* GET home page. */
router
.get('/detalle/:id', adminsCheck, detail)
.get ('/add', adminsCheck, add)
.get('/edit/:id', adminsCheck, edit)
.put('/update/:id', adminsCheck, update)
.post('/add', adminsCheck, productValidator,store)
.get('/carrito', carrito)
.get('/search',search)
.delete('/delete/:id', adminsCheck, remove)

module.exports = router;