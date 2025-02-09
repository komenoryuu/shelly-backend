const dateFormatter = require('./dateFormatter')

module.exports = function (review) {
	return {
		user: review.user.id,
		grade: review.grade,
		content: review.content,
		createdAt: dateFormatter(review.createdAt),
	}
}
