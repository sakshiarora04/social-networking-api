const {User, Thought}= require('../models');

module.exports={
    async getUsers(req,res){
        try {
            const users= await User.find().select('-__v');
            // .populate('thoughts');
            res.json(users);
        } catch (err) {            
            return res.status(500).json(err);
        }
    },
    async createUser(req,res){
        try{
            const user =await User.create(req.body);
            res.json(user);
        } catch(err){            
            return res.status(500).json(err);
        }
    }
}