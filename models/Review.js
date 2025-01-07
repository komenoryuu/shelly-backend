const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		grade: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

const Review = mongoose.model('Review', ReviewSchema)

module.exports = { Review }
