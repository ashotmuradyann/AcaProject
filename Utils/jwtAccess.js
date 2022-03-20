const jwt = require("jsonwebtoken");

async function jwtAccess(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Please login again");
    return;
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Please login again");
  }
}

module.exports = jwtAccess;
