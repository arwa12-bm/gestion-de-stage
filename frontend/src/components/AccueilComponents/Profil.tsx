import React from "react";
import { Result } from "antd";
import Details from "./Details";

const Profil: React.FC = () => (
  <Result
    status="500"
    title="503"
    subTitle="Désolé, une erreur s'est produite. Service non disponible!"
    extra={<Details />}
  />
);

export default Profil;
