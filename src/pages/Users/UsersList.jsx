import React from "react";
import AllUsers from "../../components/Users";
import { Col, Divider, Row, Typography } from "antd";
const { Title } = Typography;

const UsersList = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Gestión de Usuarios</Title>
          <Divider style={{ margin: "10px" }}></Divider>
        </Col>
        <Col span={24}>
          <AllUsers />
        </Col>
      </Row>
    </>
  );
};

export default UsersList;
