const db = require('../database/models');

const {loadProducts} = require('../data/productModule')

module.exports={
    home: (req, res)=>{
        db.Product.findAll({
            include : ['category','brand','images']
        })
            .then(products => {
                return res.render('home',{
                    products
                })
            })
            .catch(error => console.log(error))
        /* const products = loadProducts();
        return res.render('home',{
            products
        }); */
    },
}