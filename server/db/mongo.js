const mongoose=require('mongoose')

 const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a unique username"],
        unique: true
    }, 
     password:{
        type:String,
        required:[true,"please provide  password"],
        unique: false,select:false
    },
    email:{
        type:String,
        required:[true,"please provide a unique username"],
        unique: true
    },
    profile:{type:String}
})

const model=mongoose.model("Auth",UserSchema)
module.exports=model