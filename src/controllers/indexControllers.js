const {loadProducts} = require('../data/productModule');
const db = require('../database/models');

module.exports = {
    home: (req, res) => {
        const products = loadProducts();
        // const associations = 
        //  {
        //      include:
        //      [
        //          {
        //            association: 'Rols'
        //          }
        //      ]
        //  }
        //  db.User.findAll(associations).then((resultado) => {return res.send(resultado)});
        return res.render('home',{
            products
        });
        
    },
}