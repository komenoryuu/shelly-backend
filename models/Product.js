const mongoose = require('mongoose')
const validator = require('validator')

const ProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
		article: {
			type: String,
			required: true,
		},
		count: {
			type: String,
			required: true,
		},
		weight: {
			type: String,
			required: true,
		},
		dimensions: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		material: {
			type: String,
			required: true,
		},
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Review',
			},
		],
	},
	{ timestamps: true },
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = { Product }
