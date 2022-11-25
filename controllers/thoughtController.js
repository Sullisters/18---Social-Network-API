const { Thought } = require('../models');

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
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((post) =>
            !Thought
                ? res.status(404).json({ message: 'No thought with that ID '})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Create new Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((post) => res.json(post))
        .catch((err) => res.status(500).json(err))
    },
    //Create new Reaction
    createReaction(req, res) {
        Thought.create(req.body)
        .then((post) => res.json(post))
        .catch((err) => res.status(500).json(err))
    }
};