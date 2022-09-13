var express = require('express');
var router = express.Router();

const {login, register, createProfile, processLogin, updateChangesProfile, profile, usersList, logout} = require('../controllers/userControllers');

/* GET users listing. */

const usersValidator = require('../validations/userValidator')
const upload = require('../middlewares/uploadFiles');
const loginValidator = require('../validations/loginValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');

router
    .post('/login',loginValidator ,processLogin)
    .get('/register', register)
    .post('/register', upload.single('image'), usersValidator, createProfile) 
    .put('/update/:id', upload.single('image'), usersValidator, updateChangesProfile)
    .get('/profile', userSessionCheck, profile) //se fija que este logueado para poder entrar al profile
    .get('/usersList', usersList)
    .get('/login',userSessionCheck, login)
    .get('/logout', logout)

module.exports = router;
