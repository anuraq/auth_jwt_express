const express = require("express");

const router = express.Router();

const jsonwebtoken = require("jsonwebtoken");
const User = require("./../models/user");
const auth = require("./../middleware/auth");
const bycrypt = require("bcrypt");

router.use("/auth", auth, require("./auth"));

router.post("/createUser", async (req, res) => {
	req.body.password = bycrypt.hashSync(req.body.password, bycrypt.genSaltSync(10));
	User.create(req.body).then((_) => {
	res.json({
		success: true,
		message: "User created Successfully"
	})})
	.catch((err) => {
	res.json({
		success: false,
		message: err.code === 11000 ? "User already exists" : err.message
	});
});
});

router.post("/login", (req, res) => {
	User.findOne(
		{
			username: req.body.username,
		},
		(err, user) => {
			if (err) {
				res.json({
					success: false,
					error: err,
				});
			} else if (!user) {
				res.json({
					success: false,
					error: "User not found",
				});
			} else if (user) {
				if (!bycrypt.compareSync( req.body.password , user.password)) {
					res.json({
						success: false,
						error: "Wrong password",
					});
				} else {
					const token = jsonwebtoken.sign(
						{
							username: req.body.username,
						},
						process.env.SECRET,
						{
							expiresIn: "1h",
						}
					);
					res.cookie("token", token, {
						httpOnly: true,
					});
					res.json({
						success: true,
						token,
					});
				}
			}
		}
	);
});

router.get("/getall", (req, res) => {
	User.find({}, (err, users) => {
		res.json(users);
	});
});

module.exports = router;
