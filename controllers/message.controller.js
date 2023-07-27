var model = require("../models/message.model")

exports.get =async (req,res)=>{
    const id = req.params.id;
    try{
        const data =await model.mess.find({
            $or: [
              { sender_id: id },
              { receiver_id: id }
            ]
          }).populate({ path: 'sender_id', select: '_id name email phone img' }).
          populate({ path: 'receiver_id', select: '_id name email phone img' }).sort('-createdAt');

          return res.status(200).json({data:data,msg:"Thành công"})
          
    }catch(error){
        return res.status(400).json({msg:"Lỗi server"});
    }
}

exports.add = async (req,res)=>{
    try{
        if(req.method == "POST"){
            const obj = new model.mess();
            obj.sender_id = req.body.sender_id;
            obj.receiver_id = req.body.receiver_id;
            obj.message = req.body.message;

            await obj.save();
            const data =await model.mess.find({
                $or: [
                  { sender_id: req.body.sender_id },
                  { receiver_id: req.body.sender_id }
                ]
              }).populate({ path: 'sender_id', select: '_id name email phone img' }).
              populate({ path: 'receiver_id', select: '_id name email phone img' }).sort('-createdAt');
    
              return res.status(200).json({data:data,msg:"Thành công"})
        }
    }catch(error){
        return res.status(400).json({msg:"Lỗi server"});
    }
}