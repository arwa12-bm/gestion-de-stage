import React from "react";
// import "../../assets/MultiStepForm.css";
import AjoutField from "./AjoutField";

const FieldExperience = ({
  step,
  nextStep,
  prevStep,
  handleTypeChange,
  selectedType,
  handleChange,
  supprimer,
  divCount,
  ajouterDiv,
}) => {
  return (
    <fieldset
      style={{ display: step === 3 ? "block" : "none" }}
      name="experience"
    >
      <h2 className="fs-title">Expérience</h2>
      <h3 className="fs-subtitle">Votre vie professionnelle</h3>
      {Array.from({ length: divCount }, (_, index) => (
        <div key={index}>
          <input
            type="text"
            name="experience.societe"
            placeholder="Société"
            onChange={handleChange}
          />
          <select
            name="experience.type"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="" disabled hidden>
              Type
            </option>
            <option value="freelancer">Freelance</option>
            <option value="stagiaire">Stagiaire</option>
            <option value="employee">Employée</option>
            <option value="autre">Autre</option>
          </select>

          {selectedType === "employee" && (
            <input
              type="text"
              name="experience.post"
              placeholder="Post"
              onChange={handleChange}
            />
          )}

          {selectedType === "autre" && (
            <input
              type="text"
              name="experience.otherType"
              placeholder="Autre"
              onChange={handleChange}
            />
          )}

          <input
            type="date"
            name="experience.date-debut"
            placeholder="Date début"
            onChange={handleChange}
          />
          <input
            type="date"
            name="experience.date-fin"
            placeholder="Date fin"
            onChange={handleChange}
          />

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

export default FieldExperience;
