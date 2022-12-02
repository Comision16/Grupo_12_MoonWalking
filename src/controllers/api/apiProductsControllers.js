const db = require("../../database/models");

const apiProductsControllers = {
    listAll : async (req, res) => {
        try {
            let products = await db.Product.findAll({ //o products
                attributes : 
                    {
                        exclude : ["created_at", "updated_at"]
                    } 
                });
            return res.status(200).json({
                ok : true,
                meta : {
                    total : products.length,
                },
                data : products, //o products
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
        //const {id} = req.params.id
        try {
           /* if(isNaN(id)){
                let error = new Error('El id debe ser un numero');
                    error.status = 400;
                    throw error
            }*/
            let product = await db.Product.findByPk(req.params.id); //o products
           /* if(!product){
                let error = new Error('No encontramos unas zapatillas con ese ID')
                error.status = 404
                throw error
                /*return res.status(200).json({
                    ok : false,
                    meta : {
                        status : 200,
                        msg : 'No encontramos una zapatilla con ese ID'
                    },
                    data : null
                })
        }*/
        return res.status(200).json({
            ok : true,
            meta : {
                status : 200
            },
            data : {
                product,
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

module.exports = apiProductsControllers;