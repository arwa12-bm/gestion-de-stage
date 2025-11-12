import "./App.css";
import React from "react";
import Profile from "./pages/profil/profil"
//components
import Accueil from "./pages/Accueil/Accueil";
import FormCnx from "./pages/login/FormCnx";
import MultiStepForm from "./pages/MultiStepForm/MultiStepForm";
import {  Routes, Route } from "react-router-dom";
import Post from "./components/post/post";
import FormCreateAcc from "./pages/login/FormCreateAcc";
import TeamWork from "./pages/TeamWork/TeamWork";
import AllTeamWork from "./pages/TeamWork/AllTeamWork";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={< FormCnx/>}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/post" element={<Post />}/>
        <Route path="/TeamWork" element={<TeamWork />}/>
        <Route path="/AllTeamWork" element={<AllTeamWork />}/>
        <Route path="/FormCreateAcc" element={<FormCreateAcc/>}/>
        <Route path="/stagiaires" element={<Accueil />} />
        <Route path="/MultiStepForm" element={< MultiStepForm />}/>
      </Routes>
    
    
  );
}


export default App;
