const { Thought, User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.thoughtId },
                    { $addToSet: { users: user._id } },
                    { new: true }
                );
                return Reaction.findOneAndUpdate(
                   { _id: req.body.reactionId },
                   { $addToSet: { reactions: reaction._id } },
                   { new: true } 
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought created, but found no User with that ID' })
                    : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    }
}