import express from "express";
import {getUserToken,getAllUsers,getUser,delUsers,insertUsers,updateUsers, getUserByEmail } from "@controllers/index";
import {userRouter } from "./userRouter";
 
   export const router = express.Router().use(userRouter);

router.route("/users").get(getAllUsers);
router.route("/user").get(getUser);
router.route("/useremail").get(getUserByEmail);
router.route("/usertoken").post(getUserToken);

router.route("/deluser").delete(delUsers);
router.route("/insertuser").post(insertUsers);
router.route("/updateuser").put(updateUsers);