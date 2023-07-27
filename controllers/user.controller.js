var model = require("../models/user.model");
const bcrypt = require("bcrypt");
var fs = require("fs");
var path = require("path");

exports.reg = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const user = new model.user(req.body);

    user.passwd = await bcrypt.hash(req.body.passwd, salt);

    const token = await user.generateAuthToken();

    let new_u = await user.save();

    return res.status(201).json({ data: new_u, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }

  // res.json( {status: 1, msg: 'Trang đăng ký'});
};

exports.login = async (req, res, next) => {
  try {
    
    const user = await model.user.findByCredentials(
      req.body.email,
      req.body.passwd
    );
   
    if (!user) {
      return res.status(401).json({ error: "Sai thông tin đăng nhập" });
    }
    // đăng nhập thành công, tạo token làm việc mới

    const token = await user.generateAuthToken();
    console.log(user);
    return res.status(200).json({ data: user, token: token });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req,res)=>{
  let url = "";
  const id = req.params.id;
  if (req.method == "POST" && req.file) {
    console.log(__dirname);
    const userFolderPath = path.join(__dirname, "../public/uploads", id);
    console.log(userFolderPath)
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);
    }

    // Di chuyển ảnh vào thư mục của người dùng
    try {
      fs.renameSync(
        req.file.path,
        path.join(userFolderPath, req.file.originalname)
      );
      url = `${id}/${req.file.originalname}`;
    } catch (error) {
      console.log(error);
    }
  }
  
  console.log(id);
  const user =await model.user.findOne({_id:id});
  user.img = url;
  user.name = req.body.name;
  user.phone = req.body.phone;
   const new_us =await user.save();
   console.log("========")
   console.log(new_us);
   console.log(new_us.token);
  return res.status(200).json({data:new_us,token:new_us.token});
};

exports.get = async (req,res) =>{
  try{
    // '_id name email phone img -passwd -token'
    const data =await model.user.find({},{_id:1,name:1,email:1,phone:1,img:1});
    console.log(data)
    return res.status(200).json({data:data});
  }catch{
    return res.status(400).json({error:"Lỗi"})
  }
}

exports.logout = async (req, res, next) => {
  try {
    console.log(req.user);
    // req.user.generateAuthToken();
    req.user.token = null; //xóa token
    await req.user.save();
    return res.status(200).json({ msg: "Đăng xuất thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
  //    res.json( {status: 1, msg: 'Trang đăng xuất'});
};