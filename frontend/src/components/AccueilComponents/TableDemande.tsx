import React, { useState, useEffect } from "react";
import "../../assets/Accueil.css";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FolderAddOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";

interface UserData {
  id: number;
  username: string;
  email: string;
  userphone: string;
  status: string;
  formations: { niveau: string; diplome: string; specialite: string }[];
}

const Demandes: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [dataArray, setData] = useState<UserData[]>([]);
  const [showAllStagiaires, setShowAllStagiaires] = useState(false);
  const [viewText, setViewText] = useState("View All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (id: number, status: string) => {
    setIsSaving(true);

    // Effectuer l'enregistrement ici (par exemple, une requête API)
    // Simuler une requête API pour l'enregistrement
    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/update?id=${id}&status=${status}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          // La mise à jour a réussi, mettez à jour les données manuellement
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

      // Une fois l'enregistrement terminé (simulé), mettez à jour setIsSaving(false)
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Demandes de stages</h2>
        <a href="#" className="btn" onClick={handleViewAll}>
          {viewText}
        </a>
      </div>
      {/* className="effect" */}
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
          {dataArray.map((item) => (
            <tr key={item.id}>
              <td>
                <span style={{ cursor: " pointer" }} onClick={showModal}>
                  {item.username}
                </span>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <h3>{item.username}</h3>
                  <p>
                    <PhoneOutlined /> : {item.userphone}
                  </p>
                  <p>
                    <MailOutlined /> : {item.email}
                  </p>
                  {/* <fieldset>
                    <h4>Formation(s)</h4>
                    {item.formations.map((formation) => (
                      <p>
                        {formation.niveau} en {formation.diplome} specialité{" "}
                        {formation.specialite}
                        {"."}
                      </p>
                    ))}
                  </fieldset> */}
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
                <textarea className="custom-textarea" rows={4} />
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
