const db = require("../../database/models");
const path = require('path');

const apiProductsControllers = {
    listAll : async (req, res) => {
        try {
            /* let {count, rows : products} = await db.Product.findAndCountAll({
                attributes : ['id', 'name', 'price']
            }) */
             let products = await db.Product.findAll({ //o products
                 attributes : 
                     {
                         exclude : ["created_at", "updated_at"]
                     },
                     include : [
                         {
                             association : 'category',
                             attributes : ['name']
                         },
                         {
                            association: 'images',
                            attributes: ['file']
                         }
                     ]
                 });
            const count = await db.Product.count();

            return res.status(200).json({
                ok : true,
                // meta : {
                //     total : products.length,
                // },
                total : count,
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
       
        try {

            let product = await db.Product.findByPk(req.params.id); //o products

        return res.status(200).json({
            ok : true,
            meta : {
                status : 200
            },
            total: 1,
            data : {
                product
            } 
        })
        
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        }
    },
    getImg: async (req, res) =>
    {
        return res.sendFile(path.join(__dirname, '..','..', '..', 'public','img','zapatillas', req.params.filename));
    }
}

module.exports = apiProductsControllers;