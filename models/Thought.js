const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
        {
            reactionId: {
                type: Schema.Types.ObjectId,
                default: new ObjectId
            },
            reactionBody: {
                type: String,
                required: true,
                maxLength: 280
            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                // GETTER to format the timestamp
                get: toDateString(createdAt)
            }
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

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;