const express = require("express");
const app = express();
const connection = require("./database/db");
const bodyParser = require("body-parser");
const session = require("express-session");

const accountController = require("./models/accounts/AccountsController");
const studyController = require("./models/study/StudyController");
const lessonController = require("./models/lesson/LessonController");

//View Engine
app.set("view engine", "ejs");
app.use(express.static("public"))

//Sessions
app.use(session({
  secret: "okopidjkiwaeudvbmcniosg",
  cookie: { maxAge: 7200000 }, //2 HOURS, isso é o tempo que os dados ficam salvo, e quando acabar, ele vai fazer logout (nesse caso)
  resave: true,      //se reiniciar o server, as sessions são apagadas
  saveUninitialized: true
}))

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
  .authenticate()
  .then(() => console.log("It's working!"))
  .catch(() => console.log('Error'))


app.use("/", accountController);
app.use("/", studyController);
app.use("/", lessonController);


//Routes
app.get("/", (req, res) => {
  res.render("index")
});

// Session tests
/*app.get("/session", (req, res) => {
  req.session.teste = "It's working";
  res.send("Session created");
})

app.get("/test", (req, res) => {
  res.json({
    teste: req.session.teste,
  });
})*/


app.listen(5500);