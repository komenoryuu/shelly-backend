const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router({ mergeParams: true })

const filesPath = path.join(__dirname, '../data/files')

// Md files
router.get('/files/:fileName', async (req, res) => {
	const { fileName } = req.params

	try {
		const filePath = path.join(filesPath, fileName)

		if (!fs.existsSync(filePath)) {
			return res.status(404).send({ error: 'Файл не найден.' })
		}

		const content = fs.readFileSync(filePath, 'utf-8')
		res.send({ content })
	} catch (error) {
		res.status(500).send({ error: 'Не удалось загрузить файл.' })
	}
})

module.exports = router
