import React, { useState, useEffect } from "react";
import { MoreVert } from "@mui/icons-material";
import Axios from "axios";
import jwt_decode from "jwt-decode";

import "./post.css";

interface Comment {
  id: number;
  content: string;
}

interface PostData {
  id: number;
  title: string;
  photo: string;
  commentaire: Comment[];
}
interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  userphone: string;
  post: string;
}

export default function Post(): JSX.Element {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [postData, setPostData] = useState<PostData[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const commentHandler = () => {
    setIsClicked(!isClicked);
  };
  const viewPostHandler = (post: PostData) => {
    setSelectedPost(post);
    setIsClicked(true);
  };

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const token = localStorage.getItem("token");
  const user = jwt_decode(token!) as UserProfile;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:5100/api/v2/postuser?id_user=${user.id}`
        );
        if (response.status === 200) {
          const data: PostData[] = response.data;
          setPostData(data);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [user.id]);

  return (
    <div className="post">
      {postData.map((item) => (
        <div className="postWrapper" key={item.id} onClick={() => viewPostHandler(item)}>

          
          <div className="postTop">
            <div className="postTopLeft">
                <img
                className="postProfileImg"
                src="src/assets/pers.jpg"
                alt=""/>
                <span className="postUsername"/>
                <span className="postDate">{user.username}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
        </div>
        <div className="postCenter">
            <span className="postText">{item.title}</span>
            <img className="postImg" src={item.photo} alt="" />
        </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="src/assets/like.png"
                onClick={() => (selectedPost && selectedPost.id === item.id ? likeHandler() : null)}
                alt=""
              />
                <span className="postLikeCounter">{like} people like it</span>
            </div>
              <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={ commentHandler} 
              >
                comments
              </span>
            </div>
          </div>

          {selectedPost && selectedPost.id === item.id  ? (
            <div className="postBottomComment">
              <input
                type="text"
                placeholder="write your comment"
                className="CommentInput"
              />
              {Object.values(item.commentaire).map((comment)=> (
                <div key={comment.id} className="postBottomCommentx">
                    <img
                      className="postProfileImg"
                      src="src/assets/pers.jpg"
                      alt=""
                    />
                    <span className="Comment">{comment.content}</span>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}
