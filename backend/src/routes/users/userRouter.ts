import express from "express";

import {updateUsersProfile,getUserToken,getUserByEmail,getAllUsers,getUser,delUsers,insertUsers,updateUsers } from "@controllers/index";


const userRouter = express.Router();


userRouter.route("/users").get(getAllUsers);
userRouter.route("/user").get(getUser); 
userRouter.route("/useremail").get(getUserByEmail);
userRouter.route("/usertoken").post(getUserToken);
userRouter.route("/deluser").delete(delUsers);
userRouter.route("/insertuser").post(insertUsers);
userRouter.route("/updateuser").put(updateUsers);
userRouter.route("/updateuserprofile").put(updateUsersProfile);
export { userRouter};
