const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtsSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			min: 1,
			max: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: formatDate,
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Reactions',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const reactionSchema = new Schema(
	{
		reactionID: {
			type: ObjectId,
			default: new ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			max: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: formatDate,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const formatDate = (createdAt) => {
	return moment(createdAt).format('YYY-MM-DD');
};
userSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

module.exports = Thoughts;
