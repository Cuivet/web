import React, { useState } from "react";
import { getVetsByVetOwnerId } from "../../services/vet.service";
import { Row, Col, Typography, Tooltip, Button, Drawer, Divider } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import clinica from "../../assets/img/jpg/clinica.jpg";
import CardVet from "../../components/CardVet";
import RegisterVetForm from "../../components/RegisterVetForm/RegisterVetForm";

const { Title } = Typography;

export default function Vets() {
  const [isInit, setIsInit] = useState(false);
  const [vets, setVets] = useState([]);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [vetToDisplay, setVetToDisplay] = useState(null);

  if (!isInit) {
    setIsInit(true);
    getVetsByVetOwnerId(profile.vetOwner.id).then((response) => {
      setVets(response);
    });
  }

  const showDrawer = () => {
    setDisplayDrawer(true);
  };

  const onClose = () => {
    setVetToDisplay(null);
    setDisplayDrawer(false);
  };
  const displayVet = (id) => {
    setVetToDisplay(vets.find((vet) => vet.vet.id === id));
    setDisplayDrawer(true);
  };

  const tieneRegente = (vet) => {
    var texto = "";
    if (vet?.veterinaryData) {
      texto =
        "Regente: " +
        `${vet?.veterinaryData?.person.name} ${vet?.veterinaryData?.person.lastName}`;
    }
    return texto;
  };

  function Vet() {
    const renderVetList = [];
    if (vets.length) {
      vets.forEach((vet) => {
        renderVetList.push(
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <CardVet
              showVet={displayVet}
              key={vet.vet.id}
              item={vet.vet.id}
              title={vet.vet.name}
              popTitle={"¿Está seguro que desea borrar la clínica?"}
              img={vet.vet.photo ? vet.vet.photo : clinica}
              description={{
                address: vet.vet.address,
                hours: vet?.hours,
              }}
              regent={tieneRegente(vet)}
            ></CardVet>
          </Col>
        );
      });
    }
    return renderVetList;
  }

  function renderDrawer() {
    return (
      <Drawer
        title={
          vetToDisplay
            ? "Editar mi clínica"
            : "Registrar nueva clínica veterinaria"
        }
        onClose={onClose}
        visible={true}
        // size="large"
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <RegisterVetForm
          vet={vetToDisplay}
          registeredVet={registeredVet}
        ></RegisterVetForm>
      </Drawer>
    );
  }

  const registeredVet = () => {
    setIsInit(false);
    setVetToDisplay(null);
    setDisplayDrawer(false);
  };

  return (
    <>
      <Row>
        <Col span={22}>
          <Title className="appTitle">Mis Clínicas Veterinarias</Title>
        </Col>
        <Col span={2}>
          <Tooltip title="Agregar clínica veterinaria" placement="right">
            <Button
              type="link"
              className="appButton"
              size="large"
              onClick={showDrawer}
              icon={<PlusCircleOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
      <Divider></Divider>
      {displayDrawer ? renderDrawer() : null}
      <Row>
        {vets.length ? Vet() : null}
      </Row>
    </>
  );
}
