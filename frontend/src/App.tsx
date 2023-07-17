import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "./pages/profil/profil";
// import Login from "./pages/login/login";

//components
import Accueil from "./components/Accueil";
import FormCnx from "./components/FormCnx";
import MultiStepForm from "./components/MultiStepForm";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/stagiaires" element={<Accueil />} />
      <Route path="/" element={<FormCnx />} />
      <Route path="/form" element={<MultiStepForm />} />
    </Routes>
  );
}

export default App;
