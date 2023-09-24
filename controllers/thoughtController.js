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
      //   if (!body.userId) {
      //     return res
      //       .status(404)
      //       .json({ message: "Please enter the value for userId" });
      //   }
      // username should be valid and existing
      const checkExistingUsername = await User.findOne({
        username: body.username,
      });
      if (checkExistingUsername) {
        const thought = await Thought.create(body);
        const user = await User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        if (!user) {
          return res.json({ message: "thought created without user" });
        }
        res.json(user);
      } else {
        return res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought({ params }, res) {
    try {
      const deletedThought = await Thought.findOneAndRemove({
        _id: params.thoughtId,
      });
      if (!deletedThought) {
        return res.status(404).json({ message: "No such thought exists" });
      }
      const updateUser = await User.findOneAndUpdate(
        { thoughts: params.thoughtId },
        { $pull: { thoughts:{_id:params.thoughtId } } },
        { new: true }
      );
      if (!updateUser) {
        return res.status(404).json({
          message: "thought deleted, but its not associated to any user",
        });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
     try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
