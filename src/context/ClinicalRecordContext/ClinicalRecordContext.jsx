import React, { createContext, useContext, useState } from "react";

const EditContext = createContext();

export const useEditContext = () => {
  return useContext(EditContext);
};

export const EditProvider = ({ children }) => {
  const [disabled, setIsDisabled] = useState(false);

  const toggleEdit = () => {
    setIsDisabled((prevDisabled) => !prevDisabled);
  };
  return (
    <EditContext.Provider value={{ disabled, toggleEdit }}>
      {children}
    </EditContext.Provider>
  );
};
