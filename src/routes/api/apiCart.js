// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list, addItem, removeQuantity, removeAllItems} = require('../../controllers/api/apiCartController');

// /api/carts

router
    .get('/', list)
    .post('/', addItem)
    .delete('/all/:id',removeAllItems)
    .delete('/',removeQuantity)

module.exports = router;