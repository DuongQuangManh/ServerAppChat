var express = require("express");
var router = express.Router();
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

var mdw = require("../middlewares/api");

var useCtrl = require("../controllers/user.controller");
var reqCtrl = require("../controllers/reqfriend.controller");
var friCtrl = require("../controllers/friend.controller");
var mesCtrl = require("../controllers/message.controller");

router.get("/user",useCtrl.get);
router.post("/user/login", useCtrl.login);
router.post("/user/reg", useCtrl.reg);
router.post("/user/update/:id", uploader.single("image"), useCtrl.update);
router.get("/user/logout",mdw.api_auth,useCtrl.logout);



router.post("/reqfriend/add",mdw.api_auth,reqCtrl.post);
router.get("/reqfriend/sended/:id",mdw.api_auth,reqCtrl.get);
router.get("/reqfriend/received/:id",mdw.api_auth,reqCtrl.getResFriend);
router.post("/reqfriend/delete",mdw.api_auth,reqCtrl.delete);
router.post("/reqfriend/deleteid",mdw.api_auth,reqCtrl.deleteForId);
router.post("/reqfriend/changestatus/:id",mdw.api_auth,reqCtrl.changestatus);



router.get("/friend/:id",friCtrl.get);
router.post("/friend/add",friCtrl.add);

router.get("/message/:id",mesCtrl.get);
router.post("/message/add",mesCtrl.add);


module.exports = router;
