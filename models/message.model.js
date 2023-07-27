var db = require("../config/db")

var Message = db.mongoose.Schema({
    sender_id: { type: db.mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiver_id: { type: db.mongoose.Schema.Types.ObjectId, ref: 'user' },
    message: {type:String, required:true },
},
{
    timestamps:true,
    collection:"messages"
})

let mess = db.mongoose.model("mess",Message);

module.exports = {mess};