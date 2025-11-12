import React, { useState } from "react";
import  "./Navigation.css";
import { HomeOutlined ,UserOutlined,ProfileOutlined,FilterOutlined ,LogoutOutlined} from "@ant-design/icons";

const NavigationMenuProfile: React.FC = () => {

	
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const list = [
    "Nom",
    "Profile",
    "Accueil",
    "Publication",
    "déconnection",
  ];
  const listHref = [
    "",
    "/Profile",
    "/AllTeamWork",
    "/TeamWork",
    "/",
  ];
  const listIcon = [<UserOutlined />,<ProfileOutlined />, <HomeOutlined />,<FilterOutlined />,<LogoutOutlined />];
  const handleMouseOver = (index: number) => {
    setActiveItem(index);
  };

  const icons = ["", "../assets/Images/Icones/1.png", ""];

  return (
    <div>
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