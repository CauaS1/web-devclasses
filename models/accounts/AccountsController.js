const express = require("express");
const router = express.Router();
const Account = require("./Accounts");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const Authenticate = require("../../middlewares/authenticate");

router.get("/create-account", (req, res) => {
  res.render("accounts/create-account");
});

router.get("/login", (req, res) => {
  res.render("accounts/login");
});


router.get("/profile", Authenticate, (req, res) => {
  const session = req.session.account.email; 
  Account.findOne({
    where: { email: session }
  }).then(information => {
    res.render("profile/index", { information })
  })

  // Account.findAll({
  // }).then(information => {
  //   res.render("profile/index", { information })
  // }).catch(err => { console.log(err)})
});

router.get("/profile/edit", Authenticate, (req, res) => {
  const session = req.session.account.name; 
  Account.findOne({
    where: { name: session }
  }).then(information => {
    res.render("profile/edit", { information });
  })
});

router.post("/profile/edit", (req, res) => {
  const { id, name, about, photo } = req.body;
  Account.update(
    { name, about, photo }, {
    where: { id: id }
  }).then(() => {
    res.redirect("/profile")
  })
})


/*POST METHOD*/
router.post("/register", (req, res) => {
  const { name, photo, about, email, password } = req.body;

  Account.findOne({ where: { email: email } }).then(account => {
    if (account == undefined) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      Account.create({
        name, photo, about, email, password: hash
      }).then(account => {
        res.redirect("/login");
        // res.redirect("/profile/create");
      })
    } else {
      res.redirect("/create-account");
    }
  }).catch(error => {
    res.redirect("/create-account")
    console.log("It doen't working" + error);
  })
});

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  Account.findOne({ where: { email: email } }).then(account => {
    if(account != undefined) {
      var correct = bcrypt.compareSync(password, account.password);
      if(correct) {
        req.session.account = {
          id: account.id,
          email: account.email,
          name: account.name,
          photo: account.photo
        } 
        res.redirect("/study");
      } else {
        res.redirect("/login")
      }
    } else {
      res.redirect("/login");
    }
  })
});

router.get("/logout", (req, res) => {
  req.session.account = undefined;
  res.redirect("/");
})

module.exports = router;
