const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {
	// Get all users
	getAllUsers(req, res) {
		User.find()
			.then((user) => {
				return res.json(user);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Get a single user
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then((user) =>
				!user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user)
			)
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// create a new user
	postNewUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	// Delete a user and remove them from the course
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) => {
				if (!user) {
					return res.status(404).json({ message: 'No such user exists' });
				}
				res.json({ message: 'User successfully deleted' });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Add an friend to a user
	addFriend(req, res) {
		console.log('You are adding an friend');
		console.log(req.body);
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user ? res.status(404).json({ message: 'No user found with that ID :(' }) : res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Remove friend from a user
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user ? res.status(404).json({ message: 'No user found with that ID :(' }) : res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
