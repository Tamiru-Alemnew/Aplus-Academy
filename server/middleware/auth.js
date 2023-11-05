const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);

    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied!!" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied!!" });

    req.email = verified.email;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = auth;