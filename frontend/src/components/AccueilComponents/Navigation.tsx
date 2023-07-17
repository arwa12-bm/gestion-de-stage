import React, { useState } from "react";

interface NavigationMenuProps {
  setActivePage: (page: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ setActivePage }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const list = [
    "",
    "Accueil",
    "Profil",
    "Encadrants",
    "Messages",
    "Archivage",
    "TeamWork",
    "Deconnexion",
  ];
  const listHref = ["", "#1", "#2", "#3", "#4", "#5", "#6", "/"];
  // const handleMouseOver = (index: number) => {
  //   setActiveItem(index);
  // };
  const handleItemClick = (index: number) => {
    setActiveItem(index);
    setActivePage(list[index]);
  };

  return (
    <div className="navigation">
      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            className={activeItem === index ? "hovered" : ""}
            onClick={() => handleItemClick(index)}
            // onClick={() => handleMouseOver(index)}
          >
            <a href={listHref[index]}>
              <span className="icon"></span>
              <span className="title">{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
