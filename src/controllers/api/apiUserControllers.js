const db = require("../../database/models");

module.exports = {
    listAll : async (req, res) => {
        try {
            let users = await db.User.findAll({ //verificar como poner los attributes de users
                attributes : 
                   
                });
            return res.status(200).json({
                ok : true,
                meta : {
                    total : users.length,
                },
                data : users, 
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        } 
    },
   
    getOne : async (req, res) => {
         const {id} = req.params.id
        
        try {
            if(isNaN(id)){
                let error = new Error('El id debe ser un numero');
                    error.status = 400;
                    throw error
            }
            let product = await db.Product.findByPk(req.params.id); //o products
            if(!product){
                let error = new Error('No encontramos un usuario con ese ID')
                error.status = 404
                throw error
        }
        return res.status(200).json({
            ok : true,
            meta : {
                status : 200
            },
            data : {
                user,
                total : 1
            } 
        })
        
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        }
    }/*,
    getAvatar : async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }*/
}