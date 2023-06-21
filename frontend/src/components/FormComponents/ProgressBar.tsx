import React from "react";
// import "../../assets/MultiStepForm.css";

const ProgressBar = ({ step }) => {
  return (
    <ul id="progressbar">
      <li className={step === 1 ? "active" : ""}>Contact</li>
      <li className={step === 2 ? "active" : ""}>Formation</li>
      <li className={step === 3 ? "active" : ""}>Expérience</li>
      <li className={step === 4 ? "active" : ""}>Projet</li>
      <li className={step === 5 ? "active" : ""}>Compétences</li>
      <li className={step === 6 ? "active" : ""}>Prêt</li>
    </ul>
  );
};

export default ProgressBar;
