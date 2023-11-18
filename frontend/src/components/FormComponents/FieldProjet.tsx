import React from "react";
import AjoutField from "./AjoutField";

const FieldProjet = ({
  nextStep,
  prevStep,
  step,
  supprimer,
  divCount,
  handleChange,
  ajouterDiv,
}) => {
  return (
    <fieldset
      style={{ display: step === 4 ? "block" : "none" }}
      name="projet"
    >
      {Array.from({ length: divCount }, (_, index) => (
        <div key={index}>
          <h2 className="fs-title">Projet</h2>
          <h3 className="fs-subtitle">Vos innovations</h3>
          <input
            type="text"
            name="projet.title"
            placeholder="Titre"
            onChange={handleChange}
          />
          <input
            type="text"
            name="projet.language"
            placeholder="Languages"
            onChange={handleChange}
          />
          <select name="projet.type" onChange={handleChange}>
            <option value="" disabled hidden>
              Type de projet
            </option>
            <option value="shcool">School Project</option>
            <option value="side">Side Project</option>
            <option value="opensource">Open Source Project</option>
          </select>
          <textarea
            name="projet.description"
            id="description"
            cols ={30}
            rows={10}
            placeholder="Description"
            onChange={handleChange}
          ></textarea>
          <button
            type="button"
            className="supprime"
            onClick={(e) => supprimer(e.target)}
          >
            -
          </button>
        </div>
      ))}
      <AjoutField ajouterDiv={ajouterDiv} />
      <input
        type="button"
        name="previous"
        className="previous action-button"
        value="Précédent"
        onClick={prevStep}
      />
      <input
        type="button"
        name="next"
        className="next action-button"
        value="Suivant"
        onClick={nextStep}
      />
    </fieldset>
  );
};

export default FieldProjet;
