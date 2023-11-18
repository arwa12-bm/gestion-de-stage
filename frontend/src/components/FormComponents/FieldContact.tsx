import React from "react";
// import { Form, Input } from "antd";

interface FieldContactProps {
  // Définir le type de chaque propriété ici
  step: number;
  nextStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  focused: boolean;
  selectedRole : string | undefined;
}


const FieldContact: React.FC<FieldContactProps> = (
  props: FieldContactProps
) => {
  
  return (
    <fieldset style={{ display: props.step === 1 ? "block" : "none" }}>
      <h2 className="fs-title">Contact</h2>
      <h3 className="fs-subtitle">Renforcez vos chances !</h3>

      <input
        type="text"
        name="name"
        placeholder="Nom Complet"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
        
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
      />

      <input
        type="number"
        name="phone"
        placeholder="Téléphone"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
      />
      <input
        type="password" 
        required 
        name="password"
        placeholder="password"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
      />
      
  <select
    name="Contact.Role"
    value={props.selectedRole} // Corrected
    onChange={props.handleRoleChange} // Corrected
  >
    <option value="" disabled hidden>
      Role
    </option>
    <option value="Etudiant">Etudiant</option>
    <option value="chomeur">chomeur</option>
    <option value="Formateur">Formateur</option>
    <option value="autre">Autre</option>
  </select>

        
      <input
        type="button"
        name="next"
      
        className="next action-button"
        value="Suivant"
        onClick={props.nextStep}
      />

    </fieldset>
  );
};
export default FieldContact;
