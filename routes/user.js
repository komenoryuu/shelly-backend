const express = require('express')
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user')
const hasRole = require('../middlewares/hasRole')
const auth = require('../middlewares/auth')

const router = express.Router({ mergeParams: true })

router.get('/', auth, hasRole([true]), async (req, res) => {
	const users = await getUsers()

	res.send({ data: users })
})

router.get('/roles', auth, hasRole([true]), async (req, res) => {
	const roles = getRoles()

	res.send({ data: roles })
})

router.patch('/:id', auth, hasRole([true]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	})

	res.send({ data: newUser })
})

router.delete('/:id', auth, hasRole([true]), async (req, res) => {
	await deleteUser(req.params.id)

	res.send({ error: null })
})

module.exports = router
