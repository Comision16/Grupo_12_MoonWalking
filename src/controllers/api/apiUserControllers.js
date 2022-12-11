const db = require("../../database/models");
const path = require('path');

module.exports = {
    listAll : async (req, res) => {
        try {
            // let users = await db.User.findAll();

            let {count, rows : users} = await db.User.findAndCountAll({
                attributes : ['id', 'firstName', 'email', 'image']
            })
            return res.status(200).json({
                ok : true,
                // meta : {
                //     total : users.length,
                // },
                total : count,
                // data : users, 
                users
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
            let id = (req.params.id); 
            const info = {
                attributes : {
                    exclude : ['password', 'createdAt','updatedAt', 'deletedAt', 'id']
                },
                include : [
                    {
                        association : 'rol',
                        attributes : ['name']
                    }
                ]
            }
        let user = await db.User.findByPk(id, info);
        return res.status(200).json({
            ok : true,
            meta : {
                status : 200
            },
            data : {
                user,
                total : 1
            } 
        })
        
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message
            })
        }
    },
    verifyEmail : async (req,res) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body)
        try {
            const {email} = req.body;
            let user = await db.User.findOne({
                where : {
                    email
                }
            })

            return res.status(200).json({
                ok : true,
                verified : user ? true : false
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : error.message
            })
        }
    },
    getImg: async (req, res) =>
    {
        return res.sendFile(path.join(__dirname, '..','..', '..', 'public','img','users', req.params.filename));
    }
}