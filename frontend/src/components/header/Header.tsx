import React from "react";
import "./styleHeader.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

export default function Header() {


  const token: string | null = localStorage.getItem('token');
const user: { id: number; username: string; email: string; role: string; userphone: string; post: string } = jwt_decode(token!);


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
       
        <img src="src/assets/pers.jpg" alt="" className="topbarImg"/>
      </div> 
    </div>
  );
};
