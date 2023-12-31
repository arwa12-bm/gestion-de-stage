import React, { useState } from "react";

interface NavigationMenuProps {
  setActivePage: (page: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ setActivePage }) => {
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
  const listHref = ["", "#", "#", "#", "#", "#", "#", "/"];
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
