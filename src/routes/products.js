var express = require('express');
var router = express.Router();
const {detail, store, add, carrito, search, update, edit,remove} = require('../controllers/productsControllers');


/* GET home page. */
router
.get('/detalle/:id',detail)
.get ('/add',add)
.get('/edit/:id',edit)
.put('/update/:id',update)
.post('/add',store)
.get('/carrito', carrito)
.get('/search',search)
.delete('/delete/:id',remove)

module.exports = router;