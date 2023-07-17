import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import FilterButton from "./Filter";
import FormEncadrent from "./FormEncad";
import { FormStag } from "./FormStag";

/**
 * Uncaught TypeError: Cannot read properties of undefined (reading 'length') 130
 */
interface InformationUser {
  stagiaires: {
    id: number;
    name: string;
    projet: string;
    date_debut: string;
    date_fin: string;
  }[];
}
interface UserData {
  id: number;
  username: string;
  email: string;
  userphone: string;
  status: string;
  infor: InformationUser;
}

const Encadrant: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [dataArray, setData] = useState<UserData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [visibleFormEncadr, setVisibleFormEncadr] = useState(false);
  const [visibleFormStag, setVisibleFormStag] = useState(false);

  const handleCreate = (values: UserData) => {
    submitForm(values);
    console.log("Valeurs du formulaire:", values);
    setVisibleFormEncadr(false);
  };

  const handleCancelFormEncadr = () => {
    setVisibleFormEncadr(false);
  };

  const handleCancelFormStag = () => {
    setVisibleFormStag(false);
  };

  const handleSave = (id: number, status: string) => {
    console.log("status", status);
    console.log("id: ", id);
    console.log("OK !!");
    setVisibleFormStag(true);
    // setIsSaving(true);
    // setTimeout(async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:5100/updateEncadrent?id=${id}&status=${status}`,
    //       {
    //         method: "PUT",
    //       }
    //     );

    //     if (response.ok) {
    //       const updatedDataArray = dataArray.map((item) => {
    //         if (item.id === id) {
    //           return { ...item, status };
    //         }
    //         return item;
    //       });
    //       setData(updatedDataArray);
    //       message.success("Mise à jour réussie !");
    //     } else {
    //       throw new Error("Erreur lors de l'enregistrement");
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //   }

    //   setIsSaving(false);
    // }, 2000);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  // const handleSubmit = (
  //   e: React.FormEvent<HTMLFormElement>,
  //   values: UserData
  // ) => {
  //   console.log("HANDLESUBMIT appeleé");
  //   e.preventDefault();
  // };

  /*********** SUBMIT FUNCTION ***********/
  const submitForm = async (data: UserData): Promise<void> => {
    //console.log("SUBMITFORM appelé !!");
    try {
      const response = await fetch("http://localhost:5100/stage-demandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(selectedFilter);
        const response = await fetch(
          `http://localhost:5100/encadrents${selectedFilter}`
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
    <div className="tabEncad">
      <div className="header">
        <h2>Encadrants</h2>
        <span className="filterButtonEncd">
          <FilterButton onFilter={handleFilter} tableName="encadrents" />
        </span>
        <span
          className="addEncadrent"
          onClick={() => setVisibleFormEncadr(true)}
        >
          <PlusOutlined /> Ajouter ENCADRANT
        </span>
        <FormEncadrent
          open={visibleFormEncadr}
          //onCreate={handleCreate}
          onCancel={handleCancelFormEncadr}
          // handleSubmit={handleSubmit}
        />
      </div>
      <table>
        <thead>
          <tr>
            <td style={{ textAlign: "center" }}>Nom</td>
            <td style={{ textAlign: "center" }}>Email</td>
            <td style={{ textAlign: "center" }}>Téléphone</td>
            <td style={{ textAlign: "center" }}>Status</td>
          </tr>
        </thead>

        <tbody>
          {dataArray.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.userphone}</td>
              <td>
                <span
                  className={item.status === "Occupé" ? "occupee" : "libre"}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <Button
                  name={item.id.toString() + "check"}
                  type="text"
                  icon={
                    <PlusCircleOutlined
                      style={{
                        fontSize: 24,
                        color: "#2578c1",
                      }}
                    />
                  }
                  onClick={() =>
                    handleSave(
                      item.id,
                      "Occupé(" + item.infor.stagiaires.length + ")"
                    )
                  }
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                  disabled={item.infor.stagiaires.length === 2}
                ></Button>
                <FormStag
                  open={visibleFormStag}
                  onCancel={handleCancelFormStag}
                />
              </td>
              <td>
                <Button
                  name={item.id.toString() + "close"}
                  type="text"
                  icon={
                    <MinusCircleOutlined
                      style={{
                        fontSize: 24,
                        color: "#f00",
                      }}
                    />
                  }
                  onClick={
                    item.infor.stagiaires.length === 0
                      ? () => handleSave(item.id, "Libre")
                      : () =>
                          handleSave(
                            item.id,
                            "Occupé( + item.infor.stagiaires.length + )"
                          )
                  }
                  loading={isSaving}
                  style={{
                    marginRight: 10,
                  }}
                  disabled={item.infor.stagiaires.length === 0}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Encadrant;
