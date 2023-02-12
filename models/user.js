const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'Not a valid email'],
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Thought',
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});
