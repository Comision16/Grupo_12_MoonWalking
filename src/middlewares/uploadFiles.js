/* MULTER */
const multer = require('multer');
const path = require('path')


const storageUsers = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/users'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`);  
    } 
});

const upload = multer ({ storage : storageUsers });

module.exports = upload;