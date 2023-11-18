import React, { useState, useEffect } from "react";
import axios from "axios";
import { Phone, Person, Create, Email } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import Header from "../../components/header/Header";
import Share from "../../components/share/share";
import Post from "../../components/post/post";
import NavigationMenuProfile from "../../components/sidebar/NavigationProfile";
import "./profile.css";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  userphone: string;
  post: string;
}

export default function Profile(): JSX.Element {
  const token = localStorage.getItem("token");
  const user: UserProfile = jwt_decode(token!);
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [id, setId] = useState<number | undefined>(undefined);
  const [userphone, setPhone] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(true);

  const ModifHandler = (): void => {
    setIsClicked(!isClicked);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const modifSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setId(user.id);
    console.log(id);
    console.log({ id, username, email, userphone });

    await axios.put("http://localhost:5100/api/v1/updateuserprofile", {
      id,
      username,
      email,
      userphone,
    });
    console.log("done");
  };

  return (
    <>
      <Header />
      <div className="profile">
        <NavigationMenuProfile />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="src/assets/cov.jpeg" alt="" />
              <img className="profileUserImg" src="src/assets/pers.jpg" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
            </div>
            {isClicked ? (
              <div className="profileDetails">
                <span className="profileInfoTitle">Détails</span>
                <span className="profileInfoDesc">
                  <Email className="phoneIcon" /> {user.email}
                </span>
                <span className="profileInfoDesc">
                  <Person className="phoneIcon" /> Role {user.role}
                </span>
                <span className="profileInfoDesc">
                  <Phone className="phoneIcon" /> {user.userphone}
                </span>
                <button className="ModifButton" onClick={ModifHandler}>
                  <Create className="phoneIcon" /> Modify Your Personal Information
                </button>
              </div>
            ) : (
              <form className="profileDetails2" onSubmit={modifSubmit}>
                
                  <span className="profileInfoTitle">Détails</span>
                  <span className="profileInfoDesc">
                    <Person className="phoneIcon" />
                    <input
                      type="text"
                      placeholder={user.username}
                      value={username}
                      onChange={handleChangeName}
                      onMouseEnter={(e) => ((e.target as HTMLInputElement).style.borderBottom = "solid blue 2px")}
                      onMouseOut={(e) => ((e.target as HTMLInputElement).style.borderBottom = "")}
                      className="profilInput"
                    />
                  </span>
                  <span className="profileInfoDesc">
                    <Email className="phoneIcon" />
                    <input
                      type="email"
                      placeholder={user.email}
                      value={email}
                      onChange={handleChangeEmail}
                      onMouseEnter={(e) => ((e.target as HTMLInputElement).style.borderBottom = "solid blue 2px")}
                      onMouseOut={(e) => ((e.target as HTMLInputElement).style.borderBottom = "")}
                      className="profilInput"
                    />
                  </span>
                  <span className="profileInfoDesc">
                    <Phone className="phoneIcon" />
                    <input
                      type="text"
                      placeholder={user.userphone}
                      value={userphone}
                      onChange={handleChangePhone}
                      onMouseEnter={(e) => ((e.target as HTMLInputElement).style.borderBottom = "solid blue 2px")}
                      onMouseOut={(e) => ((e.target as HTMLInputElement).style.borderBottom = "")}
                      className="profilInput"
                    />
                  </span>
                  <div>
                    <button className="ModifButton2" onClick={ModifHandler}>
                      Cancel
                    </button>
                    <button className="ModifButton2" type="submit">
                      Modify
                    </button>
                  </div>
                
              </form>
            )}
            <div className="profileBody">
              <Share />
              <Post />
              {/* <CreateAccount/> */}
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
