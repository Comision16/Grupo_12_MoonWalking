const express = require('express');
const router = express.Router();
const {signUp, signIn} = require('../controllers/authControllers');
const uploadUser = require('../middlewares/uploadFiles');

/* /users */
router
    .post('/signup',uploadUser.single('avatar'), signUp)
    .post('/signin', signIn)

module.exports = router;