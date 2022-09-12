const {loadProducts, storeProducts} = require('../data/productModule');
const {validationResult} = require('express-validator')


module.exports = {
    carrito: (req, res)=>{
        return res.render('./products/carrito')
    },
    edit : (req,res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('./products/productEdit',{
            product,
        })
    },
    update : (req,res) => {
        const products = loadProducts();
        const {id} = req.params;
        const{name,brand,price,discount,size,category,section} = req.body;
        const productModify = products.map(product =>{
            if (product.id === +id){
                return {
                    ...product,
                    name : name.trim(),
                    brand : brand.trim(),
                    price : +price,
                    discount : +discount,
                    category,
                    section,
                    size : +size
                }
            }
            return product
        })
        storeProducts(productModify);
        return res.redirect('/products/detalle/'+ req.params.id)
    },
    detail: (req, res)=>{
        const products = loadProducts();
         const product = products.find(product => product.id === +req.params.id);

        return res.render('./products/detalle',{
            product
        })}, 
    add : (req,res)=>{
        return res.render('./products/productAdd')
    },
    store : (req,res)=>{

         const errors = validationResult(req)
         
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
        }else{
            const products = loadProducts();
            return res.render('./products/productAdd',{
            errors : errors.mapped()
        })}
        
    },
    remove : (req,res) => {
        const products = loadProducts();
        const productsModify = products.filter(product => product.id !== +req.params.id)
        storeProducts(productsModify);

        return res.redirect('/')
    },
    search : (req,res) => {
        const products = loadProducts();
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('./products/product',{
            products : result,
            keywords : req.query.keywords
        })
    }
 }