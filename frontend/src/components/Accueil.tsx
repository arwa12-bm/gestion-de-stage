import React from "react";
import { useState } from "react";
import "../assets/Accueil.css";
import NavigationMenu from "./AccueilComponents/Navigation";
import Demandes from "./AccueilComponents/TableDemande";
import Encadrant from "./AccueilComponents/TableEncadrent";
import Archive from "./AccueilComponents/TableArchive";
import Message from "./AccueilComponents/Message";
import Profil from "./AccueilComponents/Profil";
import TeamWork from "./AccueilComponents/TeamWork";

const Accueil = () => {
  const [activePage, setActivePage] = useState("Accueil");
  //console.log(activePage);
  return (
    <div className="container">
      <NavigationMenu setActivePage={setActivePage} />
      {activePage === "Accueil" && <Demandes />}
      {activePage === "Profil" && <Profil />}
      {activePage === "Encadrants" && <Encadrant />}
      {activePage === "Messages" && <Message />}
      {activePage === "Archivage" && <Archive />}
      {activePage === "TeamWork" && <TeamWork />}
    </div>
  );
};

export default Accueil;
