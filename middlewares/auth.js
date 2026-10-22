import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";
import userModel from "../model/UserModel.js";

const auth = async(req,res,next)=>{

    try {

        const authHeader = await req.header("Authorization");


        if(!authHeader){
            return next(new HttpError("auth header is required",404));
        }

        const token = authHeader.replace("Bearer ","")


        const decode = jwt.verify(token,process.env.JWT_SECRET);


        if(!decode){
            return next(new HttpError("failed verify token",400))
        }

        const user = await UserModel.findOne({_id:decode._id,"tokens.token":token,});

        const userById = await userModel.findById(decode._id);


        if(!user){
            return next(new HttpError("unauthorize access",401))
        }


        req.user = user;
        req.token = token;

        next();
        
    } catch (error) {
            next(new HttpError(error.message))

    }

}

export default auth;