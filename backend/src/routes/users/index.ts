import express from "express";
import { getUserToken, getUserByEmail, updateUsers } from "@controllers/index";
import { userRouter } from "./userRouter";

export const router = express.Router().use(userRouter);

router.route("/useremail").get(getUserByEmail);
router.route("/usertoken").post(getUserToken);

router.route("/updateuser").put(updateUsers);
