const {User, Thought}= require('../models');

module.exports={
    async getThoughts(req,res){
        try {
            const thoughts= await Thought.find().select('-__v');
            // .populate('thoughts');
            res.json(thoughts);
        } catch (err) {            
            return res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try{
            const thought =await Thought.create(req.body);
            res.json(thought);
        } catch(err){            
            return res.status(500).json(err);
        }
    }
}