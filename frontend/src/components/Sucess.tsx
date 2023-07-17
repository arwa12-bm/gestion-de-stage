import React from "react";
import { Button, Result } from "antd";

const Sucess: React.FC = () => (
  <Result
    status="success"
    title="Formulaire soumis avec succès !"
    subTitle="La demande numero: 2017182818828182881 peut prendre de 1-5 minutes, S'il vous plait attend."
    // extra={[
    //   <Button type="primary" key="console">
    //     Go Console
    //   </Button>,
    //   <Button key="buy">Buy Again</Button>,
    // ]}
  />
);

export default Sucess;
