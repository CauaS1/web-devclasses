const express = require("express");
const router = express.Router();
const Profile = require("./Profile");
const Authentication = require("../../middlewares/authenticate");
//const Account = require("../accounts/Accounts");

router.get("/profile", (req, res) => {
  Profile.findAll({
  }).then(information => {
    res.render("profile/index", { information })
  }).catch(err => { console.log(err)})
});

router.get("/profile/edit", (req, res) => {
  Profile.findAll().then(information => {
    res.render("profile/edit", { information });
  })
});

router.get("/profile/create", (req, res) => {
  res.render("profile/create");
})

router.post("/create", (req, res) => {
  const { name, photo, about, country } = req.body;
  Profile.create({
    name, photo, about, country
  }).then(() => {
    res.redirect("/profile");
  })
});

router.post("/edit", (req, res) => {
  const { name, photo, about, country, id} = req.body;
  Profile.update({ name, photo, about, country }, {
    where: {id: id}
  }).then(() => {
    res.redirect("/profile");
  })
})

module.exports = router;