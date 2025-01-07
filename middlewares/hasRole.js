module.exports = function (isAdmin) {
	return (req, res, next) => {
		if (isAdmin !== req.user.isAdmin) {
			res.send({ error: 'Доступ запрещён' })

			return
		}

		next()
	}
}
