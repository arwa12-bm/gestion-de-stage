import "./App.css";
import React from "react";
import Profile from "./pages/profil/profil"
import Login from "./pages/login/login";
//components
import Accueil from "./components/Accueil";
 import FormCnx from "./components/FormCnx";
import MultiStepForm from "./components/MultiStepForm";
import {  Routes, Route } from "react-router-dom";
import Post from "./components/post/post";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import TeamWork from "./pages/TeamWork/TeamWork";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/post" element={<Post />}/>
        <Route path="/TeamWork" element={<TeamWork />}/>
        <Route path="/createAccount" element={<CreateAccount />}/>
        <Route path="/accueil" element={< Accueil/>}/>
        <Route path="/formCnx" element={< FormCnx/>}/>
        <Route path="/form" element={< MultiStepForm />}/>
      </Routes>
   
    
    
  );
}

export default App;
