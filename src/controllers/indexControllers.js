const db = require('../database/models');

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
    },
}