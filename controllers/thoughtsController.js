const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Reactions } = require('../models');

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
		Thoughts.findOne({ _id: req.params.thoughtId })
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
		let thoughtobj = { ...req.body, userId: req.params.userId };
		Thoughts.create(thoughtobj)
			.then((thought) => {
				return User.findOneAndUpdate(
					{ _id: req.params.userId },
					{ $push: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((user) => {
				if (!user) {
					return res.status(404).json({ message: 'Thought created but no user with this id!' });
				}

				res.json({ message: 'Thought successfully created!' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	// Delete a thought and remove them from the course
	deleteThought(req, res) {
		Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					return res.status(404).json({ message: 'No such thought exists' });
				}
				return User.findOneAndUpdate(
					{ thoughts: req.params.thoughtId },
					{ $pull: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((user) => {
				if (!user) {
					return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
				}

				res.json({ message: 'Thought successfully deleted!' });
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
		let reactionobj = { ...req.body, userId: req.params.userId };
		Reactions.create(reactionobj)
			.then((reaction) => {
				Thoughts.findOneAndUpdate(
					{ _id: req.params.thoughtId },
					{ $addToSet: { reactions: reaction._id } },
					{ runValidators: true, new: true }
				).then((thought) =>
					!thought
						? res.status(404).json({ message: 'No thought found with that ID :(' })
						: res.json(thought)
				);
			})
			.catch((err) => res.status(500).json(err));
	},
	// Remove reaction from a thought
	deleteReaction(req, res) {
		Reactions.findOneAndRemove({ _id: req.params.reactionId })
			.then((reaction) => {
				if (!reaction) {
					return res.status(404).json({ message: 'No such reaction exists' });
				}
				return Thoughts.findOneAndUpdate(
					{ reactions: req.params.reactionId },
					{ $pull: { reactions: reaction._id } },
					{ new: true }
				);
			})
			.then((user) => {
				if (!user) {
					return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
				}

				res.json({ message: 'Thought successfully deleted!' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
