var db = require("../config/db");

const jwt = require("jsonwebtoken"); //  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
require("dotenv").config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt"); //cài bằng lệnh:

var User = new db.mongoose.Schema(
  {
    name: { type: String, default: "Không có tên" },
    email: { type: String, default: "Không có email" },
    passwd: { type: String, required: true },
    phone: { type: String, default: "Chưa cập nhật" },
    img: { type: String, required: false },
    token: { type: String, required: false },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

User.methods.generateAuthToken = async function () {
  const user = this;
  console.log(user);
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    chuoi_ky_tu_bi_mat
  );
  // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
  user.token = token;
  await user.save();
  return token;
};

User.statics.findByCredentials = async (email, passwd) => {
 
  const user1 = await user.findOne({ email: email });

  if (!user1) {
    throw new Error({ error: "Không tồn tại user" });
  }
  const isPasswordMatch = await bcrypt.compare(passwd, user1.passwd);
  console.log(isPasswordMatch)
  if (!isPasswordMatch) {
    throw new Error({ error: "Sai password" });
  }
  return user1;
};

let user = db.mongoose.model("user", User);

module.exports = { user };
