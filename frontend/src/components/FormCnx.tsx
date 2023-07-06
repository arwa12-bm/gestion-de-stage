import React from "react";
import "../assets/MultiStepForm.css";

const FormCnx = () => {
  return (
    <div id="htmlform">
      <form id="msform" onSubmit={handleSubmit}>
        <fieldset style={{ display: "block" }}>
          <h2 className="fs-title">Connexion</h2>
          <h3 className="fs-subtitle">Bienvenue</h3>
          <br />
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