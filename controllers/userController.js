const {User, Thought}= require('../models');

module.exports={
    async getUsers(req,res){
        try {
            const users= await User.find()
            .populate('thoughts');
            res.json(users);
        } catch (err) {            
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
          .populate('thoughts');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async createUser(req,res){
        try{
            const user =await User.create(req.body);
            res.json(user);
        } catch(err){            
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!updatedUser) {
            res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async deleteUser(req, res) {
        try {
          const user= await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
          }         
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and Thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
}