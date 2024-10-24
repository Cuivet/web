import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { List, Avatar, Card, Button, Row, Typography } from "antd"; // Importamos List, Avatar y Card de Ant Design
import { getAllVets } from "../../services/vet.service";
import vetDefault from "../../assets/img/jpg/clinica.jpg";
import "./VetsMap.scss"; // Importa el archivo SCSS

const { Meta } = Card;

const libraries = ["places"];

const VetsMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJRQ-MDC8xJmJc2PfdSQclS_mVHGul3Ic",
    libraries,
  });

  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const data = await getAllVets();
        setVets(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchVets();
  }, []);

  if (loadError) return "Error al cargar mapas";
  if (!isLoaded) return "Cargando mapas";

  return (
    <div className="container">
      <div className="list-container">
        <List
          itemLayout="horizontal"
          dataSource={vets}
          renderItem={(vet) => (
            <List.Item
              onClick={() => setSelectedVet(vet)}
              style={{
                cursor: "pointer",
                paddingBottom: "5px",
                paddingTop: "0px",
              }}
            >
              <Card
                style={{
                  width: "98%",
                  boxShadow: vet === selectedVet && "0 2px 4px #523c89",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
                hoverable
              >
                <Meta
                  avatar={
                    <Avatar
                      src={vet.photo ? vet.photo : vetDefault}
                      size={60}
                    />
                  }
                  title={vet.name}
                  description={
                    <>
                      <Row>
                        <Typography.Text type="primary">
                          {vet.address}
                        </Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text type="secondary">
                          {"Horarios de atención: "}
                        </Typography.Text>
                      </Row>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
        <Button
          shape="round"
          type="primary"
          onClick={() => setSelectedVet(null)}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Ver todas
        </Button>
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={selectedVet ? 17 : 12}
        center={
          selectedVet
            ? { lat: selectedVet.lat, lng: selectedVet.lng }
            : { lat: -31.4179, lng: -64.1836 }
        }
      >
        {vets?.map((vet) => (
          <Marker
            key={vet.id}
            position={{ lat: vet.lat, lng: vet.lng }}
            title={vet.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default VetsMap;
