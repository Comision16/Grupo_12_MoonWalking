const router = require('express').Router();
const {signUp, signIn} = require('../../controllers/api/apiAuthControllers');
// const {} require('../middlewares');
// destructurizar con los middlewares necesario
// fijarse de agregarselo también en las otras rutas

router
    .post('/signup', signUp)
    .post('/signin', signIn)

module.exports = router;