// Description: This is the main file of the project
//Import modules
import express from "express";   
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();                                                            //Initialize dotenv
const app = express();                                                     //Initialize express
app.use(express.json);                                                    //Initialize express json
app.use(helmet());                                                       //Initialize helmet
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));      //Initialize helmet cross origin resource policy
app.use(morgan("common"));                                               //Initialize morgan
app.use(bodyParser.json({limit:"30mb",extended:true})); 
app.use(bodyParser.urlencoded({limit:"30mb",extended:true})); 
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets'))); //Initialize static folder

/*FILE STORAGE*/
const STORAGE = multer.diskStorage({
    destination:(req,file,cb)=>{                                          //Set destination
        cb(null,"public/assets");
    },
    filename:(req,file,cb)=>{                                            //Set filename
        cb(null,file.originalname);
    }
});

const upload = multer({storage:STORAGE}); 

/*ROUTES FILES*/
app.post("/auth/register", upload.single("picture"),register);            //Register route
app.post("/posts", verifyToken, upload.single("picture"), createPost);              //Create post route

/* ROUTES */
app.use("/auth", authRoutes);                                              //Auth routes
app.use("/users", userRoutes);                                             //User routes"
app.use("/posts", postRoutes);                                             //Post routes

/*Mongooes Connection*/
const PORT = process.env.PORT || 5001;                                   //Initialize port
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,            //Initialize mongoose and connect to database
    useUnifiedTopology:true}) 
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`))) //Listen to port and display log message
    .catch((error)=>console.log(error.message));