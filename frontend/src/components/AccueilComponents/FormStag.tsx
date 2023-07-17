import { Modal } from "antd";
import React, { ChangeEvent, useState, useEffect } from "react";
import userDataReducer, {
  initStateInformationUser,
} from "../../initialStates/stagiaireInitialState";
import "../../assets/FormStyle.css";
import "../../assets/Accueil.css";

/**
 * deleted the element unchecked !!
 * modal encadreur
 */
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

interface AddStagFormProps {
  open: boolean;
  onCancel: () => void;
}
export const FormStag: React.FC<AddStagFormProps> = ({ open, onCancel }) => {
  const [initInformationUser, dispatch] = React.useReducer(
    userDataReducer,
    initStateInformationUser
  );
  const [dataArray, setData] = useState<Stagiaire[]>([]);
  const [projet, setProjet] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  
  const handleInfor = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;

    //console.log("even target checked: ", isChecked);

    console.log("stagiaires: ", stagiaires);

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
            setStagiaires(stagiaires);
            dispatch({
              type: "ADD_ITEM",
              section: "stagiaires",
              value: informationUser.stagiaires,
            });
            console.log("initInformationUser: ", initInformationUser);
          } else {
            //console.log("REMOVE_ITEM");
            setStagiaires((prevStagiaires) => prevStagiaires.slice(0, -1)); // Supprime le dernier élément du tableau

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
    console.log("Projet: ", projet, "DD: ", dateDebut, "DF: ", dateFin);
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

  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <h3>Informations Encadrant:</h3>
      <p>Selectionner un ou deux stagiaires maximum pour chaque encadrant</p>
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
      />{" "}
      <br />
      <input
        type="text"
        name="date_fin"
        placeholder="Date de fin"
        onChange={(e) => handleInfor(e)}
      />{" "}
      <br />
      <input
        type="text"
        name="projet"
        placeholder="Nom du projet"
        onChange={(e) => handleInfor(e)}
      />
      <br />
      <input
        name="ajout"
        className="ajout action-button"
        type="submit"
        value="Update"
      />
    </Modal>
  );
};
