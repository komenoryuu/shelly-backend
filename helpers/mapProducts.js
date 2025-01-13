const dateFormatter = require('./dateFormatter')

module.exports = function (products) {
	return products.map(product => {
		return {
			id: product._id,
			title: product.title,
			price: product.price,
			description: product.description,
			photo: `http://localhost:3001/${product.photo}`,
			categories: product.categories,
			article: product.article,
			count: product.count,
			weight: product.weight,
			dimensions: product.dimensions,
			color: product.color,
			material: product.material,
			createdAt: dateFormatter(product.createdAt),
			updatedAt: dateFormatter(product.updatedAt),
		}
	})
}
