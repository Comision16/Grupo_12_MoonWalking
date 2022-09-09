const fs = require('fs');
const path = require('path')

const loadProducts = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname,'product.json'),'utf-8'))
}
const loadUsers = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname,'users.json'),'utf-8'))
}
const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname,'product.json'), JSON.stringify(products,null,3),'utf-8')
}
const storeUsers = (products) => {
    fs.writeFileSync(path.join(__dirname,'users.json'), JSON.stringify(products,null,3),'utf-8')
}

module.exports ={
    loadProducts,
    storeProducts,
    loadUsers,
    storeUsers
}