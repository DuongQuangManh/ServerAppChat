var model = require("../models/friendrequest.model");
exports.post =async (req,res) =>{
    try{
        if(req.method == "POST"){
            const obj = new model.friendreq();
            obj.from_user_id = req.body.from_user_id;
            obj.to_user_id = req.body.to_user_id;
            obj.status_friend = req.body.status_friend;

            await obj.save();
            const data = await model.friendreq.find({from_user_id:req.body.from_user_id})
            .populate({ path: 'from_user_id', select: '_id name email phone img' }).
            populate({ path: 'to_user_id', select: '_id name email phone img' });
            console.log("------------req-----------");
            console.log(data);
            return res.status(200).json({data,msg:"Thành công"})
        }
    }catch(error){
        return res.status(400).json({error:"Lỗi server"})
    }
}

exports.get = async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await model.friendreq.find({from_user_id:id}) .populate({ path: 'from_user_id', select: '_id name email phone img' }).
        populate({ path: 'to_user_id', select: '_id name email phone img' });
        console.log("------------req-----------");
            console.log(data);
        return res.status(200).json({data:data,msg:"Thành công"});
    }catch(error){
        return res.status(400).json({error:"Lỗi server"})
    }
}


exports.getResFriend = async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await model.friendreq.find({to_user_id:id,status_friend:false}) .populate({ path: 'from_user_id', select: '_id name email phone img' }).
        populate({ path: 'to_user_id', select: '_id name email phone img' });
        console.log("------------req-----------");
            console.log(data);
        return res.status(200).json({data:data,msg:"Thành công"});
    }catch(error){
        return res.status(400).json({error:"Lỗi server"})
    }
}

exports.delete = async (req,res)=>{
    try{
        if(req.method == "POST"){
            await model.friendreq.deleteOne({from_user_id:req.body.from_user_id,to_user_id:req.body.to_user_id});
            const data = await model.friendreq.find({from_user_id:req.body.from_user_id})
            .populate({ path: 'from_user_id', select: '_id name email phone img' }).
            populate({ path: 'to_user_id', select: '_id name email phone img' });
            console.log("------------req-----------");
            console.log(data);
            return res.status(200).json({data,msg:"Thành công"})
        }
    }catch(error){
        return res.status(400).json({error:"Lỗi server"})
    }
}

exports.deleteForId = async (req,res)=>{
    try{
        if(req.method === "POST"){
            await model.friendreq.deleteOne({_id:req.body._id});
            const data = await model.friendreq.find({to_user_id:req.body.to_user_id,status_friend:false}) .populate({ path: 'from_user_id', select: '_id name email phone img' }).
            populate({ path: 'to_user_id', select: '_id name email phone img' });
            console.log("------------req-----------");
                console.log(data);
            return res.status(200).json({data:data,msg:"Thành công"});
        }
        
    }catch(error){
        return res.status(400).json({error:"Lỗi server"})
    }
}

exports.changestatus = async (req,res)=>{
    try{ 
        const id = req.params.id;
        const obj = await model.friendreq.findOne({_id:id});
        obj.status_friend = true;
       console.log(obj)

        await obj.save();
       const data = await model.friendreq.find({to_user_id:req.body.id,status_friend:false}).populate({ path: 'from_user_id', select: '_id name email phone img' }).
       populate({ path: 'to_user_id', select: '_id name email phone img' });
       return res.status(200).json({data:data,msg:"Thành công"})
    }catch(error){
        return res.status(400).json({msg:"Lỗi server"})
    }
}