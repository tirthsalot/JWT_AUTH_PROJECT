import UserController from "../controller/UserController.js";
import auth from "../middlewares/auth.js";
import express from "express";


const router = express.Router();


router.post("/add",UserController.add);

router.get("/getAllUser", UserController.getAllUser);

router.post("/login", UserController.login);

router.post("/authLogin",auth,UserController.authLogin);

router.delete("/deleteUser",UserController.deleteUser);




export default router;