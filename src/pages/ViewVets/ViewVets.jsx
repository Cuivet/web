import React from "react";
import VetsMap from "../../components/VetsMap";
import { Col, Divider, Row, Typography } from "antd";
const { Title } = Typography;

const ViewVets = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Mapa de Clínicas Veterinarias</Title>
          <Divider style={{ margin: "10px" }}></Divider>
        </Col>
        <Col span={24}>
          <VetsMap />
        </Col>
      </Row>
    </>
  );
};

export default ViewVets;
