var express = require('express');
var router = express.Router();
const {detail, store, add, carrito, search} = require('../controllers/productsControllers');

/* GET home page. */
router
.get('/detalle/:id',detail)
.get ('/add',add)
.post('/add',store)
.get('/carrito', carrito)
.get('/search',search)

module.exports = router;