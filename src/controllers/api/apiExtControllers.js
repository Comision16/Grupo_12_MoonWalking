const db = require("../../database/models");

const apiExtControllers = {
    count : async (req, res) => {
        try {
            const products = await db.Product.count();
            const categories = await db.Category.count();
            const users = await db.User.count();

            return res.status(200).json({
                ok : true,
                data : {
                    products,
                    categories,
                    users
                }
            });

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        } 
    },
    getLatest: async (req, res) => {
        try
        {
            const product = await db.Product.findAll({
                include:[{association: 'images'}],
                limit: 1,
                order: [['createdAt', 'DESC']]
            });
            const category = await db.Category.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            });
            const user = await db.User.findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json({
                ok : true,
                data : {
                    product,
                    category,
                    user
                }});
        }
        catch(error)
        {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        }
    }
}

module.exports = apiExtControllers;