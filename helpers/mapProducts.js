const dateFormatter = require('./dateFormatter')

module.exports = function (products) {
	if (Array.isArray(products)) {
		return products.map(product => ({
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
		}))
	} else {
		return {
			id: products._id,
			title: products.title,
			price: products.price,
			description: products.description,
			photo: `http://localhost:3001/${products.photo}`,
			categories: products.categories,
			article: products.article,
			count: products.count,
			weight: products.weight,
			dimensions: products.dimensions,
			color: products.color,
			material: products.material,
			createdAt: dateFormatter(products.createdAt),
			updatedAt: dateFormatter(products.updatedAt),
		}
	}
}
