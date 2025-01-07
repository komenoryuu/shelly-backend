const { Product } = require('../models/Product')

async function getProducts(search = '', limit = 6, page = 1) {
	const [products, count] = await Promise.all([
		Product.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ date: -1 }),
		Product.countDocuments({ title: { $regex: search, $options: 'i' } }),
	])

	return { products, lastPage: Math.ceil(count / limit) }
}

function getProduct(id) {
	return Product.findById(id).populate({
		path: 'reviews',
		populate: 'user',
	})
}

async function addProduct(product) {
	const newProduct = await Product.create(product)

	await newPost.populate({
		path: 'reviews',
		populate: 'user',
	})

	return newProduct
}

function deleteProduct(id) {
	return Post.deleteOne({ _id: id })
}

module.exports = {
	getProducts,
	getProduct,
	addProduct,
	deleteProduct,
}
