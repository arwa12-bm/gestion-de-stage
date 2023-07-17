import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "../../assets/Accueil.css";
import "../../assets/FormStyle.css";
/**
 * EN COURS DE MODIFIER
 */
interface UserData {
  username: string;
  email: string;
  userphone: string;
  status: string;
  role: "encadrent";
  isadmin: true;
  infor: InformationUser | undefined;
}
interface Stagiaire {
  id: number;
  username: string;
  email: string;
  userphone: string;
  remarques: string;
}

interface InformationUser {
  stagiaires: {
    stagiaire: Stagiaire;
    projet: string | undefined;
    date_debut: string;
    date_fin: string;
  }[];
}

interface AddEncadrentFormProps {
  open: boolean;
  onCreate: (encadrent: UserData) => void;
  onCancel: () => void;
}

const FormEncadrent: React.FC<AddEncadrentFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1);
  const [dataArray, setData] = useState<Stagiaire[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [status, setStatus] = useState("Libre");
  const [phone, setphone] = useState("");
  const [infor, setInfor] = useState<InformationUser | undefined>();
  const user: UserData = {
    username: name,
    email: email,
    userphone: phone,
    status: "Libre",
    role: "encadrent",
    isadmin: true,
    infor: infor,
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        /** RQ: les stegiaires accepté qui n'ont un encadrent ! */
        const response = await fetch(
          "http://localhost:5100/stagiaires-demandees"
        );
        if (response.ok) {
          const data = await response.json();
          const dataArray = Array.from(data.result);
          setData(dataArray as Stagiaire[]);
          console.log(Array.isArray(Array.from(data.result)));
          console.log(data);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <Modal
      open={open}
      footer={null}
      className="modal-Encadr"
      onCancel={onCancel}
    >
      <form id="msform">
        <fieldset style={{ display: step === 1 ? "block" : "none" }}>
          <h2 className="fs-title">Ajouter un encadrant</h2>
          <h3 className="fs-subtitle">Remplir les cordoonnées suivants:</h3>
          <br />
          <input
            name="nom"
            type="text"
            placeholder="Nom Complet"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="text"
            placeholder="Mot De Passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            name="tel"
            type="number"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <input
            type="button"
            name="next"
            className="next action-button"
            value="Suivant"
            onClick={nextStep}
          />
        </fieldset>
        <fieldset style={{ display: step === 2 ? "block" : "none" }}>
          <h3>Informations Encadrant:</h3>
          <p>Selectionner un ou deux stagiaires maximum pou chaque encadrant</p>
          <select multiple>
            <option value="" disabled hidden>
              Stagiaires
            </option>
            {dataArray.map((stagiaire) => (
              <option>
                {stagiaire.username}
                <input
                  type="checkbox"
                  // checked={selectedOptions.includes('Option 1')}
                  // onChange={() => handleOptionChange('Option 1')}
                />
              </option>
            ))}
          </select>

          <input
            type="button"
            name="previous"
            className="previous action-button"
            value="Précédent"
            onClick={prevStep}
          />
          <input
            name="ajout"
            className="ajout action-button"
            type="submit"
            value="Ajouter"
          />
        </fieldset>
      </form>
    </Modal>
  );
};

export default FormEncadrent;
