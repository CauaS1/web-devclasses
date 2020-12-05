const express = require("express");
const router = express.Router();
const Lesson = require("../lesson/Lesson")

const Authentication = require("../../middlewares/authenticate");



router.get("/study", Authentication, (req, res) => {
  const { name, photo } = req.session.account;

  Lesson.findAll().then(lesson => {
    res.render("study", { lesson, name, photo }); //Those are the names from the session
  });
});

router.get("/study/edit/:id", (req, res) => {
  const { id } = req.params;
  Lesson.findByPk(id).then(lesson => {
    if (lesson == undefined) {
      res.redirect("/study");
    } else {
      res.render("study/edit", { lesson })
    }
  });
});

router.post("/study/update", (req, res) => {
  const { id, about, category, price } = req.body;
  Lesson.update(
    { about, category, price }, {
    where: { id: id }
  }).then(() => {
    res.redirect("/study");
  })
});

router.post("/study/delete", (req, res) => {
  const { id } = req.body;
  if(id != undefined) {
    if(!isNaN(id)) { //if its a number
      Lesson.destroy({
        where: { id: id } 
      }).then(() => {
        res.redirect("/study");
      });
    } else {
      res.redirect("/study");
    }
  } else {
    res.redirect("/study");
  }
});




module.exports = router;