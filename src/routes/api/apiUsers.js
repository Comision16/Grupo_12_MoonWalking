const router = require('express').Router();
const {listAll, getOne, verifyEmail, getImg} = require('../../controllers/api/apiUserControllers');
const {checkToken} = require('../../middlewares/checkToken');
router
    .get('/'/* , checkToken  */ ,listAll) //en el medio va checktoken
    .get('/:id', getOne)
    .post('/verify-email', verifyEmail)
    .get('/img/:filename', getImg)

module.exports = router