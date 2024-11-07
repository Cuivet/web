import React from "react";
import AllVets from "../../components/Vets"; // Ajusta la ruta según tu estructura de directorios
import { Col, Divider, Row, Typography } from "antd";
const { Title } = Typography;

const VetsList = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Gestión de Clínicas Veterinarias</Title>
          <Divider style={{ margin: "10px" }}></Divider>
        </Col>
        <Col span={24}>
          <AllVets />
        </Col>
      </Row>
    </>
  );
};

export default VetsList;
