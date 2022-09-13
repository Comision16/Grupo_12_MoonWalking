var express = require('express');
var router = express.Router();

const {login, register, createProfile, processLogin, updateChangesProfile, profile, usersList, logout} = require('../controllers/userControllers');
/* GET users listing. */

const usersValidator = require('../validations/userValidator')
const upload = require('../middlewares/uploadFiles');
const loginValidator = require('../validations/loginValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');

router
    .get('/login', login)
    .post('/login',loginValidator ,processLogin)
    .get('/register', register)
    .get('/', function(req, res, next) { //borrar esto
       res.send('respond with a resource');
    })
    .post('/register', upload.single('image'), usersValidator, createProfile) 
    .put('/update/:id', upload.single('image'), usersValidator, updateChangesProfile)
    .get('/profile', userSessionCheck, profile) //se fija que este logueado para poder entrar al profile
    .get('/usersList', usersList)
    .get('/logout', logout)

module.exports = router;