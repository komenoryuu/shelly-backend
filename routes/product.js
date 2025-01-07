const express = require('express')
const { IncomingForm } = require('formidable')
const { fileTypeFromFile } = require('file-type')
const { getProducts, getProduct, addProduct } = require('../controllers/product')
const { addReview, deleteReview } = require('../controllers/review')
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/hasRole')
const mapReviews = require('../helpers/mapReviews')
const router = express.Router({ mergeParams: true })

// Products
router.get('/', async (req, res) => {
	const { products, lastPage } = await getProducts(
		req.query.search,
		req.query.limit,
		req.query.page,
	)

	res.send({ data: { products, lastPage } })
})

// One product
router.get('/:id', async (req, res) => {
	const product = await getProduct(req.params.id)

	res.send({ data: product })
})

// New product
router.post('/create', auth, async (req, res) => {
	const form = new IncomingForm({ uploadDir: 'uploads', keepExtensions: true })

	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(400).send({ error: 'Ошибка при обработке формы', details: err })
		}

		const fileKey = Object.keys(files)[0]
		const imageFile = files[fileKey]

		if (!imageFile) {
			return res.status(400).send({ error: 'Файл изображения обязателен' })
		}

		const filePath = imageFile.path
		const fileType = await fileTypeFromFile(filePath)

		if (!fileType || !fileType.mime.startsWith('image/')) {
			fs.unlinkSync(filePath)
			return res.status(400).send({ error: 'Некорректный файл изображения' })
		}

		try {
			const newProduct = await addProduct({
				...fields,
				photo: filePath,
			})

			res.status(201).send({ data: newProduct })
		} catch (error) {
			fs.unlinkSync(filePath)
			res.status(500).send({ error: 'Ошибка при сохранении продукта', details: error })
		}
	})
})

// New review
router.post('/:id/reviews', auth, async (req, res) => {
	const newReview = await addReview(req.params.id, {
		user: req.body.user,
		// user: req.user.id,
		grade: req.body.grade,
		content: req.body.content,
	})

	res.send({ data: mapReviews(newReview) })
})

// Delete review
router.delete('/:productId/reviews/:reviewId', auth, isAdmin([true]), async (req, res) => {
	await deleteReview(req.params.productId, req.params.reviewId)

	res.send({ error: null })
})

module.exports = router
