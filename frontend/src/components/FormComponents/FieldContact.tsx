import React from "react";
// import { Form, Input } from "antd";

interface FieldContactProps {
  // Définir le type de chaque propriété ici
  step: number;
  nextStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // errors: {
  //   name?: boolean;
  //   email?: boolean;
  //   phone?: boolean;
  // };
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  focused: boolean;
}

const FieldContact: React.FC<FieldContactProps> = (
  props: FieldContactProps
) => {
  //console.log("CONSSOOOSOSL", props.errors);
  return (
    <fieldset style={{ display: props.step === 1 ? "block" : "none" }}>
      <h2 className="fs-title">Contact</h2>
      <h3 className="fs-subtitle">Renforcez vos chances !</h3>
      {/* <Form.Item
        validateStatus={
          props.focused === true || props.errors.name === true ? "error" : ""
        }
        help={
          props.focused === true || props.errors.name === true
            ? "Le nom doit contenir entre 3 et 30 caractères alphabétiques"
            : null
        }
      > */}
      {/* <Input */}
      <input
        type="text"
        name="name"
        placeholder="Nom Complet"
        onChange={props.handleChange}
        // pattern="^[A-Za-z]{3,30}$"
        // required
        onBlur={props.handleFocus}
        // className={props.errors.name === true ? "error-massage" : ""}
      />
      {/* </Form.Item> */}

      {/* <Form.Item
        validateStatus={
          props.focused === true || props.errors.email === true ? "error" : ""
        }
        help={
          props.focused === true || props.errors.email === true
            ? "Veuillez entrer votre email"
            : ""
        }
      > */}
      {/* <Input */}
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
      />
      {/* </Form.Item>
      <Form.Item
        validateStatus={
          props.focused === true || props.errors.phone === true ? "error" : ""
        }
        help={
          props.focused === true || props.errors.phone === true
            ? "Veuillez entrer votre numero de telephone"
            : ""
        }
      >
        <Input */}
      <input
        type="number"
        name="phone"
        placeholder="Téléphone"
        onChange={props.handleChange}
        onBlur={props.handleFocus}
      />
      {/* </Form.Item>
      <Form.Item>
        <Input */}
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
      {/* </Form.Item> */}
    </fieldset>
  );
};
export default FieldContact;
