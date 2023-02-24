import express from "express";
import {getUsers} from "../controllers/users.js";                  //Import getUsers function from controllers/users.js
import  { verifyToken } from "../middleware/auth.js";              //Import verifyToken function from middleware/auth.js

const router = express.Router(); 

/* READ */
router.get("/:id",verifyToken,getUsers);                            //Get user by id
// router.get("/:id/followers",verifyToken,getUsers);                  //Get user followers 

/* Update */
//router.patch("/:id/: friendId",verifyToken, addRemoveFriend);               //Follow user

export default router;
