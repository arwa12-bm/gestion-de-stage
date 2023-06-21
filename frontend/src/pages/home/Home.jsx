import React from "react";

import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/sidebar";

import "./home.css"
import Profile from "../profil/profil";

export default function Home() {

  return (
    <>
    <Header/>
    <div className="homeContainer">
      <Sidebar/>
      <Profile/>
  </div>
  </>
  );
}