var model = require("../models/friend.model")

exports.get =async (req,res) =>{
    try{
        const id = req.params.id;
        const data = await model.friend.find({user_id:id},{_id:1,name:1,email:1,phone:1,img:1}).populate("user_id","friend_id")
        .populate({ path: 'user_id', select: '_id name email phone img' }).
        populate({ path: 'friend_id', select: '_id name email phone img' });;
        return res.status(200).json({data:data,msg:"Thành công"});
    }catch(error){
        console.log(error);
        return res.status(400).json({msg:"Lỗi server"})
    }
}

exports.add = async (req,res)=>{
    console.log(req.body)
    try{
        if(req.method == "POST"){
            const obj = new model.friend();
            obj.user_id = req.body.user_id;
            obj.friend_id = req.body.friend_id;

            await obj.save();
            const data = await model.friend.find({user_id:req.body.user_id},{_id:1,name:1,email:1,phone:1,img:1}).populate("user_id","friend_id")
            .populate({ path: 'user_id', select: '_id name email phone img' }).
            populate({ path: 'friend_id', select: '_id name email phone img' });;
            return res.status(200).json({data:data,msg:"Thành công"})
        }
    }catch(error){
        return res.status(400).json({msg:"Lỗi server"})
    }
}