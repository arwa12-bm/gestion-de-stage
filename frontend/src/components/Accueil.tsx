import React from "react";
import { useState } from "react";
import "../assets/Accueil.css";
import NavigationMenu from "./AccueilComponents/Navigation";
import Demandes from "./AccueilComponents/TableDemande";
import Encadrant from "./AccueilComponents/TableEncadrent";
import Archive from "./AccueilComponents/TableArchive";

const Accueil = () => {
  const [activePage, setActivePage] = useState("Accueil");
  //console.log(activePage);
  return (
    <div className="container">
      <NavigationMenu setActivePage={setActivePage} />
      {activePage === "Accueil" && <Demandes />}
      {activePage === "Encadrants" && <Encadrant />}
      {activePage === "Archivage" && <Archive />}
    </div>
  );
};

export default Accueil;
