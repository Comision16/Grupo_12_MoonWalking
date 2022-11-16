const router = require('express').Router();
const {listAll, getOne} = require('../../controllers/api/apiProductsControllers');

router
    .get('/', listAll)
    .get('/:id', getOne)/*
    .get('/image/:img', getAvatar)*/

module.exports = router;