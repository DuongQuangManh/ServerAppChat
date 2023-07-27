var db = require("../config/db")

var Friendreq = db.mongoose.Schema({
    from_user_id:{type:db.mongoose.Schema.Types.ObjectId,ref:"user"},
    to_user_id:{type:db.mongoose.Schema.Types.ObjectId,ref:"user"},
    status_friend:{type:Boolean,default:false}
  },
  {
    collection: "friendsrequest",
    timestamps: true,
  }
);


let friendreq = db.mongoose.model("friendreq", Friendreq);

module.exports = { friendreq };
