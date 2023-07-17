import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "./pages/profil/profil";
// import Login from "./pages/login/login";

//components
import Accueil from "./components/Accueil";
import FormCnx from "./components/FormCnx";
import MultiStepForm from "./components/MultiStepForm";
import { Erreur } from "./components/Erreur";
import Sucess from "./components/Sucess";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/stagiaires" element={<Accueil />} />
      <Route path="/erreur" element={<Erreur />} />
      <Route path="/" element={<FormCnx />} />
      <Route path="/form" element={<MultiStepForm />} />
      <Route path="/sucess" element={<Sucess />} />
    </Routes>
  );
}

export default App;
