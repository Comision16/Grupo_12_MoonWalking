/* MULTER */
const multer = require('multer');
const path = require('path')


const storageProducts = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/zapatillas'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_zapatilla_${path.extname(file.originalname)}`);  
    } 
});

const uploadProducts = multer ({ storage : storageProducts });

module.exports = uploadProducts;