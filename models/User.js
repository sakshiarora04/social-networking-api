const { Schema, model } = require('mongoose');

// Schema to create a User model
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
   // referencing to thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
   // referencing to friend model
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
      //remove version in json result
      transform: function (doc, ret) {
        delete ret.__v;
      }
    },
    id: false,
  }
);
//virtual to create friends count property
userSchema.virtual('friendCount')
.get(function(){
  return this.friends.length;
});
const User = model('user', userSchema);

module.exports = User;
