import express from "express";

import { getPostByIdUser,getAllPosts,getPost,insertPosts,updatePosts,delPosts } from "@controllers/indexPost";


const postRouter = express.Router();


postRouter.route("/posts").get(getAllPosts);
postRouter.route("/post").get(getPost);
postRouter.route("/delpost").delete(delPosts);
postRouter.route("/insertpost").post(insertPosts);
 postRouter.route("/updatepost").put(updatePosts);
 postRouter.route("/postuser").get( getPostByIdUser);
export { postRouter};
