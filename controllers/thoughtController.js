const {User, Thought}= require('../models');

module.exports={
    async getThoughts(req,res){
        try {
            const thoughts= await Thought.find();            
            res.json(thoughts);
        } catch (err) {      
            console.log(err)      
            return res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try{
            const thought =await Thought.create(req.body);
            const user= await User.findOneAndUpdate( 
                { _id: req.body.userId },
                { $push: { thoughts:thought._id } },
                { new: true })
            res.json(user);
        } catch(err){            
            return res.status(500).json(err);
        }
    }
}