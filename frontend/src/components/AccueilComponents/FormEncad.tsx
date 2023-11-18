import React, { useState } from "react";

const FormEncadrent: React.FC = () => {
  const [modalStates, setModalStates] = useState();

  const showModal = (index: number) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
  };
  return <></>;
};

export default FormEncadrent;
