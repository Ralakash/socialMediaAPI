const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		Thoughts.find()
			.then((thought) => {
				return res.json(thought);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Get a single thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought)
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// create a new thought
	postNewThought(req, res) {
		Thought.create(req.body)
			.then((thought) => res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
	// Delete a thought and remove them from the course
	deleteThought(req, res) {
		Thought.findOneAndRemove({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: 'No such thought exists' });
				}
				res.json({ message: 'Thought successfully deleted' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Add an reaction to a thought
	postNewReaction(req, res) {
		console.log('You are adding an reaction');
		console.log(req.body);
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.params.reactionId } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought found with that ID :(' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Remove reaction from a thought
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: req.params.reactionId } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought found with that ID :(' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};
