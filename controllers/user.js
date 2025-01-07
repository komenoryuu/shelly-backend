const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const mapUser = require('../helpers/mapUser')

async function register(email, password) {
	if (!password) {
		throw new Error('Введите пароль')
	}

	const passwordHash = await bcrypt.hash(password, 10)

	const user = await User.create({ email, password: passwordHash })
	const token = generate({ id: user.id })

	return { user, token }
}

async function login(email, password) {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Такого пользователя нет')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('Пароль неверный')
	}

	const token = generate({ id: user.id })

	return { token, user }
}

module.exports = {
	register,
	login,
}
