import React from "react";
import { useState } from "react";
import "./Accueil.css";
import NavigationMenu from "../../components/AccueilComponents/Navigation";
import Demandes from "../../components/AccueilComponents/TableDemande";
import Encadrent from "../../components/AccueilComponents/TableEncadrent";
import Archive from "../../components/AccueilComponents/TableArchive";

const Accueil = () => {
  const [activePage, setActivePage] = useState("Accueil");
  //console.log(activePage);
  return (
    <div className="container">
      <NavigationMenu setActivePage={setActivePage} />
      {activePage === "Accueil" && <Demandes />}
      {activePage === "Encadrents" && <Encadrent />}
      {activePage === "Archivage" && <Archive />}
    </div>
  );
};

export default Accueil;
