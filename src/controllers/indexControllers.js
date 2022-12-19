const { literal, Op } = require('sequelize');
const db = require('../database/models');

module.exports={
    home: (req, res)=>{
        let products = db.Product.findAll({
            include : ['category','brand','images']
        })
        let urbano = db.Product.findAll({
            include : ['category','brand','images'],
            where : {
                categoryId : 1
            },
            limit : 4,
            order : [literal('rand()')]
        })
        let deportivo = db.Product.findAll({
            include : ['category','brand','images'],
            where : {
                categoryId : 2
            },
            limit : 4,
            order :[ literal('rand()')]
        })

        let ofertas = db.Product.findAll({
            include : ['category','brand','images'],
            where : {

                discount : {
                    [Op.gte] : 10
                }
                
                
            },
            limit : 4,
            order :[ literal('rand()')]
        })
        let brands = db.Brand.findAll();
        Promise.all([products, brands, urbano, deportivo, ofertas])
            .then(([products, brands, urbano, deportivo, ofertas]) => {
                return res.render('home',{
                    products,
                    brands,
                    urbano,
                    deportivo,
                    ofertas
                })
            })
            .catch(error => console.log(error))
    },
   
}