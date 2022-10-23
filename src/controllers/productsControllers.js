const {loadProducts, storeProducts} = require('../data/productModule');
const {validationResult} = require('express-validator');
const db = require('../database/models');
const { Op } = require('sequelize');
const { reverse } = require('../data/cities');
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    carrito: (req, res)=>{
        return res.render('./products/carrito')
    },
    edit : (req,res) => {
        db.Product.findByPk(+req.params.id)
        .then(product => {console.log(product);res.render('./products/productEdit', { product })})
        .catch(error => console.log(error))
    },
    update : (req,res) => {
        const{name,price,discount,description} = req.body;
        // return res.send(req.body);
        const product = {
            id : req.params.id,
            name : name.trim(),
            price : +price,
            discount,
            description
        }
        db.Product.update(product, {
            where:
            {
                id: req.params.id
            }
        })
        .then(() => {
            return res.redirect('/products/detalle/' + product.id);
        })
        .catch(error => console.log(error))
    

        /*const products = loadProducts();
        const {id} = req.params;
        const{name,brand,price,discount,size,section} = req.body;
        const productModify = products.map(product =>{
            if (product.id === +id){
                return {
                    ...product,
                    name : name.trim(),
                    brand : brand.trim(),
                    price : +price,
                    discount : +discount,
                    section,
                    size : +size
                }
            }
            return product
        })
        storeProducts(productModify);
        return res.redirect('/products/detalle/'+ req.params.id)*/
    },
    detail: (req, res) => {
        const associations = 
        {
          include:
           [
           {
             association: 'sizes'
           }
         ]
        }
        db.Product.findByPk(req.params.id, associations)
        .then(product => res.render('./products/detalle', { product }))
        .catch(err => console.log(err))

        // const products = loadProducts();
        // const product = products.find(product => product.id === +req.params.id);

        // return res.render('./products/detalle',{
        //     product
        // })
    }, 
    add : (req,res) => {
        return res.render('./products/productAdd')
    },
    store : (req,res) => {
        db.Product.create(
            {
                ...req.body,
                name : req.body.name.trim(),
                price: +req.body.price,
                discount : +req.body.discount,
                description : req.body.description.trim(),
            })
            .then(() => {
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                   return res.redirect('/')
                   
                } else{
                    const products = loadProducts();
                    return res.render('./products/productAdd',{
                    errors : errors.mapped()
                })}  
            })
            .catch(err => console.log(err));   
        
    },
    remove : (req,res) => {
        // const products = loadProducts();
        // const productsModify = products.filter(product => product.id !== +req.params.id)
        // storeProducts(productsModify);

        // return res.redirect('/')
        db.Product.destroy(
            {
                where:
                {
                    id: req.params.id
                }
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err));
        
    },
    search : async (req,res) => {
        let { keywords } = req.query;
       
		db.Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords,
						},
					},
					{
						description: {
							[Op.substring]: keywords,
						},
					},
				],
			},
			 include: ['images'],
		})
			.then((result) => {
				return res.render("./products/product", {
					products: result,
					toThousand,
					keywords,
				});
			})
			.catch((error) => console.log(error));
	}
 }