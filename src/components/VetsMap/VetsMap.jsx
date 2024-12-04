import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { List, Avatar, Card, Button, Row, Typography, Empty } from "antd";
import { getAllVets } from "../../services/vet.service";
import vetDefault from "../../assets/img/jpg/clinica.jpg";
import moment from "moment";
import "./VetsMap.scss";

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
        const activeVets = data.filter(
          (vet) => vet?.active !== 0 && vet?.veterinaryId != null
        );
        setVets(activeVets);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchVets();
  }, []);

  if (loadError) return "Error al cargar mapas";
  if (!isLoaded) return "Cargando mapas";

  const addressFormatted = (address) => {
    const parts = address.split(",");
    //const formattedAddress = `${parts[0]},${parts[2]},${parts[3]}`;
    //si queremos mostrar solo calle y altura dejar la linea de abajo
    //const formattedAddress = `${parts[0]}`;
    const formattedAddress = `${parts}`;
    return formattedAddress;
  };

  return (
    <div className="container">
      {vets.length > 0 ? (
        <div className="list-container-wrapper">
          <div className="list-item-container">
            <List
              itemLayout="horizontal"
              dataSource={vets}
              renderItem={(vet) => (
                <List.Item
                  onClick={() =>
                    setSelectedVet(selectedVet === vet ? null : vet)
                  }
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
                    <Row gutter={[16, 16]} align="middle">
                      <Meta
                        avatar={
                          <Avatar
                            src={vet.photo ? vet.photo : vetDefault}
                            size={60}
                          />
                        }
                        title={vet.name}
                        description={
                          <Typography.Text type="primary">
                            {addressFormatted(vet.address)}
                          </Typography.Text>
                        }
                      />
                    </Row>
                    {selectedVet === vet && (
                      <>
                        <Row justify="center" style={{ marginTop: "16px" }}>
                          <Typography.Text type="primary">
                            {"Horarios de atención: "}
                          </Typography.Text>
                        </Row>
                        {vet.hours.map((hour, index) => (
                          <Row key={index} justify="center">
                            <Typography.Text type="secondary">
                              {hour.openTime && hour.closeTime
                                ? `${hour.dayOfWeek}: ${moment(
                                    hour.openTime,
                                    "HH:mm:ss"
                                  ).format("HH:mm")} - ${moment(
                                    hour.closeTime,
                                    "HH:mm:ss"
                                  ).format("HH:mm")}`
                                : `${hour.dayOfWeek}: Cerrado`}
                            </Typography.Text>
                          </Row>
                        ))}
                      </>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <div className="button-container" style={{ marginRight: "2%" }}>
            <Button
              shape="round"
              type="primary"
              onClick={() => setSelectedVet(null)}
              style={{ width: "100%" }}
            >
              Ver todas
            </Button>
          </div>
        </div>
      ) : (
        <Empty description="No hay veterinarias registradas" />
      )}
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
