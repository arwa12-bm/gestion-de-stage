import React from "react";
import "../assets/Accueil.css";
import NavigationMenu from "./AccueilComponents/Navigation";
import Demandes from "./AccueilComponents/TableDemande";

const Accueil = () => {
  return (
    <div className="container">
      <NavigationMenu />
      <Demandes />
    </div>
  );
};

export default Accueil;
