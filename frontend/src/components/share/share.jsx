import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material";
import { useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Share() {

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [type_post,setType]= useState('')
  const [photo,setPhoto]=useState('')
  const [tag,setTag]=useState('')
  const [isClicked,setIsClicked] = useState(false)

  const token =localStorage.getItem('token')
  const user = jwt_decode(token);

  
  const handleChangeTag = async(e)=>{
    setTag(e.target.value)
  }
  const handleChangePhoto = async(e)=>{
    setPhoto(e.target.value)
  }
  const handleChangeType = async(e)=>{
    setType(e.target.value)
  }
  const handleChangeDescription= async(e)=>{
    setDescription(e.target.value)
  }
  const handleChangeTitle = async(e)=>{
    setTitle(e.target.value)
  }
  const ModifHandler =()=>{
   
    setIsClicked(!isClicked )
  }
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const date = new Date();
    console.log({ title,"url":"",photo,type_post,description,tag,"created_at":date.toLocaleDateString() ,"commentaire":{},"id_user":user.id });
  
      await axios.post('http://localhost:5100/api/v2/insertpost',{ title,"url":"",photo,type_post,description,tag,"created_at":date.toLocaleDateString() ,"commentaire":{},"id_user":user.id } );
      console.log("done")
      window.location.reload();
    };
    

  return (
    <div className="share">
      <div className="shareWrapper" >
      <form className="shareTopForm"   onSubmit={handleSubmitPost}>

        <div className="shareTop">
        
          <img className="shareProfileImg" src="src/assets/pers.jpg" alt="" />
          <div className="x" >
            <input id="title-input"
                    type="text" 
                    name="title" 
                    placeholder="Titre" 
                    value={title} 
                    onChange={handleChangeTitle}
                    className="shareInput"/>
            
              <input
                placeholder="Description "
                value={description} 
                onChange={handleChangeDescription}
                className="shareInput" />
              <select id="select" 
                      value={type_post} 
                      onChange={handleChangeType}
                      className="shareSelect"
                      placeholder= "Type of post" >
                              <option >--Type de formation--</option>
                              <option >Developpement logiciel</option>
                              <option >Administration système et réseau</option>
                              <option >Base de donnée</option>
                </select>
                {isClicked?
                <div  className="Add">
                <input id="file-input" type="file" 
                                        name="file" 
                                        value={photo} 
                                      onChange={handleChangePhoto}
                                        placeholder="input file"
                                        className="shareInputfileAdd"/>
                <input id="tag-input" type="text"
                                      name="tag"
                                      value={tag} 
                                      onChange={handleChangeTag}
                                      placeholder="Tag" 
                                      className="shareInput"/>
                </div>
                :""
              }
            </div>
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
            <button  type="submit"className="shareButton">Share</button>
          
        </div>
        </form>
      </div>
    </div>
  );
}