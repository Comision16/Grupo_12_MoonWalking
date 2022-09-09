var express = require('express');
var router = express.Router();

const {login, register, updateProfile} = require('../controllers/userControllers');
/* GET users listing. */

const usersValidator = require('../validations/userValidator')
const upload = require('../middlewares/uploadFiles')

router
    .get('/login', login)
    .get('/register', register)
    .get('/', function(req, res, next) {
       res.send('respond with a resource');
    })
    .put('/update/:id', upload.single('avatar'), usersValidator, updateProfile)

module.exports = router;