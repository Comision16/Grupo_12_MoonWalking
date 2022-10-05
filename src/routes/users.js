var express = require('express');
var router = express.Router();

const {login, register, createProfile, processLogin, updateChangesProfile, profile, logout} = require('../controllers/userControllers');

/* GET users listing. */

const usersValidator = require('../validations/userValidator')
const upload = require('../middlewares/uploadFiles');
const loginValidator = require('../validations/loginValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const guestsCheck = require('../middlewares/guestsCheck');

router
    .get('/login', guestsCheck, login)
    .post('/login',loginValidator ,processLogin)
    .get('/register', guestsCheck, register)
    .post('/register', upload.single('image'), usersValidator, createProfile) 
    .put('/update/:id', upload.single('image'), usersValidator, updateChangesProfile)
    .get('/profile', userSessionCheck, profile) //se fija que este logueado para poder entrar al profile
    .get('/login',userSessionCheck, login)
    .get('/logout', logout)

module.exports = router;
