const Sequelize = require("sequelize");
const connection = new Sequelize("devclasses", "root", "123456", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;