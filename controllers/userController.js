const {User, Thought}= require('../models');

module.exports={
    async createUser(req,res){
        try{
            const user =await User.create(req.body);
            res.json(user);
        } catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
}