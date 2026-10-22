import HttpError from "../middlewares/HttpError.js";

import userModel from "../model/UserModel.js";

const add = async (req,res,next) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new userModel({
            name,
            email,
            password,
        });

        await newUser.save();
        res
        .status(201)
        .json({success: true, message: "user added successfully", newUser});


        
    } catch (error) {
        return next(new HttpError(error.message,500));
        
    }
};
const getAllUser = async (req,res,next)=>{
    try {
        const users = await userModel.find();

        if(users.length === 0) {
            return next(new HttpError("no user data found",404));
        }

        res.status(200).json({
            success:true,
            message:"All User Data Fetched Successfully",
            users,
        });

        
    } catch (error) {
        return next(new HttpError(error.message,500));
        
    }

};
const login = async(req,res,next)=> {
    try {
        const {email, password} = req.body;
        const user = await userModel.findByCredential(email,password);
        
        
        
        if(!user) {
            next(new HttpError(error.message,500));
        }
        const token = await user.generateAuthToken();

     res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
      token,
    });
        
    } catch (error) {
        return next(new HttpError(error.message,500));
        

    }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    res
      .status(200)
      .json({ success: true, message: "auth login successfully", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));    
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;

    await user.deleteOne(user);

    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};



export default {
  add,
  getAllUser,
  login,
  authLogin,
  deleteUser,


}