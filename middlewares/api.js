const jwt = require("jsonwebtoken");
const model = require("../models/user.model");
require("dotenv").config(); // su dung thu vien doc file env
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;

const api_auth = async (req, res, next) => {
  console.log("co vao check token");
  let header_token = req.header("Authorization");

  if (typeof header_token == "undefined") {
    console.log("đã bị bắt vì k có token");
    return res.status(403).json({ msg: "Không xác định token" });
  }

  const token = header_token.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, chuoi_ky_tu_bi_mat);
    console.log(data);
    const user = await model.user.findOne({ _id: data._id, token: token });
    if (!user) {
      console.log("đã bị bắt vì k có k xác định được người dùng");

      throw new Error("Không xác định được người dùng");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    console.log("đã bị bắt vì k có nhảy vào catch");

    res.status(401).send({ error: error.message });
  }
};
module.exports = { api_auth };
