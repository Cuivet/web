import React, { createContext, useState } from "react";

// Create a Context for the selected vet
export const VetContext = createContext();

export const VetProvider = ({ children }) => {
  const [selectedVetId, setSelectedVetId] = useState(null);

  return (
    <VetContext.Provider value={{ selectedVetId, setSelectedVetId }}>
      {children}
    </VetContext.Provider>
  );
};
