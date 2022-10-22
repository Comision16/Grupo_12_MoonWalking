const { validationResult } = require("express-validator");
const { loadUsers, storeUsers, loadAdmins } = require("../data/productModule");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const admins = loadAdmins();
const isAdmin = (id) => {
  return admins.find((admin) => admin.id === id);
};

module.exports = {
  login: (req, res) => {
    return res.render("./users/login");
  },
  register: (req, res) => {
    return res.render("./users/register");
  },
  createProfile: (req, res) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;

    if (errors.isEmpty()) {
      db.User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dni: 44505757,
        email: email.trim(),
        password: bcryptjs.hashSync(password.trim(), 10),
        image: "test.png",
        idRol: 1,
      })
        .then(() => {
          res.redirect("/users/login");
        })
        .catch((err) => console.log(err));
    } else {
      return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // if(errors.isEmpty()){
    //    const {firstName, lastName, email, password} = req.body;
    //    const users = loadUsers();

    //    const newUser = {
    //     id : users[users.length -1] ? users[users.length -1].id + 1 : 1,
    //     firstName : firstName.trim(),
    //     lastName : lastName.trim(),
    //     dni : null,
    //     email : email.trim(),
    //     password : bcryptjs.hashSync(password.trim(), 10),
    //     image: null,
    //     rol: 'user'
    //    }
    //    const userModify = [...users, newUser];
    //    storeUsers(userModify);
    //    return res.redirect('/users/login')

    // }
  },
  processLogin: (req, res) => {
  const errors = validationResult(req);
    if (errors.isEmpty()) {
        db.User.findOne({
            where: {
                email: req.body.email
            },
            include: [
                {
                    association: 'Rol'
                }
            ]
        })      
        .then((user) => {
          console.log("|||||||||||||||||||||||||| CONSOLE LOG");
          console.log(user);

          let { idUser, firstName, image } = user;
          
          req.session.userLogin = {
            id: idUser,
            firstName,
            image,
            rol: user.Rol,
            admin: user.Rol.admin,
          };

          if (req.body.remember) {
            //lo trae express en el app.js
            res.cookie("userMoonWalking", req.session.userLogin, {
              maxAge: 10000 * 60,
            });
          }
          return res.redirect("./profile");
        })
        .catch((err) => console.log(err));
    } else {
      return res.render("./users/login", {
        errors: errors.mapped(),
      });
    }
  },
   profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        return res.render("./users/profile", {
          user,
          cities: require("../data/cities"),
          provinces: require("../data/provinces"),
         
        });
      })
      .catch((err) => console.log(err));

    /* let user = loadUsers().find((user) => user.id === req.session.userLogin.id); //carga la vista de perfil de usuario los datos desde la base de datos (el archivo users.json)
    return res.render("./users/profile", {
      user,
      cities: require("../data/cities"),
      provinces: require("../data/provinces"),
    }); */
  },
  updateChangesProfile: (req, res) => {
    //guardar los cambios
    db.User.update(
      {
          firstName: req.body.firstName?.trim(),
          lastName: req.body.lastName?.trim(),
          dni: req.body.dni,
          email: req.body.email?.trim(),
          image: req.file ? req.file.filename : req.session.userLogin.image
      },
      {
          where:
          {
              idUser: +req.params.id
          }
      })
      .then((user) =>
      {
        req.session.userLogin = {
          // guarda la info en userLogin
          ...req.session.userLogin,
          firstName : user.firstName,
          lastName: user.lastName,
          dni: user.dni,
          email: user.email,
          image: req.file ? req.file.filename : req.session.userLogin.image,
        };

        /* 
        if (req.file && req.session.userLogin.avatar) {
          if (
            fs.existsSync(
              path.resolve(
                __dirname,
                "..",
                "public",
                "img",
                "users",
                req.session.userLogin.image
              )
            )
          ) {
            fs.unlinkSync(
              path.resolve(
                __dirname,
                "..",
                "public",
                "img",
                "users",
                req.session.userLogin.image
              )
            ); //elimina el anterior
          }
        }*/

        return res.redirect("/users/profile");
      })
      .catch(err => 
      {
        console.log(err)
        return res.send(err);
      });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("userMoonWalking", null, {
      maxAge: -1,
    });
    return res.redirect("/");
  },
  usersList: (req, res) => {
    return res.render("./users/usersList");
  },
};
