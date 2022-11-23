const { hashSync, compareSync } = require("bcryptjs");
const db = require("../../database/models");
// const { sendSequelizeError, createError } = require("../helpers");
const { sign } = require("jsonwebtoken");

module.exports = {
    signUp: async (req, res) => {
        //registro al usuario y devuelve un token
    },
    signIn: async (req, res) => {
        //autenticación de usuario y token
    },
};