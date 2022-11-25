const {ObjectId} = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');

module.exports = {
    //Retrieve all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.error({ message: err});
            return res.status(500).json(err);
        })
    },
    //Retrieve single Thought based on given ID
    // getSingleThought(req, res) {
    //     Thought.findById(req.params.id)
    //     .then((post) =>
    //         !Thought
    //             ? res.status(404).json({ message: 'No thought with that ID'})
    //             : res.json(thought)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'})
            }
            return res.status(200).json(thought);
        } catch(err) {
            return res.status(500).son(err)
        }
    },
    //Create new Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((post) => res.json(post))
        .catch((err) => res.status(500).json(err))
    },
    //Update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            return thought
                ? res.status(201).json(thought)
                : res.status(404).json({ message: 'No thought found with that ID'})
        } catch(err) {
            return res.status(400).json(err)
        }
    },
    //Delete thought
    //Could not figure out the syntax without switching to async await
    async deleteThought(req, res) {
        try {
        const thought = await Thought.findByIdAndDelete(req.params.id)
        return thought
            ? res.status(200).json({ message: 'Thought deleted'})
            : res.status(404).json({ message: 'No thought with that ID'})
        } catch(err) {
            return res.status(400).json(err);
        }
    },
    //Create reaction
    async createReaction(req, res) {
        try {
            const reaction = req.body
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                {$addToSet: {reactions: req.body}},
                { new: true }
            )
            if (thought) {
                return res.status(202).json(thought);
            } else {
                return res.status(404).json( {message: 'No thought found with that ID' })
            }
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    //Delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$pull:{reactions:{_id: req.params.reactionId}}},
                { new: true }
            )
            if (thought) {
                return res.status(202).json(thought);
            } else {
                return res.status(404).json({ message: 'No thought found with that ID'})
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    }
}