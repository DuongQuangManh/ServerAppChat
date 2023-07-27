var db = require("../config/db")

var Friend = db.mongoose.Schema({
    user_id:{type:db.mongoose.Schema.Types.ObjectId,ref:"user"},
    friend_id:{type:db.mongoose.Schema.Types.ObjectId,ref:"user"}
},
{
    collection: "friends",
    timestamps: true,
  }
);


let friend = db.mongoose.model("friend", Friend);

module.exports = { friend };
