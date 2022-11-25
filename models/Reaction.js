const moment = require('moment');
const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Schema.Types.ObjectId
        },
        reactionBody: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format('MMM Do YYYY, h:mm:ss a');
            }
        }
    }
);

module.exports = reactionSchema