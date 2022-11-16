const router = require('express').Router();
const {listAll, getOne} = require('../../controllers/api/apiUserControllers');
router
    .get('/', listAll)
    .get('/:id', getOne)
    /*.get('/avatar/:img', getAvatar)*/

module.exports = router