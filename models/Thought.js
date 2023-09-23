const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(createdAt)=> new Date(createdAt).toLocaleDateString()
    },
    username: {
      type: String,
      required: true,    
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtual:true,      
    },
  }
);
thoughtSchema.virtual('reactionCount')
.get(function(){
  return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
