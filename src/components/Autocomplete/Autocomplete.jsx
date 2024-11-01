import React, { useState, useRef, useEffect } from "react";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Input } from "antd";
const libraries = ["places"];

const Autocomplete = ({ onPlaceSelected, value }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJRQ-MDC8xJmJc2PfdSQclS_mVHGul3Ic",
    libraries,
  });

  const searchBoxRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

  const onLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      onPlaceSelected(place);
      setInputValue(place.formatted_address);
    }
  };

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  if (loadError) return "Error al cargar mapas";
  if (!isLoaded) return "Cargando mapas";

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <Input
        addonBefore="Dirección: "
        type="text"
        name="address"
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="introduzca la dirección"
      />
    </StandaloneSearchBox>
  );
};

export default Autocomplete;
