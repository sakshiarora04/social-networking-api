const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      default: 'No reaction received',
    },
    username: {
      type: String,
      required: true,      
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(createdAt)=> new Date(createdAt).toLocaleDateString()
    },
  },
  {
    toJSON: {
      getters: true,
      transform: function (doc, ret) {
        delete ret.__v;
      } 
    },
    id: false,
  }
);

module.exports = reactionSchema;
