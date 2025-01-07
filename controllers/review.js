const { Review } = require('../models/Review')
const { Product } = require('../models/Product')

async function addReview(productId, review) {
	const newReview = await Review.create(review)

	await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview } })

	await newReview.populate('user')

	return newReview
}

async function deleteReview(productId, reviewId) {
	await Review.deleteOne({ _id: reviewId })

	await Product.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } })
}

module.exports = {
	addReview,
	deleteReview,
}
