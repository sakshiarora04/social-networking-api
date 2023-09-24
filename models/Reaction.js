const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');
// Schema to create Reaction subdocument schema
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
      //format date
      get:(createdAt)=> formatDate(createdAt)
    },
  },
  {
    toJSON: {
      getters: true,
      //remove version in json result
      transform: function (doc, ret) {
        delete ret.__v;
      } 
    },
    id: false,
  }
);

module.exports = reactionSchema;
