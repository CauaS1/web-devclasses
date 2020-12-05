const express = require("express");
const router = express.Router();
const Lesson = require("./Lesson");
const Authenticate = require("../../middlewares/authenticate");

router.get("/give-class", Authenticate, (req, res) => {
  res.render("give-class");
});

router.post("/give-class/register", (req, res) => {
  const { about, category, price } = req.body;

  Lesson.create({
     category, about, price
  }).then(() => {
    res.redirect("/study");
  })
})



module.exports = router;