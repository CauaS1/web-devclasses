function authPermission(req, res, next) {
  if(req.session.account != undefined) {
    next()
  } else {
    res.redirect("/login");
  }
}

module.exports = authPermission;