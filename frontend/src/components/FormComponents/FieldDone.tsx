import React from "react";

const Button = () => {
  return (
    <>
      <input
        type="submit"
        name="envoyer"
        id="blue"
        className="envoyer action-button"
      />
      <label
        htmlFor="blue"
        style={{ "--color": "blue" } as React.CSSProperties}
      >
        Envoyer
      </label>
    </>
  );
};

const FieldDone = ({ prevStep, step, handleSubmit }) => {
  return (
    <fieldset
      style={{ display: step === 6 ? "block" : "none" }}
      onSubmit={handleSubmit}
    >
      <h2 className="fs-title">Merci !</h2>
      <h3 className="fs-subtitle">Demander maintenant && Bon courage </h3>
      <input
        type="button"
        name="previous"
        className="previous action-button"
        value="Précédent"
        onClick={prevStep}
      />
      <Button />
    </fieldset>
  );
};

export default FieldDone;
