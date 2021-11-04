require('dotenv').config()
const express = require("express");
const router = require("./routes/index");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const User = require("./models/user");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongoose connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

// test database connection
// User.create({
// 	name: "test",
// 	username: "admin",
// 	password: "admin",
// });

// Router
app.use("/", router);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// (async () => {
// 	const r = await User.find({});
// 	console.log(r);
// })();
