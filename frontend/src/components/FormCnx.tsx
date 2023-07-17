import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/MultiStepForm.css";
import "../assets/FormStyle.css";
/**
 * les connexion a assurer s'il les cases sont rempliés
 * il n'y a pas de controle sur le données !!
 * @returns
 */
const FormCnx: React.FC = () => {
  interface User {
    email: string;
    password: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const initialUser: User = {
    email: email,
    password: password,
  };
  const navigate = useNavigate();

  const submitForm = async (data: User): Promise<void> => {
    console.log("SUBMITFORM appeleé");

    try {
      const response = await fetch("http://localhost:5100/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("DATA: ", data);
      navigate("/stagiaires");

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la soumission du formulaire."
        );
      }
    } catch (error) {
      // Gérer les erreurs d'authentification ici
      console.error("Erreur de connexion :", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT appeleé");
    e.preventDefault();
    submitForm(initialUser);
  };
  return (
    <div id="htmlform">
      <form id="msform" onSubmit={handleSubmit}>
        <fieldset style={{ display: "block" }}>
          <h2 className="fs-title">Connexion</h2>
          <h3 className="fs-subtitle">Bienvenue</h3>
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            name="connexion"
            className="connexion action-button"
            value="Connecter"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default FormCnx;
