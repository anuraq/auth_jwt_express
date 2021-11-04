const jsonwebtoken = require("jsonwebtoken");

const authenticated = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).send({
			message: "Access denied. No token provided.",
		});
	}
	jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Access denied. Invalid token.",
			});
		}
		req.username = decoded.username;
		next();
	});
};


module.exports = authenticated;