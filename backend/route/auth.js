import express from "express";
import {handleSignUp,handleSignIn} from "../controller/auth.js"
import {signupValidation,loginValidation} from "../middleware/AuthValidation.js"
const awtRouter=express.Router();

awtRouter.post("/register",signupValidation,handleSignUp);
awtRouter.post("/login",loginValidation,handleSignIn);


export default awtRouter;