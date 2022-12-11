const router = require('express').Router();
const {listAll, getOne, getImg} = require('../../controllers/api/apiProductsControllers');

router
    .get('/', listAll)
    .get('/:id', getOne)
    .get('/img/:filename', getImg)

module.exports = router;