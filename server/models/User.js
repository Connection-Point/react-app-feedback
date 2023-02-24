import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(                  //Create User schema
    {
        first_name:{
            type:String,
            require: true,
            min:3,
            max:40,
        },
        last_name:{
            type:String,
            require: true,
            min:3,
            max:40,
        },
        email:{
            type:String,
            require: true,
            unique: true,
            max:50,
        },
        password:{
            type:String,
            require: true,
            min:6,
            max:20,
        },
        picturePath:{
            type:String,
            default:"",
        },
        role:{
            type: Array,
            default: ["user"],
        },


    },{timestamps:true});

    const User = mongoose.model("User",UserSchema);    //Create User model
    export default User;                               //Export User model
 