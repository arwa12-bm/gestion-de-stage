import React from "react";
import { useNavigate } from "react-router-dom";


const FieldDone = ({  step}) => {
  const nav = useNavigate();
  return (
    <fieldset
      style={{ display: step === 6 ? "block" : "none" }}
      
    >
      <h2 className="fs-title">Merci !</h2>
      <h3 className="fs-subtitle">votre compte a été créé avec succès</h3>
      <input
        type="button"
        name="previous"
        className="previous action-button"
        value="Se connecter"
        onClick={()=>(nav('/'))}
      />
      
    </fieldset>
  );
};

export default FieldDone;
