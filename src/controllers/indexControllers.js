const {loadProducts} = require('../data/productModule')

module.exports={
    home: (req, res)=>{
        const products = loadProducts();
        return res.render('home',{
            products
        });
    },
}