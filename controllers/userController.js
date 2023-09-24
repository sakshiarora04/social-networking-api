const {User, Thought}= require('../models');

module.exports={
    async getUsers(req,res){
        try {
            //get all existing users
            const users= await User.find();
            // .populate([{path:'thoughts'},{path:'friends'}]);
            res.json(users);
        } catch (err) {            
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            //get single user with associated thoughts and friends
          const user = await User.findOne({ _id: req.params.userId })
          .populate([{path:'thoughts'},{path:'friends'}]);
    
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
            // create a new user
            const user =await User.create(req.body);
            res.json(user);
        } catch(err){            
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            //update user details
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
            //delete user from database
          const user= await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
          }  
          //delete associated thoughts to user       
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and Thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async addFriend({params}, res) {
        try {      
            //check if userId and friendId is same      
            if(params.userId===params.friendId){
                return res
                .status(404)
                .json({ message: 'User id and friend id must be different' });
            }
            // add friend to friendlist of user
         const user = await User.findOneAndUpdate(
           { _id: params.userId },
           { $addToSet: { friends: params.friendId } },
           { runValidators: true, new: true }
         );
   
         if (!user) {
           return res
             .status(404)
             .json({ message: 'No user found with that ID' });
         }
   
         res.json(user);
       } catch (err) {
        console.log(err)
         res.status(500).json(err);
       }
     },
     async removeFriend(req, res) {
        try {    
            //remove friend from firendlist of user       
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}