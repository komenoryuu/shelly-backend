const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (value) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
				},
				message: 'Введите корректную почту',
			},
		},
		password: {
			type: String,
			required: true,
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
)

const User = mongoose.model('User', UserSchema)

module.exports = User
