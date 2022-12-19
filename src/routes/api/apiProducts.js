const router = require('express').Router();
const {listAll, getOne, getImg, byCategory} = require('../../controllers/api/apiProductsControllers');

router
    .get('/', listAll)
    .get('/category', byCategory)
    .get('/img/:filename', getImg)
    .get('/:id', getOne)

module.exports = router;