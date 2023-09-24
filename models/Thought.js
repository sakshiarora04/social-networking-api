const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate=require("../utils/formatDate")

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
      get:(createdAt)=> formatDate(createdAt)
    },
    username: {
      type: String,
      required: true,    
    },
    //subdocument
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtual:true, 
      //remove version in json result
      transform: function (doc, ret) {
        delete ret.__v;
      }  
    },
    id: false,
  }
);
//virtual to create reaction count property
thoughtSchema.virtual('reactionCount')
.get(function(){
  return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
