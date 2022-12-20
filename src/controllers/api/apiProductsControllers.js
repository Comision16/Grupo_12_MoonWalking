const db = require("../../database/models");
const path = require('path');
const { literal } = require("sequelize");

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
                data : products,
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

            let product = await db.Product.findByPk(req.params.id);

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
    },
     /* APIS */
     byCategory : async (req,res) => {
        try {

            let products = await db.Product.findAll({
                include : ['category','brand','images'],
                where : {
                    categoryId : req.query.category
                },
                limit : 4,
                order :[ literal('rand()')]
            })

            return res.status(200).json({
                ok : true,
                products
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                products : null,
                msg : error.message || 'upsss, error!'
            })
        }
    }
}

module.exports = apiProductsControllers;