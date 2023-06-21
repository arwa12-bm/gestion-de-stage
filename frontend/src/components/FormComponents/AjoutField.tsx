import React from "react";
// import "../../assets/MultiStepForm.css";

const AjoutField = ({ ajouterDiv }) => {
  return (
    <div>
      <button type="button" className="add" onClick={ajouterDiv}>
        +
      </button>
    </div>
  );
};

export default AjoutField;
