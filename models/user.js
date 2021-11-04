const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		indexes: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	todos: [
		{
			_id:  Number,
			data: String,
			status: String,
		},
	],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
