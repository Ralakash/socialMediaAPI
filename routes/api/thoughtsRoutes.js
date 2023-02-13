const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	postNewThought,
	updateThought,
	deleteThought,
	postNewReaction,
	deleteReaction,
} = require('../../controllers/thoughtsController');

router.route('/:userId').get(getThoughts).post(postNewThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thgouthId/reactions').post(postNewReaction);

router.route('/thoughtId/reactions/:reactionId').delete(deleteReaction);
