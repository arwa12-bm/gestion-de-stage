import React, { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderAddOutlined,
  PhoneOutlined,
  MailOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import FilterButton from "./Filter";
import { RemarqueModal } from "./RemarqueModal";

interface InformationUser {
  formations: {
    niveau: string;
    diplome: string;
    specialite: string;
    faculte: string;
    date_debut: string;
    date_fin: string;
  }[];
  experienses: {
    societe: string;
    type: string;
    otherType: string;
    post: string;
    date_debut: string;
    date_fin: string;
  }[];
  projets: {
    title: string;
    language: string;
    type: string;
    description: string;
  }[];
  skills: string;
  files: string[];
}

interface UserData {
  id: number;
  username: string;
  email: string;
  userphone: string;
  remarques: Remarque;
  status: string;
  infor: InformationUser;
}

interface Remarque {
  nbre_d_etoile: number;
  innovation: boolean;
  communication: string;
  compétences_techniques: string;
  collaboration: string;
  initiative: boolean;
  organisation: string;
  pontialité: string;
  autonomie: boolean;
  adaptabilité: string;
  qualité_travail: string;
  résolution_problèmes: string;
  gestion_temps: string;
  esprit_equipe: string;
  créativité: string;
  leadership: string;
  réactivité: string;
  analyse: string;
  persévérance: string;
  commentaire_supplémentaire: string;
}

const Demandes: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [dataArray, setData] = useState<UserData[]>([]);
  const [showAllStagiaires, setShowAllStagiaires] = useState(false);
  const [viewText, setViewText] = useState("View All");
  const [modalStates, setModalStates] = useState(
    Array(dataArray.length).fill(false)
  );

  const [selectedFilter, setSelectedFilter] = useState<string>("demandees");
  const [visible, setVisible] = useState(false);
  const handleSave = (id: number, status: string) => {
    setIsSaving(true);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/update?id=${id}&status=${status}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          const updatedDataArray = dataArray.map((item) => {
            if (item.id === id) {
              return { ...item, status };
            }
            return item;
          });
          setData(updatedDataArray);
          message.success("Mise à jour réussie !");
        } else {
          throw new Error("Erreur lors de l'enregistrement");
        }
      } catch (error) {
        console.error(error.message);
      }

      setIsSaving(false);
    }, 2000);
  };

  const handleViewAll = () => {
    if (viewText === "View All") {
      setShowAllStagiaires(!showAllStagiaires);
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5100/stagiaires");
          if (response.ok) {
            const data = await response.json();
            const dataArray = Array.from(data.result);
            setData(dataArray as UserData[]);
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
      setViewText("View Less");
    } else {
      setShowAllStagiaires(!showAllStagiaires);
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5100/stagiaires-demandees"
          );
          if (response.ok) {
            const data = await response.json();
            const dataArray = Array.from(data.result);
            setData(dataArray as UserData[]); // Stocke les données récupérées dans l'état du composant
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
      setViewText("View All");
    }
  };

  const handleCancel = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const showModal = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  };

  const onCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/stagiaires-${selectedFilter}`
        );
        if (response.ok) {
          const data = await response.json();
          const dataArray = Array.from(data.result);
          setData(dataArray as UserData[]);
        } else {
          throw new Error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [selectedFilter]);

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Demandes de stages</h2>
        <span className="filterButton">
          <FilterButton onFilter={handleFilter} tableName="stagiaires" />
        </span>
        <a href="#" className="btn" onClick={handleViewAll}>
          {viewText}
        </a>
      </div>
      <table>
        <thead>
          <tr>
            <td style={{ textAlign: "center" }}>Nom</td>
            <td style={{ textAlign: "center" }}>Email</td>
            <td style={{ textAlign: "center" }}>Téléphone</td>
            <td style={{ textAlign: "center" }}>Status</td>
            <td style={{ textAlign: "center" }}>Remarques</td>
          </tr>
        </thead>

        <tbody>
          {dataArray.map((item, index) => (
            <tr key={item.id}>
              <td>
                <span
                  style={{ cursor: " pointer" }}
                  onClick={() => showModal(index)}
                >
                  {item.username}
                </span>
                <Modal
                  open={modalStates[index]}
                  onCancel={() => handleCancel(index)}
                  footer={null}
                >
                  <div className="modal-content">
                    <h3>{item.username}</h3>
                    <p>
                      <PhoneOutlined /> : {item.userphone}
                    </p>
                    <p>
                      <MailOutlined /> : {item.email}
                    </p>
                    <fieldset>
                      <legend>Formation(s)</legend>
                      {item.infor.formations.map((formation, index) => (
                        <div key={index} className="formation-item">
                          <p className="formation-heading">
                            {formation.niveau} en {formation.diplome}
                          </p>
                          <p>
                            Spécialité : {formation.specialite}
                            <br />
                            Faculté : {formation.faculte}
                            <br />
                            Date de début : {formation.date_debut}
                            <br />
                            {formation.date_fin != undefined
                              ? `Date de fin : ${formation.date_fin}`
                              : null}
                          </p>
                        </div>
                      ))}
                      {item.infor.formations.length === 0 && (
                        <p>Aucune formation</p>
                      )}
                    </fieldset>
                    <fieldset>
                      <legend>Expériences</legend>
                      {item.infor.experienses.length > 0 ? (
                        item.infor.experienses.map((experience, index) => (
                          <div key={index} className="experience-item">
                            <p>Société : {experience.societe}</p>
                            <p>
                              {experience.type === "Autre"
                                ? `Type de poste : ${experience.otherType}`
                                : experience.type === "Employée"
                                ? `Type de poste : ${experience.type} :: ${experience.post}`
                                : `Type de poste : ${experience.type}`}
                            </p>
                            <p>Date de début : {experience.date_debut}</p>
                            <p>Date de fin : {experience.date_fin}</p>
                          </div>
                        ))
                      ) : (
                        <p>Aucune expérience</p>
                      )}
                    </fieldset>
                    <fieldset>
                      <legend>Projets</legend>
                      {item.infor.projets.length > 0 ? (
                        item.infor.projets.map((projet, index) => (
                          <div key={index} className="projet-item">
                            <p>Titre : {projet.title}</p>
                            <p>Type du projet : {projet.type}</p>
                            <p>Languages : {projet.language}</p>
                            <p>Descriptions : {projet.description}</p>
                          </div>
                        ))
                      ) : (
                        <p>Aucun projet</p>
                      )}
                    </fieldset>
                    <fieldset>
                      <legend>Skills</legend>
                      {item.infor.skills != undefined ? (
                        <p>Skill: {item.infor.skills}</p>
                      ) : (
                        <p>Aucun skill</p>
                      )}
                    </fieldset>
                    <fieldset>
                      <legend>Files</legend>
                      {item.infor.files.length > 0 ? (
                        item.infor.files.map((file, index) => (
                          <div key={index}>
                            {/* Afficher les fichiers ici */}
                          </div>
                        ))
                      ) : (
                        <p>Aucun fichier</p>
                      )}
                    </fieldset>
                  </div>
                </Modal>
              </td>
              <td>{item.email}</td>
              <td>{item.userphone}</td>
              <td>
                <span
                  className={
                    item.status === "Accepté"
                      ? "acceptee"
                      : item.status === "Refusé"
                      ? "refusee"
                      : item.status === "Demande en cours"
                      ? "demandee"
                      : item.status === "Archivé"
                      ? "archivee"
                      : "encours"
                  }
                >
                  {item.status}
                </span>
              </td>
              <td>
                {/* <textarea
                  className="custom-textarea"
                  rows={4}
                  value={item.remarques}
                /> */}
                <FormOutlined onClick={() => setVisible(true)} />
                <RemarqueModal open={visible} onCancel={onCancel} />
              </td>
              <td>
                <Button
                  name={item.id.toString() + "check"}
                  type="text"
                  icon={
                    <CheckCircleOutlined
                      style={{
                        fontSize: 24,
                        color: "hsla(118, 79%, 44%, 0.748)",
                      }}
                    />
                  }
                  onClick={() => handleSave(item.id, "Accepté")}
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                  disabled={
                    item.status === "En cours de stage" ||
                    item.status === "Archivé" ||
                    item.status === "Accepté"
                  }
                ></Button>
              </td>
              <td>
                <Button
                  name={item.id.toString() + "close"}
                  type="text"
                  icon={
                    <CloseCircleOutlined
                      style={{
                        fontSize: 24,
                        color: "#f00",
                      }}
                    />
                  }
                  onClick={() => handleSave(item.id, "Refusé")}
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                  disabled={item.status === "Refusé"}
                ></Button>
              </td>
              <td>
                <Button
                  name={item.id.toString() + "Add"}
                  type="text"
                  icon={
                    <FolderAddOutlined
                      style={{
                        fontSize: 24,
                        color: "rgb(113, 111, 111)",
                      }}
                    />
                  }
                  onClick={() => handleSave(item.id, "Archivé")}
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                  disabled={
                    item.status === "Demande en cours" ||
                    item.status === "Archivé" ||
                    item.status === "Refusé"
                  }
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Demandes;
