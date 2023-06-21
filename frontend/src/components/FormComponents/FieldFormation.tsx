import React from "react";
// import "../../assets/MultiStepForm.css";
import AjoutField from "./AjoutField";
// import { Form, Input } from "antd";

interface FieldFormationProps {
  // Définir le type de chaque propriété ici
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divCount: number;
  ajouterDiv: () => void;
  supprimer: (button: HTMLButtonElement) => void;
  // errors: {
  //   niveau?: boolean;
  //   diplome?: boolean;
  //   specialite?: boolean;
  //   universite?: boolean;
  //   date_debut?: boolean;
  // };
}

const FieldFormation = (props: FieldFormationProps, { supprimer }) => {
  return (
    <fieldset
      style={{ display: props.step === 2 ? "block" : "none" }}
      name="foramtion"
    >
      <h2 className="fs-title">Formation</h2>
      <h3 className="fs-subtitle">Vos études && Vos diplômes ..</h3>
      {Array.from({ length: props.divCount }, (_, index) => (
        <div key={index}>
          {/* <Form.Item
            validateStatus={
              props.errors.niveau === undefined || props.errors.niveau === true
                ? "error"
                : ""
            }
            help={
              props.errors.niveau === true ? "Veuillez entrer votre niveau" : ""
            }
          >
            <Input */}
          <input
            type="text"
            name="formation.niveau"
            placeholder="Niveau"
            onChange={props.handleChange}
          />
          {/* </Form.Item>

          <Form.Item
            validateStatus={
              props.errors.diplome === undefined ||
              props.errors.diplome === true
                ? "error"
                : ""
            }
            help={
              props.errors.diplome === true
                ? "Veuillez entrer votre diplôme"
                : ""
            }
          >
            <Input */}
          <input
            type="text"
            name="formation.diplome"
            placeholder="Diplôme"
            onChange={props.handleChange}
          />
          {/* </Form.Item>
          <Form.Item
            validateStatus={
              props.errors.specialite === undefined ||
              props.errors.specialite === true
                ? "error"
                : ""
            }
            help={
              props.errors.specialite === true
                ? "Veuillez entrer votre spécialité"
                : ""
            }
          >
            <Input */}
          <input
            type="text"
            name="formation.specialite"
            placeholder="Spécialité"
            onChange={props.handleChange}
          />
          {/* </Form.Item>
          <Form.Item
            validateStatus={
              props.errors.universite === undefined ||
              props.errors.universite === true
                ? "error"
                : ""
            }
            help={
              props.errors.universite === true
                ? "Veuillez entrer votre université"
                : ""
            }
          >
            <Input */}
          <input
            type="text"
            name="formation.universite"
            placeholder="Université"
            onChange={props.handleChange}
          />
          {/* </Form.Item>
          <Form.Item
            validateStatus={
              props.errors.date_debut === undefined ||
              props.errors.date_debut === true
                ? "error"
                : ""
            }
            help={
              props.errors.date_debut === true
                ? "Veuillez entrer votre date de début de votre formation"
                : ""
            }
          >
            <Input */}
          <input
            type="date"
            name="formation.date_debut"
            placeholder="Date début"
            onChange={props.handleChange}
          />
          {/* </Form.Item> */}

          <input
            type="date"
            name="formation.date_fin"
            placeholder="Date fin"
            onChange={props.handleChange}
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
      <AjoutField ajouterDiv={props.ajouterDiv} />
      <input
        type="button"
        name="previous"
        className="previous action-button"
        value="Précédent"
        onClick={props.prevStep}
      />
      <input
        type="button"
        name="next"
        // disabled={
        //   Object.values(props.errors).length === 0
        //     ? true
        //     : Object.values(props.errors).some((error) => error)
        // }
        className="next action-button"
        value="Suivant"
        onClick={props.nextStep}
      />
    </fieldset>
  );
};

export default FieldFormation;
