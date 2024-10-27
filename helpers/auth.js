module.exports.checkAuth = function (req, res, next) {
  const userid = req.session.userId;

  if (!userid) {
    res.redirect("/login");
  }

  next();
};
