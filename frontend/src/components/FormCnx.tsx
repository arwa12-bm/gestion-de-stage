import React from "react";
import "../assets/MultiStepForm.css";

const FormCnx = () => {
  return (
    <div id="msform">
      <fieldset style={{ display: "block" }}>
        <h2 className="fs-title">Connexion</h2>
        <h3 className="fs-subtitle">Bienvenue</h3>
        <br />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mot de passe" />
        <input
          type="button"
          name="connexion"
          className="connexion action-button"
          value="Connecter"
        />
      </fieldset>
    </div>
  );
};

export default FormCnx;
