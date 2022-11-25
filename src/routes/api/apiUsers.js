const router = require('express').Router();
const {listAll, getOne} = require('../../controllers/api/apiUserControllers');
const {checkToken} = require('../../middlewares/checkToken');
router
    .get('/', checkToken,  listAll)
    .get('/:id', getOne)
    /*.get('/avatar/:img', getAvatar)*/

module.exports = router