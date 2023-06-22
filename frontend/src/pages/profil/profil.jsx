import "./profile.css";
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/sidebar";
//import Rightbar from "../../components/rightbar/rightbar";
import Share from "../../components/share/share";
import Post from "../../components/post/post";
import jwt_decode from "jwt-decode";
import { Phone,Person,Create,Email} from "@mui/icons-material";
import { useState,useEffect } from "react";
import axios from "axios";
import Logup from "../../components/Logup/Logup";
export default function Profile() {

  const token =localStorage.getItem('token')
  const user = jwt_decode(token);
  console.log(user);
  const post = user.post
  console.log(post)
  const[email,setEmail]=useState('');
  const[username,setUserName]=useState('');
  const[id,setId]=useState();
  const[userphone,setPhone]=useState('');
  const [isClicked,setIsClicked] = useState(true)
  const ModifHandler =()=>{
   
    setIsClicked(!isClicked )
  }
  
  const handleChangeEmail = async (e) => {
    setEmail(e.target.value)  
    
 }
 const handleChangeName = async (e) => {
  setUserName(e.target.value)  
}
const handleChangePhone = async (e) => {
  setPhone(e.target.value)  
}

const modifSubmit = async (e) => {
      e.preventDefault();
      setId(user.id)
      console.log(id)
      console.log({id,username,email,userphone });
      
     await axios.put('http://localhost:5100/api/v1/updateuserprofile', {id,username,email,userphone });
   console.log("done")
  
};


  return (
    <>
      <Header />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="src/assets/cov.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="src/assets/pers.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                </div>
                {isClicked?
                <div className="profileDetails">
                    <span className="profileInfoTitle">Détails</span>
                    <span className="profileInfoDesc">< Email className="phoneIcon" />  {user.email}</span>
                    <span className="profileInfoDesc">< Person className="phoneIcon" /> Role {user.role}</span>
                    <span className="profileInfoDesc"> < Phone className="phoneIcon" />   {user.userphone}</span>
                    <button className="ModifButton" onClick={ModifHandler}> < Create className="phoneIcon" /> Modify Your Personal Information</button>
                  </div>
                  :
                  <form  onSubmit={modifSubmit} >
                      <div className="profileDetails2">

                        <span className="profileInfoTitle">Détails</span>
                        <span className="profileInfoDesc">
                            < Person className="phoneIcon" /> 

                              <input   type="text"
                                        placeholder={user.username} 
                                        value={username} 
                                        onChange={handleChangeName} 
                                        onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                                        onMouseOut={(e)=>e.target.style.borderBottom= "" }
                                        className="profilInput"  />
                          </span>
                          <span className="profileInfoDesc">
                              < Email className="phoneIcon" /> 

                              <input   type="email"
                                        placeholder={user.email} 
                                        value={email} 
                                        onChange={handleChangeEmail} 
                                        onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                                        onMouseOut={(e)=>e.target.style.borderBottom= "" }
                                        className="profilInput"  />
                              </span>

                        {/* <span className="profileInfoDesc">

                          < Person className="phoneIcon" />

                          <input type="text" 
                          placeholder={user.role} 
                          value={phone} 
                          onChange={handleChangePhone} 
                          onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                          onMouseOut={(e)=>e.target.style.borderBottom= "" }
                          className="profilInput"  /> 

                        </span> */}
                        <span className="profileInfoDesc"> 
                            < Phone className="phoneIcon" /> 

                            <input type="text" 
                            placeholder={user.userphone} 
                            value={userphone} 
                            onChange={handleChangePhone} 
                            onMouseEnter={(e)=>e.target.style.borderBottom= "solid blue 2px"  }
                            onMouseOut={(e)=>e.target.style.borderBottom= "" }
                            className="profilInput"  />  

                        </span>
                        <div>
                        <button className="ModifButton2" onClick={ModifHandler}> Cancel</button>
                        <button className="ModifButton2" type="submit"> Modify</button>
                        </div>
                      </div>
                  </form>
                }
              <div className="profileBody">
                  <Share/>
                  <Post/>
                  <Logup/>
             </div>
           
            
          </div>
          {/* <div className="profileRightBottom">
            
          <Rightbar/>
          </div> */}
        </div>
      </div>
    </>
  );
}