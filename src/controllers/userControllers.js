const { validationResult } = require("express-validator");
const { loadUsers, storeUsers, loadAdmins } = require("../data/productModule");
const bcryptjs = require("bcryptjs");
const { createError } = require("../helpers");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { sign } = require("jsonwebtoken");

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
        rolId: 2,
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
  },

  processLogin: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
        include: [
          {
            association: "rol",
          },
        ],
      })
        .then((user) => {
          if (!user)
            throw createError(404, "El usuario no pudo ser encontrado");

          let { id, firstName, image } = user;

          req.session.userLogin = {
            id,
            firstName,
            image,
            rol: user.rol,
            admin: user.rol.name == "Admin" ? true : false,
          };

          if (req.body.remember) {
            //lo trae express en el app.js
            res.cookie("userMoonWalking", req.session.userLogin, {
              maxAge: 10000 * 60,
            });
          }

          /* carrito */
          db.Order.findOne({
            where: {
              userId: req.session.userLogin.id,
              status: 1,
            },
            include: [
              {
                association: "items",
                attributes: ["id", "quantity"],
                include: [
                  {
                    association: "product",
                    attributes: ["id", "name", "price", "discount"],
                    include: ["images"],
                  },
                ],
              },
            ],
          }).then((order) => {
            if (order) {
              req.session.orderCart = {
                id: order.id,
                amount: order.amount,
                items: order.items,
              };
            } else {
              db.Order.create({
                amount: 0,
                userId: req.session.userLogin.id,
                status: 1,
              }).then((order) => {
                req.session.orderCart = {
                  id: order.id,
                  amount: order.amount,
                  items: [],
                };
              });
            }
            return res.redirect("/");
          });
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
        image: req.file ? req.file.filename : req.session.userLogin.image,
      },
      {
        where: {
          id: +req.params.id,
        },
      }
    )
      .then((user) => {
        req.session.userLogin = {
          // guarda la info en userLogin
          ...req.session.userLogin,
          firstName: user.firstName,
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
      .catch((err) => {
        console.log(err);
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
