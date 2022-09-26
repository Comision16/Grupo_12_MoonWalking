var express = require('express');
var router = express.Router();
const {detail, store, add, carrito, search, update, edit,remove} = require('../controllers/productsControllers');
const productValidator = require('../validations/productValidator');
const adminsCheck = require('../middlewares/adminsCheck');

/* GET home page. */
router
.get('/detalle/:id', detail)
.get ('/add',add)
.get('/edit/:id', edit)
.put('/update/:id', update)
.post('/add', productValidator,store)
.get('/carrito', carrito)
.get('/search',search)
.delete('/delete/:id', remove)

module.exports = router;