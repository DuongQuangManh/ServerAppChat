const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/ChatApp").catch((err) => {
  console.log("connect fail");
  console.log(err);
});
module.exports = { mongoose };
