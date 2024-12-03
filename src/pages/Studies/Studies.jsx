import React from "react";
import StudiesTable from "../../components/Studies";
import { Col, Divider, Row, Typography } from "antd";
const { Title } = Typography;

const StudiesList = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">
            Gestión de Estudios Complementarios
          </Title>
          <Divider style={{ margin: "10px" }}></Divider>
        </Col>
        <Col span={24}>
          <StudiesTable />
        </Col>
      </Row>
    </>
  );
};

export default StudiesList;
