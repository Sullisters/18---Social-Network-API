const router = require('express').Router();
const thoughts = require('../../controllers/thoughtController');
// const {
//     getSingleThought,
//     getThoughts,
//     createThought,
//     updateThought,
//     deleteThought,
//     createReaction,
//     deleteReaction
// } = require('../../controllers/thoughtController');

// router.route('/').get(getThoughts).post(createThought);

// router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

router.get('/', thoughts.getThoughts);

router.get('/:id', thoughts.getSingleThought);

router.post('/', thoughts.createThought);

router.put('/:id', thoughts.updateThought);

router.delete('/:id', thoughts.deleteThought);

router.post('/:id/reactions', thoughts.createReaction);

router.delete('/:thoughtId/reactions/:reactionId', thoughts.deleteReaction)

module.exports = router;