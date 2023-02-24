import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register User 
export const register = async (req,res)=>           //This is the function that is called in index.js
{
    try
    {
        const {first_name,last_name,picturePath,email,password,role} = req.body;    //Get the data from the request body
        const salt = await bcrypt.genSalt();                                        //Generate salt
        const passwordHash = await bcrypt.hash(password,salt);                      //Hash the password
        const newUser = new User(                                                   //Create a new user
            {
                first_name,last_name,picturePath,email,password:passwordHash,role   //Set the data
            })
            const savedUser = await newUser.save();                                 //Save the user
            res.status(201).json(savedUser);                                        //Send the user back to the client
    }
    
    catch(error)
    {
        res.status(500).json({error:error.message});
    }

}

//Login User
export const login = async (req,res)=> 
{
    try
    {
        const {email,password} = req.body;                                          //Get the data from the request body
        const user = await User.findOne({email:email});                                   //Find the user in the database
        if(!user) return res.status(400).json({msg:"User does not exist"});         //If the user does not exist, send a message to the client

        const isMatch = await bcrypt.compare(password,user.password);               //Compare the password with the password in the database
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});      //If the password does not match, send a message to the client

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);              //Create a token
        delete user.password;                                                       //Delete the password from the user object
        res.status(200).json({token,user});                                         //Send the user and the token to the client
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}