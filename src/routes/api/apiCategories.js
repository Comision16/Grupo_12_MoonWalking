const router = require('express').Router();
const {listAll, getOne} = require('../../controllers/api/apiCategoriesControllers');

router
    .get('/', listAll)
    .get('/:id', getOne)

module.exports = router;