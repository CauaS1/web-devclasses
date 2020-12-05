const Sequelize = require("sequelize");
const connection = require("../../database/db");
const Account = require("../accounts/Accounts");
const Profile = require("../profile/Profile");

const Lesson = connection.define("lessons", {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});


//Lesson.sync({ force: false });

module.exports = Lesson;