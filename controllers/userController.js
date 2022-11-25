const {ObjectId} = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // getSingleUser(req, res) {
    //     User.findOne({ _id: req.params.userId })
    //     .select('-__v')
    //     .then((user) => 
    //         !user
    //             ? res.status(404).json({ message: 'No user with that ID'})
    //             : res.json(user)
    //     )
    //     .catch((err) => res.status(500).json(err));
    // },
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json({ message: 'No user found with that Id'})
            }
            return res.status(200).json(user);
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.thoughtId },
                    { $addToSet: { users: user._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(200).json({ message: 'User created' })
                    : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // updateUser(req, res) {
    //     User.put(req.body)
    //     .then((user) => {
    //         return User.findByIdAndUpdate(
    //             req.params.id,
    //             req.body,
    //             { new: true }
    //         )
    //     })
    //     .then((user) =>
    //         user
    //         ? res.status(201).json({ message: 'User updated'})
    //         : res.json('Updated the user')
    //     )
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json(err)
    //     })
    // },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            return res.status(201).json(user);
        } catch(err) {
            return res.status(400).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                await Thought.deleteMany({
                    username: user.username
                });
                return res.status(201).json({ message: 'User deleted'});
            }
            return res.status(404).json({ message: 'No user found with that ID'});
        } catch(err) {
            return res.status(400).json(err)
        }
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            {$addToSet: {friends: req.params.friendId}},
            { new: true }
        )
        if (User) {
            return res.status(201).json(User)
        }
        return res.status(404).json({ message: 'No user found with that ID'})
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            {$pull: {friends: req.params.friendId}},
            { new: true }
        )
        if (User) {
            return res.status(201).json(User)
        } 
        return res.status(404).json({ message: 'No user found with that ID'})
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    }
}