import React, { useState, useEffect } from "react";
import {
  CloseCircleOutlined,
  FolderAddOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";

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
  remarques: string;
  status: string;
  infor: InformationUser;
}

const Archive: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [dataArray, setData] = useState<UserData[]>([]);
  const [modalStates, setModalStates] = useState(
    Array(dataArray.length).fill(false)
  );

  const handleSave = (id: number) => {
    setIsSaving(true);
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5100/delete?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedDataArray = dataArray.map((item) => {
            if (item.id === id) {
              return { ...item };
            }
            return item;
          });
          setData(updatedDataArray);
          message.success("Réussie !");
        } else {
          throw new Error("Erreur lors de l'enregistrement");
        }
      } catch (error) {
        console.error(error.message);
      }

      setIsSaving(false);
    }, 2000);
  };

  const handleCancel = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setModalStates(newModalStates);
  };

  const showModal = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/stagiaires-archivees`
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
  }, []);

  return (
    <div className="tabEncad">
      <div className="header">
        <h2>Archivage</h2>
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
                <span className="archivee">{item.status}</span>
              </td>
              <td>
                <textarea
                  className="custom-textarea"
                  rows={4}
                  value={item.remarques}
                />
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
                  onClick={() => handleSave(item.id)}
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Archive;
