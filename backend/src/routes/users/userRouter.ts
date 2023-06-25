import express from "express";

import {
    updateUsersProfile,
    getUserToken,
    getUserByEmail,
    updateUsers,
} from "@controllers/index";

const userRouter = express.Router();

userRouter.route("/useremail").get(getUserByEmail);
userRouter.route("/usertoken").post(getUserToken);
userRouter.route("/updateuser").put(updateUsers);
userRouter.route("/updateuserprofile").put(updateUsersProfile);
export { userRouter };
