import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/MultiStepForm.css";
import ProgressBar from "./FormComponents/ProgressBar";
import FieldContact from "./FormComponents/FieldContact";
import FieldFormation from "./FormComponents/FieldFormation";
import FieldExperience from "./FormComponents/FieldExperience";
import FieldProjet from "./FormComponents/FieldProjet";
import FieldSkill from "./FormComponents/FieldSkill";
import FieldDone from "./FormComponents/FieldDone";
import userDataReducer, {
  initialState,
} from "../initialStates/userInitialState";

const MultiStepForm: React.FC = () => {
  /**************************/
  const [userData, dispatch] = React.useReducer(userDataReducer, initialState);
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [divCount, setDivCount] = useState<number>(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
    if (step === 2) addFormation();
    else if (step === 3) addExperience();
    else if (step === 4) addProjet();
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);

    /****** handleChange() ******/
    const { name, value } = event.target;

    // Gérer les propriétés imbriquées
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      dispatch({
        type: "MODIFIER_IMBRIQUE",
        parent: parent,
        child: child,
        value: value,
      });
    } else {
      dispatch({ type: "UPDATE_FIELD", field: name, value: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT appeleé");
    e.preventDefault();
    submitForm(userData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Gérer les propriétés imbriquées
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      dispatch({
        type: "MODIFIER_IMBRIQUE",
        parent: parent,
        child: child,
        value: value,
      });
    } else {
      dispatch({ type: "UPDATE_FIELD", field: name, value: value });
    }
  };

  const addFormation = () => {
    console.log("formation::", userData.formation);
    const newItem = userData.formation;

    dispatch({
      type: "ADD_ITEM",
      section: "formations",
      value: newItem,
    });
  };

  const addExperience = () => {
    console.log("experience::", userData.experience);
    const newItem = userData.experience;
    dispatch({
      type: "ADD_ITEM",
      section: "experiences",
      value: newItem,
    });
  };

  const addProjet = () => {
    console.log("projet::", userData.projet);
    const newItem = userData.projet;

    dispatch({
      type: "ADD_ITEM",
      section: "projets",
      value: newItem,
    });
  };

  const supprimer = (button: HTMLButtonElement) => {
    console.log("button", button);
    const parentNode = button.parentNode;
    if (parentNode) {
      parentNode.removeChild(button);
    }
  };

  const ajouterDiv = () => {
    setDivCount(divCount + 1);
    console.log("step::", step);
    if (step == 2) addFormation();
    else if (step == 3) addExperience();
    else if (step == 4) addProjet();
  };

  const [focused, setFocused] = useState(false);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
  };

  /*********** SUBMIT FUNCTION ***********/
  const submitForm = async (data: typeof initialState): Promise<void> => {
    console.log("SUBMITFORM appelé !!");
    try {
      const response = await fetch("http://localhost:5100/stage-demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) navigate("/sucess");

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la soumission du formulaire."
        );
      }
      console.log("Formulaire soumis avec succès !");
    } catch (error) {
      console.error("error add: ", error.message);
    }
  };

  return (
    <form id="msform" onSubmit={handleSubmit}>
      <ProgressBar step={step} />
      <FieldContact
        step={step}
        nextStep={nextStep}
        handleChange={handleChange}
        //errors={errors}
        handleFocus={handleFocus}
        focused={focused}
      />
      <FieldFormation
        step={step}
        nextStep={nextStep}
        prevStep={prevStep}
        handleChange={handleChange}
        supprimer={supprimer}
        divCount={divCount}
        ajouterDiv={ajouterDiv}
        //errors={errors}
      />
      <FieldExperience
        step={step}
        nextStep={nextStep}
        prevStep={prevStep}
        handleTypeChange={handleTypeChange}
        selectedType={selectedType}
        supprimer={supprimer}
        divCount={divCount}
        ajouterDiv={ajouterDiv}
        handleChange={handleChange}
      />
      <FieldProjet
        step={step}
        nextStep={nextStep}
        prevStep={prevStep}
        handleChange={handleChange}
        supprimer={supprimer}
        divCount={divCount}
        ajouterDiv={ajouterDiv}
      />
      <FieldSkill
        step={step}
        nextStep={nextStep}
        prevStep={prevStep}
        handleChange={handleChange}
      />
      <FieldDone step={step} prevStep={prevStep} handleSubmit={handleSubmit} />
    </form>
  );
};

export default MultiStepForm;
