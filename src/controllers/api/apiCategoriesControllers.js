const db = require("../../database/models");

const apiCategoriesControllers = {
    listAll : async (req, res) => {
        try {
             let categories = await db.Category.findAll({
                 include: [{association: 'products'}],
                 attributes : 
                     {
                         exclude : ["created_at", "updated_at"]
                     }
                 });
            const count = await db.Category.count();

            return res.status(200).json({
                ok : true,
                total : count,
                data : categories
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        } 
    },
   
    getOne : async (req, res) => {
       
        try {

            let category = await db.Category.findByPk(req.params.id);

        return res.status(200).json({
            ok : true,
            meta : {
                status : 200
            },
            total: 1,
            data : {
                category
            } 
        })
        
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        }
    }
}

module.exports = apiCategoriesControllers;