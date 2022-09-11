var express = require('express');
var router = express.Router();

const {login, register, updateProfile, processLogin, profile, usersList, logout} = require('../controllers/userControllers');
/* GET users listing. */

const usersValidator = require('../validations/userValidator')
const upload = require('../middlewares/uploadFiles');
const loginValidator = require('../validations/loginValidator');

router
    .get('/login', login)
    .post('/login',loginValidator ,processLogin)
    .get('/register', register)
    .get('/', function(req, res, next) {
       res.send('respond with a resource');
    })
    .put('/update', upload.single('avatar'), usersValidator, updateProfile)
    .get('/profile', profile)
    .get('/usersList', usersList)
    .get('/logout', logout)

module.exports = router;