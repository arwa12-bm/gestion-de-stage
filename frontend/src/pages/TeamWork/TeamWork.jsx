import "./TeamWork.css";
import { MoreVert } from "@mui/icons-material";
import Axios  from "axios";
import jwt_decode from "jwt-decode";
import { useState,useEffect } from "react";
import NavigationMenuProfile from "../../components/sidebar/NavigationProfile";
import Header from '../../components/header/Header';

export default function TeamWork() {
  const [like,setLike] = useState(0)
  const [isLiked,setIsLiked] = useState(false)


  
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  
const token =localStorage.getItem('token')
const user = jwt_decode(token);
console.log(user.id);
const[postData,setPostData]=useState([]);


useEffect( async () => {
  const response = await fetch(`http://localhost:5100/api/v2/posts`);
if(response.ok){
   const data = await response.json();
   setPostData([...data])
  console.log("DATAAAA",data)
}

},[])

console.log("POST",postData)
const post = user.post
console.log(post)

console.log(typeof post)
  return (
   
    <>
    <Header />
    <div className="TeamPost">
             <NavigationMenuProfile/>

    {postData.map((item) => (
      <div className="postWrapper" key={item.id}>
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="src/assets/pers.jpg"
            //   src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className="postDate">{user.username}</span>
            {/* <span className="postDate">{post.date}</span> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {/* <span className="postText">{post?.desc}</span> */}
          <span className="postText">{item.title}</span>
          <img className="postImg" src={item.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
            <span className="postLikeCounter"> people like it</span>
          </div>
          <div className="postBottomRight">
          <span className="postCommentText"> comments</span>
            {/* <span className="postCommentText">{post.comment} comments</span> */}
          </div>
        </div>
      </div>
    ))}
    </div>
  
     </>
  );
}