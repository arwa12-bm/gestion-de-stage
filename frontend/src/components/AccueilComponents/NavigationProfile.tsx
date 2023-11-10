import React, { useState } from "react";
import  "../../assets/Navigation.css";
import { HomeOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
const NavigationMenuProfile: React.FC = () => {
 

	
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const list = [
    "Name",
    "Accueil",
    "Profil",
    "Encadrents",
    "Messages",
    "TeamWork",
    "Deconnexion",
  ];
  const listHref = [
    "",
    "/stagiaires",
    "/Profile",
    "/CreateAccount",
    "/Messages",
    "/TeamWork",
    "/",
  ];
  const listIcon = [<></>, <HomeOutlined />];
  const handleMouseOver = (index: number) => {
    setActiveItem(index);
  };

  const icons = ["", "../assets/Images/Icones/1.png", ""];
  // const handleToggleClick = () => {
  //   // toggle logic
  // };

  return (
    <div>
      {/* {<div className="toggle" onClick={handleToggleClick}>
      </div>} */}
      <div className="navigation">
        <ul>
          {list.map((item, index) => (
            <li
              key={index}
              className={activeItem === index ? "hovered" : ""}
              onClick={() => handleMouseOver(index)}
            >
              <a href={listHref[index]}>
                <span className="icon">
                  {listIcon[index]}
                </span>
                <span className="title">{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationMenuProfile;