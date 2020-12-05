const Sequelize = require("sequelize");
const connection = require("../../database/db");
const Account = require("../accounts/Accounts");
const Lesson = require("../lesson/Lesson") 


const Profile = connection.define("profiles", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Profile.sync({ force: false })

//module.exports = Profile;