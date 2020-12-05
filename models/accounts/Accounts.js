const Sequelize = require("sequelize");
const connection = require("../../database/db");

const Lesson = require("../lesson/Lesson");


const Account = connection.define("accounts", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  about: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});



//Account.sync({ force: false });

module.exports = Account;