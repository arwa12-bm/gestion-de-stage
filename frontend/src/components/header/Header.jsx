import React from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

export default function Header() {


  const token =localStorage.getItem('token')
	const user = jwt_decode(token);

  return (
    <div className="topbarContainer">
       <div className="topbarLeft">
        <span className="logo">welcome {user.username}</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
           <Search className="c" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
             <Person /> 
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
             <Chat /> 
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications /> 
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="src/assets/pers.jpg" alt="" className="topbarImg"/>
      </div> 
    </div>
  );
};
