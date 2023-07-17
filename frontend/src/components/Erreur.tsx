import React from "react";
import { Alert } from "antd";
import FormCnx from "./FormCnx";

export const Erreur: React.FC = () => {
  return (
    <>
      <Alert
        message="Erreur"
        description="Identifiants invalides."
        type="error"
        showIcon
        closable
      />
      <FormCnx />
    </>
  );
};
