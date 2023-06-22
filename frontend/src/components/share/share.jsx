import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material";
import { useState,useEffect } from "react";


export default function Share() {
  const [isClicked,setIsClicked] = useState(false)
  const ModifHandler =()=>{
   
    setIsClicked(!isClicked )
  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="src/assets/pers.jpg" alt="" />
          <input
            placeholder="What's in your mind ?"
            className="shareInput"
          />
           {isClicked?
           <div  className="Add">
            <input id="file-input" type="file" name="file" placeholder="input file"
            className="shareInputAdd"/>
             <input id="title-input" type="text" name="title" placeholder="Title" 
            className="shareInputAdd"/>
            <input id="tag-input" type="text" name="tag" placeholder="Tag" 
            className="shareInputAdd"/>
           
            </div>
            :""
          }
         
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato"   className="shareIcon" />
                     <label for="file-input" className="shareOptionText" onClick={ModifHandler}>Photo or Video</label>
                    
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText" for="tag-input" onClick={ModifHandler}>Tag</span>
                </div>
              
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}