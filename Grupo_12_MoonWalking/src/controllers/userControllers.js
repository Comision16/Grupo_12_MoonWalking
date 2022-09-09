const {validationResult} = require('express-validator');
const { loadUsers, storeUsers } = require('../data/productModule');
const bcryptjs = require('bcryptjs');


module.exports={
    login: (req, res) =>{
        return res.render('./users/login')
    },
    register: (req, res) => {
        return res.render('./users/register')
    },
    updateProfile: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
           const {firstName, lastName, email, password} = req.body;
           const users = loadUsers();

           const newUser = {
            id : users[users.length -1] ? users[users.length -1].id + 1 : 1,
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            dni : null,
            celular : null,
            email : email.trim(),
            password : bcryptjs.hashSync(password.trim(), 10),
            calle : null,
            numero : null,
            piso : null,
            cp : null,
            city : null
           }
           const userModify = [...users, newUser];
           storeUsers(userModify);
           return res.redirect('/users/login')

        } else {
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    }
}
