module.exports = function (user) {
	return {
		id: user.id,
		email: user.email,
		isAdmin: user.is_admin,
	}
}
