import express from "express";
import { getPostByIdUser,getAllPosts,getPost,insertPosts,updatePosts,delPosts } from "@controllers/indexPost";
import {postRouter } from "./postRouter";
 
   export const routerPost = express.Router().use(postRouter);


   routerPost.route("/posts").get(getAllPosts);
   routerPost.route("/post").get(getPost);
   routerPost.route("/delpost").delete(delPosts);
   routerPost.route("/insertpost").post(insertPosts);
   routerPost.route("/updatepost").put(updatePosts);
   routerPost.route("/postuser").get( getPostByIdUser);