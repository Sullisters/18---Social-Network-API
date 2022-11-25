const { Schema, model } = require('mongoose');

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
        validator: function(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value);
        },
        message: "That is not a valid email"
      },
      required: true
    },
    thoughts: [
        thoughtSchema
    ],
    friends: [
        userSchema
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

postSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
