const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')
const Mongoose = require('mongoose')

const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
      validate: {
        validator: value => {
          return emailValidator.test(value)
        },
        message: 'Not a valid email address'
      },
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
