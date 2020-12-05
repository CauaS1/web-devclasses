function profileInfoAlreadyCreated(req, res, next) {
  if(req.account.name != undefined) {
    next()
    console.log(req.account)
  } else {
    console.log(req.account)
    res.redirect("/profile/create")
  }
}

