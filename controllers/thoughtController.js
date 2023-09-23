const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought({ body }, res) {
    try {
      if (!body.userId) {
        return res
          .status(404)
          .json({ message: "Please enter the value for userId" });
      }
      const checkExistingUsername = await User.findOne({
        username: body.username,
      });
      console.log(checkExistingUsername);
      if (checkExistingUsername) {
        const thought = await Thought.create(body);
        const user = await User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        if(!user){
            return res
          .status(404)
          .json({ message: "Please enter valid userId" });
        }
        res.json(user);
      }
      else{
        return res
          .status(404)
          .json({ message: "user nor found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
