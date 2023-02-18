const { Schema, model } = require('mongoose');

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
			type: Schema.Types.ObjectID,
			default: () => new Types.ObjectId(),
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
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

thoughtsSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;
