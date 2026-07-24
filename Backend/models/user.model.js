const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters long"],
            maxlength:[30,"First name must be at most 30 characters long"]
        },
        lastName:{
            type:String,
            required:true,
            minlength:[3,"Last name must be at least 3 characters long"],
            maxlength:[30,"Last name must be at most 30 characters long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"],
        minlength:[5,"Email must be at least 5 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,"Password must be at least 8 characters long"],
    },
    socketId:{
        type:String,
        default:null
    },
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword=async function(Password){
    return await bcrypt.compare(Password,this.password);
}

userSchema.statics.hashedPassword=async function(Password){
    return await bcrypt.hash(Password,10);
}

const UserModel=mongoose.model("User",userSchema);

module.exports=UserModel;