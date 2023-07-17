import React, { ChangeEvent, useState, useEffect } from "react";
import { Modal } from "antd";
import userDataReducer, {
  initStateInformationUser,
} from "../../initialStates/stagiaireInitialState";
import "../../assets/Accueil.css";
import "../../assets/FormStyle.css";
/**
 * EN COURS DE MODIFIER
 * Type infor + CSS
 * status
 * checkbox multiple !! if (!isChecked) {supprimer du stagiaires}
 *
 */
interface UserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  status: string;
  role: "encadreur";
  isAdmin: true;
  infor: InformationUser;
}
interface Stagiaire {
  id: number;
  username: string;
  email: string;
  userphone: string;
  remarques: string | undefined;
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
  //onCreate: (encadrent: UserData) => void;
  onCancel: () => void;
}

const FormEncadrent: React.FC<AddEncadrentFormProps> = ({
  open,
  // onCreate,
  onCancel,
}) => {
  const [initInformationUser, dispatch] = React.useReducer(
    userDataReducer,
    initStateInformationUser
  );
  const [step, setStep] = useState<number>(1);
  const [dataArray, setData] = useState<Stagiaire[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [status, setStatus] = useState("Libre");
  const [phone, setphone] = useState("");
  const [projet, setProjet] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const user: UserData = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    status: "Libre",
    role: "encadreur",
    isAdmin: true,
    infor: initInformationUser,
  };
  // console.log("user: ", user);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInfor = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;
   // console.log("even target checked: ", isChecked);

   // console.log("even target: ", e.target);

   // console.log("initInformationUser: ", initInformationUser);
    if (name === "projet") {
      setProjet(value);
    } else if (name === "date_debut") {
      setDateDebut(value);
    } else if (name === "date_fin") {
      setDateFin(value);
    } else if (name === "id") {
      const response = await fetch(`http://localhost:5100/getUser/${value}`);
      if (response.ok) {
        const data = await response.json();
        const { result } = data;

        if (result) {
          const rowData = result.rows[0];
          const stagiaire: Stagiaire = {
            id: rowData.id,
            username: rowData.username,
            email: rowData.email,
            userphone: rowData.userphone,
            remarques: undefined,
          };

          const informationUser: InformationUser = {
            stagiaires: [
              {
                stagiaire: stagiaire,
                projet: projet,
                date_debut: dateDebut,
                date_fin: dateFin,
              },
            ],
          };
          //console.log(informationUser);
          if (isChecked) {
            dispatch({
              type: "ADD_ITEM",
              section: "stagiaires",
              value: informationUser.stagiaires,
            });
            //console.log("initInformationUser: ", initInformationUser);
          } else {
            //console.log("REMOVE_ITEM");
            dispatch({
              type: "REMOVE_ITEM",
              section: "stagiaires",
              value: informationUser.stagiaires,
            });
          }
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      }
    }
    //console.log("Projet: ", projet, "DD: ", dateDebut, "DF: ", dateFin);
  };

  const handleStatus = () => {
    if (user.infor.stagiaires.length === 2) {
      setStatus("Occupé");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        /** RQ: les stegiaires accepté qui n'ont un encadrent !
         * Note: les stagiaires qui n'ont un encadreur sont les stagiaire acceptées sinon les stagiaires qui en cours de stages sont seulement qui ont des encadreurs
         */
        const response = await fetch(
          "http://localhost:5100/stagiaires-acceptees"
        );
        if (response.ok) {
          const data = await response.json();
          const dataArray = Array.from(data.result);
          setData(dataArray as Stagiaire[]);
          //console.log(Array.isArray(Array.from(data.result)));
          //console.log(data);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("HANDLESUBMIT appeleé");
    e.preventDefault();
    submitForm(user);
  };

  const submitForm = async (data: UserData): Promise<void> => {
    console.log("SUBMITFORM appelé !!");
    //console.log("data: ", data);
    try {
      const response = await fetch("http://localhost:5100/encadrent-Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("response: ", response);
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
    <Modal
      open={open}
      footer={null}
      className="modal-Encadr"
      onCancel={onCancel}
    >
      <form id="msform" onSubmit={handleSubmit}>
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
            name="ajout"
            className="ajout action-button"
            type="submit"
            value="Ajouter"
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
          <p>
            Selectionner un ou deux stagiaires maximum pour chaque encadrant
          </p>

          <div className="heading-title">
            <h3>Stagiaires</h3>
          </div>
          <ul>
            {dataArray.map((stagiaire) => (
              <li key={stagiaire.id}>
                <input
                  type="checkbox"
                  name="id"
                  id={String(stagiaire.id)}
                  value={stagiaire.id}
                  // checked={selectedOptions.includes('Option 1')}
                  onChange={(e) => handleInfor(e)}
                />
                <label>{stagiaire.username}</label>
              </li>
            ))}
          </ul>
          <input
            type="text"
            name="date_debut"
            placeholder="Date de debut"
            onChange={(e) => handleInfor(e)}
          />
          <input
            type="text"
            name="date_fin"
            placeholder="Date de fin"
            onChange={(e) => handleInfor(e)}
          />
          <input
            type="text"
            name="projet"
            placeholder="Nom du projet"
            onChange={(e) => handleInfor(e)}
          />
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
