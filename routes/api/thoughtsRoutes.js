const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	postNewThought,
	deleteThought,
	postNewReaction,
	deleteReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts);

router.route('/:userId').post(postNewThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

router.route('/:userId/:thoughtId/reactions').post(postNewReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
