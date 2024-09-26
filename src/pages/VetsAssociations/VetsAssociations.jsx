//MARTINA
import React, { useState } from "react";
import Meta from "antd/lib/card/Meta";
import {
  Col,
  Row,
  Typography,
  Button,
  Divider,
  Card,
  Popconfirm,
  message,
  Tooltip,
  Modal,
  Input,
  Badge,
} from "antd";
import Icon, {
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import SyncDisabledOutlinedIcon from "@mui/icons-material/SyncDisabledOutlined";
import clinica from "../../assets/img/jpg/clinica.jpg";

import {
  getTemporalAssociationByCode,
  registerRegentOnVet,
} from "../../services/vet.service";
import { veterinaryAssociationService } from "../../services/veterinary_association.service";
const { Title } = Typography;

export default function VetsAssociations(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(false);
  const [completeTemporalAssociation, setCompleteTemporalAssociation] =
    useState(null);
  const [veterinaryAssociationDataList, setVeterinaryAssociationDataList] =
    useState([]);
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (!isInit) {
    refreshComponent();
    setIsInit(true);
  }

  const confirm = (e) => {
    message.success("Clínica desasociada exitosamente.");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setGeneratedCode(null);
    setCompleteTemporalAssociation(null);
  };

  const refreshCode = (e) => {
    setGeneratedCode(e.target.value);
  };

  const tryToAsociate = () => {
    if (generatedCode === null || generatedCode === "" || !generatedCode) {
      return message.error("Debe ingresar un código para asociarse");
    } else {
      if (generatedCode[0] === "V") {
        veterinaryAssociationService
          .getTemporalAssociationByCode(generatedCode)
          .then((temporalAsociation) => {
            setCompleteTemporalAssociation(temporalAsociation);
          })
          .catch((error) => {
            return message.error(error.response.data);
          });
      } else if (generatedCode[0] === "R") {
        getTemporalAssociationByCode(generatedCode)
          .then((temporalAsociation) => {
            setCompleteTemporalAssociation(temporalAsociation);
          })
          .catch((error) => {
            return message.error(error.response.data);
          });
      } else {
        return message.error("El código ingresado es erróneo");
      }
    }
  };

  const createAssociation = () => {
    if (generatedCode[0] === "R") {
      createRegentAssociation();
    } else {
      createVeterinaryAssociation();
    }
  };

  const createRegentAssociation = () => {
    const regentAssociation = {
      id: completeTemporalAssociation.vetData.vet.id,
      name: completeTemporalAssociation.vetData.vet.name,
      phone: completeTemporalAssociation.vetData.vet.phone,
      address: completeTemporalAssociation.vetData.vet.address,
      vetOwnerId: completeTemporalAssociation.vetData.vet.vetOwnerId,
      veterinaryId: profile.veterinary.id,
    };
    registerRegentOnVet(regentAssociation).then(() => {
      message.success("Asociación establecida exitosamente");
      setIsInit(false);
      window.location.replace("");
    });
  };

  const createVeterinaryAssociation = () => {
    const veterinaryAssociations = [];
    const veterinaryAssociation = {
      vetId: completeTemporalAssociation.vetData.vet.id,
      veterinaryId: completeTemporalAssociation.veterinaryData.veterinary.id,
    };
    veterinaryAssociations.push(veterinaryAssociation);
    veterinaryAssociationService.register(veterinaryAssociations).then(() => {
      message.success("Asociación establecida exitosamente");
      setIsInit(false);
      window.location.replace("");
    });
  };

  function refreshComponent() {
    veterinaryAssociationService
      .getAllDataByRegentOrVeterinary(profile.veterinary.id)
      .then((assocData) => {
        setVeterinaryAssociationDataList(assocData);
      });
    setIsModalOpen(false);
    setGeneratedCode(false);
    setCompleteTemporalAssociation(null);
  }

  //renderizado de cards de clinicas
  function returnRegentAssociationCards() {
    var renderAssociationCards = [];
    veterinaryAssociationDataList.forEach((association) => {
      const isRegent =
        association.vetData.regentData.veterinary.id === profile.veterinary.id
          ? true
          : false;
      renderAssociationCards.push(
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Badge.Ribbon
            text={isRegent ? "Regente" : "Co-Veterinario"}
            color={isRegent ? "pink" : "purple"}
          >
            <Card
              className="appCard"
              hoverable
              cover={<img alt="required text" src={clinica}></img>}
              actions={[
                <Popconfirm
                  title="¿Está seguro que desea desasociar clínica veterinaria?"
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
                  <Icon>
                    <SyncDisabledOutlinedIcon key="delete" />
                  </Icon>
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
                    {association.vetData.vet.name}
                  </Typography.Title>
                }
                description={
                  <>
                    <Row>
                      <Typography.Text type="primary">
                        {"Veterinario Regente: " +
                          association.vetData.regentData.person.name +
                          " " +
                          association.vetData.regentData.person.lastName}
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Typography.Text type="primary">
                        {"Dirección: " + association.vetData.vet.address}
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
    return renderAssociationCards;
  }

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title className="appTitle">
            Mis clínicas Veterinarias Asociadas
          </Title>
        </Col>
        <Col span={2}>
          <Tooltip title="Asociar Clínica" placement="right">
            <Button
              type="link"
              className="appButton"
              size="large"
              icon={<SyncOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </Col>
      </Row>

      <Divider></Divider>

      <Row>
        {veterinaryAssociationDataList.length ? (
          returnRegentAssociationCards()
        ) : (
          <Col span={24}>Aún no tienes clínicas asociadas</Col>
        )}
      </Row>
      <Modal
        title="Asociarse con una clínica veterinaria"
        visible={isModalOpen}
        footer={[
          <Button
            type="default"
            onClick={hideModal}
            className="register-form__button-cancel-modal"
          >
            Cancelar
          </Button>,
          <>
            {completeTemporalAssociation ? (
              <Button
                htmlType="submit"
                type="primary"
                onClick={createAssociation}
                className="register-form_button-ok-modal"
              >
                Asociar
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                onClick={tryToAsociate}
                className="register-form_button-ok-modal"
              >
                Buscar
              </Button>
            )}
          </>,
        ]}
      >
        {completeTemporalAssociation ? (
          <>
            <Row>
              <Col span={24}>
                <Typography.Title level={3}>
                  {`Clínica Veterinaria: ${completeTemporalAssociation.vetData.vet.name}`}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title level={4} type="secondary">
                  {`Dirección: ${completeTemporalAssociation.vetData.vet.address}`}
                </Typography.Title>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>
                  Ingrese código de asociación:
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  name="phone"
                  placeholder="Código de asociación"
                  onChange={refreshCode}
                />
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}
