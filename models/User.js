const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      isUnique: true,
      // validate: {
      //   validator: function(email) {
      //       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userSchema.email);
      //   },
      //   message: "That is not a valid email"
      // },
      required: true
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
