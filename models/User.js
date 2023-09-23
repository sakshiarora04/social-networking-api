const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    email: {
      type: String,
      required: [true,'Please enter Email Address'],
      unique: true,
      lowercase:true,
      match: [/.+\@.+\..+/,
        'Please add a valid email address'
      ]
    },
   
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
      }
    },
    id: false,
  }
);
userSchema.virtual('friendCount')
.get(function(){
  return this.friends.length;
});
const User = model('user', userSchema);

module.exports = User;
