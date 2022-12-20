const {loadProducts, storeProducts} = require('../data/productModule');
const {validationResult} = require('express-validator');
const db = require('../database/models');
const { Op, literal } = require('sequelize');
const { reverse } = require('../data/cities');
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    carrito: (req, res) => {
        return res.render('./products/carrito')
    },

    edit : async (req,res) => {
        try{  
            const product = await db.Product.findByPk(+req.params.id,{
                include : ['images']
            });
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();

            res.render('./products/productEdit', {product, brands, categories})
        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
    },

    update : (req,res) => {
        const {name, price, discount, description} = req.body;
        
        const product = {
            id : req.params.id,
            name : name?.trim(),
            price : +price,
            discount,
            description,
            dues: 1,
            brandId: +req.body.brandId,
            categoryId: +req.body.categoryId
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
    },

    detail: async (req, res) => {
      
        try{
            const product = await db.Product.findByPk(req.params.id, {
                include: ['images', 'brand', 'category']
            });

            const relacionados = await db.Product.findAll({
                where : {
                    [Op.or] : {
                        categoryId : product.category,
                        brandId : product.brandId
                    }
                },
                order : [literal('rand()')],
                include : ['images','brand','category']
            })

            return res.render('./products/detalle', {product,relacionados});
        }
        catch(error){
            console.log(error);
            res.send(error);
        }
    }, 

    add : async(req,res) => {
        try
        {
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();

            return res.render('./products/productAdd', {brands, categories})
        }
        catch(error){
            console.log(error);
            return res.send(error);
        }
    },

    store : async (req,res) => {
        const errors = validationResult(req);

       if(!errors.isEmpty()){
            try {
                const brands = await db.Brand.findAll();
                const categories = await db.Category.findAll();

                return res.render('./products/productAdd',
                {
                errors : errors.mapped(),
                brands, categories
                })
            }
            catch(error) {
                console.log(error);
                res.send(error);
            }
        }

        db.Product.create(
            {
                name : req.body.name.trim(),
                price: +req.body.price,
                description : req.body.description.trim(),
                discount : +req.body.discount,
                dues: 1,
                brandId: +req.body.brandId,
                categoryId: +req.body.categoryId
            })
            .then(() => {
                return res.redirect('/')
            })
            .catch(err => console.log(err));   
        
    },

    remove : (req,res) => {
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
        let { keywords, brand } = req.query;
        let queryOptions;
        if(brand) {
           queryOptions =  {
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
                        {
                            brandId : req.query.brand
                        }
                    ],
                },
                 include: ['images','brand','category'],
            }
        }else {
            queryOptions = {
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
                 include: ['images','brand','category'],
            }
        }
       
		db.Product.findAll(queryOptions)
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