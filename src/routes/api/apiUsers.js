const router = require('express').Router();
const {listAll, getOne, verifyEmail, verifyPassword} = require('../../controllers/api/apiUserControllers');
const {checkToken} = require('../../middlewares/checkToken');
router
    .get('/', checkToken,  listAll)
    .get('/:id', getOne)
    .post('/verify-email', verifyEmail)
    .post('/verify-password', verifyPassword)
    /*.get('/avatar/:img', getAvatar)*/

module.exports = router