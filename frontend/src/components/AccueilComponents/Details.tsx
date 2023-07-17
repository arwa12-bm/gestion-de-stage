import React, { useState } from "react";
import { Button, Drawer, theme } from "antd";

const Details: React.FC = () => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `0px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginTop: 16 }}>
        <Button type="text" onClick={showDrawer}>
          Plus du détails
        </Button>
      </div>
      <Drawer
        title="Détails"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>
          le serveur n'est pas en mesure de traiter la requête pour le moment,
          souvent en raison d'une maintenance en cours.
        </p>
        <br />
        <p>
          le service ou la ressource demandée n'est pas accessible pour le
          moment, et l'utilisateur doit essayer à nouveau plus tard.
        </p>
      </Drawer>
    </div>
  );
};

export default Details;
