import React from "react";
import { Modal } from "antd";
import "../../assets/Accueil.css";

interface UserData {
  id: number;
  username: string;
  email: string;
  userphone: string;
  status: string;
  infor: InformationUser;
}

interface InformationUser {
  stagiaires: {
    id: number;
    name: string;
    projet: string;
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
  return (
    <Modal
      open={open}
      footer={null}
      className="modal-Encadr"
      onCancel={onCancel}
    >
      <form id="msform">
        <fieldset style={{ display: "block" }}>
          <h2 className="fs-title">Ajouter un encadrant</h2>
          <h3 className="fs-subtitle">Remplir les cordoonnées suivants:</h3>
          <br />
          <input name="nom" type="text" placeholder="Nom Complet" />
          <input name="email" type="email" placeholder="E-Mail" />
          <input name="tel" type="number" placeholder="Téléphone" />
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
