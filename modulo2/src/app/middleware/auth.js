module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log(req.session);
    res.locals.user = req.session.user;
    return next();
  }

  return res.redirect("/");
};
