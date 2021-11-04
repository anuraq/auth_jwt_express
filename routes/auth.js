const auth = require("express").Router();

const User = require("../models/user");

auth
	.get("/", (req, res) => {
		res.json({
			message: "Welcome to the auth route",
			success: true,
		});
	})
	.get("/myinfo", async (req, res) => {
		const user = await User.findOne({ username: req.username });
		res.json({
			message: "Welcome to the auth route",
			success: true,
			data: user,
		});
	})
	.get("/gettodos", async (req, res) => {
		const user = await User.findOne({ username: req.username });
		res.json({
			message: `Todos fetched : ${user.todos.length}`,
			success: true,
			data: user.todos,
		});
	})
	.post("/updatetodos", async (req, res) => {
		if (req.body.todos) {
			User.updateOne({ username: req.username }, { $set : {todos: req.body.todos} })
			.then((_) => {
				res.json({
					message: "Todos updated",
					success: true,
				});
			})
			.catch((err) => {
				res.json({
					message: `Error ${err.name}`,
					success: false,
					// data: err,
				});
			});
		} else {
			res.json({
				message: "Todos not found in request body",
				success: false,
			});
		}
	});

module.exports = auth;
