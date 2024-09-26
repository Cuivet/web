import React, { useState } from "react";
import { getVetsByVetOwnerId } from "../../services/vet.service";
import {
  Row,
  Col,
  Typography,
  Tooltip,
  Button,
  Drawer,
  Divider,
  Badge,
  Card,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import clinica from "../../assets/img/jpg/clinica.jpg";
import CardPet from "../../components/CardPet";
import RegisterVetForm from "../../components/RegisterVetForm/RegisterVetForm";
import Meta from "antd/lib/card/Meta";

const { Title } = Typography;

export default function Vets() {
  const [isInit, setIsInit] = useState(false);
  const [vets, setVets] = useState([]);
  const [visible, setVisible] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (!isInit) {
    setIsInit(true);
    getVetsByVetOwnerId(profile.vetOwner.id).then((response) => {
      setVets(response);
    });
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const tieneRegente = (vet) => {
    var texto = "Regente: ";
    if (vet?.veterinaryData) {
      texto =
        texto +
        `${vet?.veterinaryData?.person.name} ${vet?.veterinaryData?.person.lastName}`;
    } else {
      texto = texto + "-";
    }
    return texto;
  };


  const confirm = (e) => {
    message.success("Clínica borrada exitosamente.");
    // deletePet(item);
    //to do borrar clínica en cascada ?
    window.location.replace("");
  };

  function vet() {
    const renderVetList = [];
    if (vets.length) {
      vets.forEach((vet) => {
        renderVetList.push(
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <Badge.Ribbon text={tieneRegente(vet)} color={"pink"}>
              <Card
                className="appCard"
                hoverable
                cover={<img alt="required text" src={clinica}></img>}
                actions={[
                  <Popconfirm
                    title="¿Está seguro que desea borrar la clínica?"
                    onConfirm={confirm}
                    okText="Si"
                    cancelText="No"
                    placement="top"
                    arrowPointAtCenter
                    icon={
                      <ExclamationCircleOutlined
                        fontSize="small"
                        style={{ color: "red" }}
                      />
                    }
                  >
                    <DeleteOutlined key="delete" />
                  </Popconfirm>,
                ]}
              >
                <Meta
                  className=""
                  title={
                    <Typography.Title
                      level={4}
                      style={{
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {vet.vet.name}
                    </Typography.Title>
                  }
                  description={
                    <>
                      <Row>
                        <Typography.Text type="primary">
                          {vet.vet.address}
                        </Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text type="primary">
                          Horarios de atención:
                        </Typography.Text>
                      </Row>
                    </>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        );
      });
    }
    return renderVetList;
  }

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
      <Drawer
        title="Registrar nueva clínica veterinaria"
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <RegisterVetForm></RegisterVetForm>
      </Drawer>
      <Row>
        {vets.length ? vet() : <>Aún no tienes veterinarios asociados</>}
      </Row>
    </>
  );
}
