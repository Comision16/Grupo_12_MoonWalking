const {validationResult} = require('express-validator');
const { loadUsers, storeUsers } = require('../data/productModule');
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');


module.exports={
    login: (req, res) =>{
        return res.render('./users/login')
    },
    register: (req, res) => {
        return res.render('./users/register')
    },
    createProfile: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
           const {firstName, lastName, email, password} = req.body;
           const users = loadUsers();

           const newUser = {
            id : users[users.length -1] ? users[users.length -1].id + 1 : 1,
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            dni : null,
            email : email.trim(),
            password : bcryptjs.hashSync(password.trim(), 10),
            image: null,
            rol: 'user'
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
    },
    processLogin : (req, res) => {
        const errors = validationResult(req)

        if(errors.isEmpty()){
            let {id, firstName, image, rol} = loadUsers().find(user => user.email === req.body.email)
            req.session.userLogin = {
                id,
                firstName,
                image,
                rol
            }

            if(req.body.remember){ //lo trae express en el app.js
                res.cookie('userMoonWalking', req.session.userLogin, {
                    maxAge : 10000 * 60 
                })
            }

            return res.redirect('./profile')
        }else {
            return res.render('./users/login', {
               errors : errors.mapped()
            })
        }
    },
    profile: (req, res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id); //carga la vista de perfil de usuario los datos desde la base de datos (el archivo users.json)
        return res.render('./users/profile', {
            user,
            cities : require('../data/cities'),
            provinces : require('../data/provinces')
        })
    },
    updateChangesProfile : (req, res) => { //guardar los cambios
        console.log(req)
        const {firstName, lastName, dni, celular, email, calle, numero, piso, cp, city, province, image} = req.body;

        let usersModify = loadUsers().map(user => { //recorre el usuario
            if(user.id === +req.params.id){ //busca al usuario por parametros y cuando lo encuentra
                return {
                    ...user, // trae todos los datos
                    ...req.body, 
                    image : req.file ? req.file.filename : req.session.userLogin.image
                }
            }
            return user
        })
        
        if(req.file && req.session.userLogin.avatar){
            if(fs.existsSync(path.resolve(__dirname,'..','public','img', 'users', req.session.userLogin.image))){
                fs.unlinkSync(path.resolve(__dirname,'..','public','img', 'users', req.session.userLogin.image)) //elimina el anterior
            }
        }

        req.session.userLogin = { // guarda la info en userLogin
            ...req.session.userLogin,
            firstName,
            lastName,
            dni,
            email, 
            image : req.file ? req.file.filename : req.session.userLogin.image
        }

        storeUsers(usersModify); // guarda la info y actualiza/reescribe el json
        return res.redirect('/users/profile')
    },

    logout : (req, res) => {
        req.session.destroy()
        res.cookie('userMoonWalking', null, {
            maxAge : -1 
        })
        return res.redirect('/')
    } ,
    usersList: (req, res) => {
        return res.render('./users/usersList')
    }
}
