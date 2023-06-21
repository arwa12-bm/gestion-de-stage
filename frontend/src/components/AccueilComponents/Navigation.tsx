import React, { useState } from "react";
import "../../assets/Accueil.css";
import { HomeOutlined } from "@ant-design/icons";
const NavigationMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const list = [
    "Name",
    "Accueil",
    "Profil",
    "Encadrents",
    "Messages",
    "Archivage",
    "TeamWork",
    "Deconnexion",
  ];
  const listHref = [
    "",
    "/stagiaires",
    "/Profil",
    "/Encadrents",
    "/Messages",
    "/Archives",
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

export default NavigationMenu;
