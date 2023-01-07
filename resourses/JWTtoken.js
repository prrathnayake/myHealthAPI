const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(
    user,
    "212d1e1cf99eefc14589ae996b69dddc6b3238363c24f6ba4b2363fca09a88d2ca4f6f00198f0bca5dabded22b55b22f6035d36c2f2f23bf4f8b8ed2a8163aef",
    { expiresIn: "30m" }
  );
}

const verfyUser = (req, res, next) => {
  const token = req.body.accessToken;
  if (!token) return res.json("no Token");

  jwt.verify(
    token,
    "212d1e1cf99eefc14589ae996b69dddc6b3238363c24f6ba4b2363fca09a88d2ca4f6f00198f0bca5dabded22b55b22f6035d36c2f2f23bf4f8b8ed2a8163aef",
    (err, user) => {
      if (err) return res.json("not authenticated");
      req.user = user;
      next();
    }
  );
};

module.exports = {verfyUser, generateAccessToken};
