module.exports = function (dbDate) {
	const formatter = new Intl.DateTimeFormat('ru', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	})

	const date = new Date(dbDate)

	return formatter.format(date)
}
