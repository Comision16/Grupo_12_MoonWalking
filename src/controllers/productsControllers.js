const {loadProducts, storeProducts} = require('../data/productModule');
const {validationResult} = require('express-validator');
const db = require('../database/models');
const { Op } = require('sequelize');
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
        const{name,brand,price,discount,size,section} = req.body;

        const product = {
            idProducts,
            name : name.trim(),
            brand : brand.trim(),
            price : +price,
            discount : +discount,
            section,
            size : +size
        }
        db.Product.update(product)
        .then(() => {
            return res.redirect('./products/detalle/' + product.idProducts);
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
             association: 'Size'
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
                name : name.trim(),
                price: parseFloat(price),
                discount : +discount,
                brand : brand.trim(),
                image : "zapa 4.jpg",
                description : description.trim(),
                category : category.trim()
            })
            .then(() => {
                const errors = validationResult(req);
                if(errors.isEmpty()){
                    const products = loadProducts();
                const{name,brand,price,discount} = req.body;
        
                const id = products[products.length -1].id;
        
                const newProduct = {
                    ...req.body,
                    id: id + 1,
                    name: name.trim(),
                    price: +price,
                    discount : +discount,
                    brand : brand.trim(),
                    image : "zapa 4.jpg"
                } 
                const productsNew = [...products,newProduct];
        
                storeProducts(productsNew)
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
                    idProducts: req.params.id
                }
            })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err));
        
    },
    search : async (req,res) => {
        let { keywords } = req.query;

        /*try {
            const products = await db.Product.findAll({
                include : [
                    {
                        association : 'Product'
                    }
                ],
                where : {
                    [Op.or] : [
                        {
                            name : {
                                [Op.substring] : keywords
                            }
                        }, 
                        {
                            description : {
                                [Op.substring] : keywords
                            }
                        }
                    ]
                }
            })
            return res.render('./products/product', {products})
        } catch (error) {
            console.log(error)
            return res.send(error)
        }*/
       
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
			 include: ['image'],
		})
			.then((result) => {
				return res.render("./products/product", {
					result,
					toThousand,
					keywords,
				});
			})
			.catch((error) => console.log(error));
	}
    //     const products = loadProducts();
    //     const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
    //     return res.render('./products/product',{
    //         products : result,
    //         keywords : req.query.keywords
    //     })
    // }
 }