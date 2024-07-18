require("dotenv").config();

module.exports = {
  userEmail: process.env.USER_EMAIL,
  password: process.env.PASSWORD,
  nodeURL: process.env.NODE_URL,
};
