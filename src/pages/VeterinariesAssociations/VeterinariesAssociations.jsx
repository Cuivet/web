import React, { useState } from "react";
import DefaultAvatar from "../../assets/img/jpg/veterinaryAvatar.jpg";
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
  Tag,
  Tooltip,
  Modal,
  Input,
  Select,
} from "antd";
import Icon, {
  SyncOutlined,
  ExclamationCircleOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import SyncDisabledOutlinedIcon from "@mui/icons-material/SyncDisabledOutlined";
import {
  register,
  getAllByTutorId,
  deleteAssociationById,
  getTemporalAssociationByCode,
} from "../../services/pet_association.service";
import { getPetsByTutorId } from "../../services/pet.service";

const { Option } = Select;

const { Title } = Typography;

export default function VeterinariesAssociations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(false);
  const [completeTemporalAssociation, setCompleteTemporalAssociation] =
    useState(null);
  const [petOptions, setPetOptions] = useState(null);
  const [selectedPetIds, setSelectedPetIds] = useState([]);
  const [groupedAssociations, setGroupedAssociations] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (!isInit) {
    refreshComponent();
    setIsInit(true);
  }

  const confirm = (associationsIds) => {
    associationsIds.forEach((assId) => {
      deleteAssociationById(assId);
    });
    message.success("Profesional desasociado correctamente", 5);
    window.location.replace("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const tryToAsociate = () => {
    if (!generatedCode) {
      return message.error("Debe ingresar un código para asociarse");
    } else {
      getTemporalAssociationByCode(generatedCode)
        .then((temporalAsociation) => {
          getPetsByTutorId(profile.tutor.id).then((pets) => {
            setCompleteTemporalAssociation(temporalAsociation);
            setPetOptions(generatePetOptions(pets));
          });
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    }
  };

  const createAssociation = () => {
    const petAssociations = [];
    selectedPetIds.forEach((petId) => {
      petAssociations.push({
        petId: Number(petId),
        veterinaryId: completeTemporalAssociation.veterinaryData.veterinary.id,
        vetId: completeTemporalAssociation.vetData
          ? completeTemporalAssociation.vetData.id
          : null,
      });
    });
    register(petAssociations).then((response) => {
      message.success("Asociación establecida exitosamente");
      window.location.replace("");
    });
  };

  function refreshComponent() {
    getAllByTutorId(profile.tutor.id).then((associations) => {
      let groupedAssociations = [];

      associations.forEach((association) => {
        const { tutorData, vetData, veterinaryData, pet, associationId } =
          association;

        let existingGroup;

        if (vetData && vetData.id) {
          // Buscar si ya existe un grupo con el mismo tutor, veterinario y vetData
          existingGroup = groupedAssociations.find(
            (group) =>
              group.tutorData.tutor.id === tutorData.tutor.id &&
              group.vetData.id === vetData.id &&
              group.veterinaryData.veterinary.id ===
                veterinaryData.veterinary.id
          );
        } else {
          // Buscar si ya existe un grupo con el mismo veterinario sin vetData
          existingGroup = groupedAssociations.find(
            (group) =>
              group.veterinaryData.veterinary.id ===
                veterinaryData.veterinary.id && !group.vetData.id
          );
        }

        if (existingGroup) {
          // Si el grupo ya existe, agregar la mascota y el ID de la asociación
          existingGroup.pets.push(pet);
          existingGroup.associationsIds.push(associationId);
        } else {
          // Si el grupo no existe, crear uno nuevo
          groupedAssociations.push({
            veterinaryData,
            vetData: vetData || {}, // Asegurarse de que vetData no sea undefined
            tutorData,
            pets: [pet],
            associationsIds: [associationId],
          });
        }
      });

      setGroupedAssociations(groupedAssociations);
    });
    setIsModalOpen(false);
    setGeneratedCode(false);
    setCompleteTemporalAssociation(null);
    setPetOptions(null);
    setSelectedPetIds([]);
    returnAssociationCards();
  }

  function generatePetOptions(pets) {
    const renderPetOptions = [];
    pets.forEach(function eachPet(pet) {
      renderPetOptions.push(<Option key={pet.id}>{pet.name}</Option>);
    });
    return renderPetOptions;
  }

  const hideModal = () => {
    setIsModalOpen(false);
    setGeneratedCode(null);
    setCompleteTemporalAssociation(null);
  };

  const refreshCode = (e) => {
    setGeneratedCode(e.target.value);
  };

  const refreshSelectedPets = (value) => {
    setSelectedPetIds(value);
  };

  function returnAssociationCards() {
    const renderAssociationCards = [];
    groupedAssociations.forEach((association) => {
      renderAssociationCards.push(
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <Card
            className="appCard"
            hoverable
            cover={
              <img
                alt="required text"
                src={
                  association.veterinaryData.person.photo
                    ? association.veterinaryData.person.photo
                    : DefaultAvatar
                }
              ></img>
            }
            actions={[
              <Tooltip title="Desasociar" key="tooltip-desacociarse">
                <Popconfirm
                  title="¿Está seguro que desea desasociarse?"
                  onConfirm={() => confirm(association.associationsIds)}
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
                  key="popconfirm-desacociarse"
                >
                  <Icon>
                    <SyncDisabledOutlinedIcon key="delete" />
                  </Icon>
                </Popconfirm>
              </Tooltip>,
            ]}
          >
            <Meta
              className=""
              title={
                !association.vetData.id
                  ? "Atención Particular de: "
                  : "Clínica Veterinaria: "
              }
              description={
                !association.vetData.id
                  ? association.veterinaryData.person.name +
                    " " +
                    association.veterinaryData.person.lastName
                  : association.vetData.name
                //"Profesional asociado: " + association.veterinaryData.person.name + " " +  association.veterinaryData.person.lastName
              }
            />
            <br></br>
            {renderPetTags(association.pets)}
          </Card>
        </Col>
      );
    });
    return renderAssociationCards;
  }

  function renderPetTags(pets) {
    const renderedPetTags = [];
    pets.forEach((pet) => {
      renderedPetTags.push(<Tag color="purple">{pet.name}</Tag>);
    });
    return renderedPetTags;
  }

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title className="appTitle">Clínicas Veterinarias Asociadas</Title>
        </Col>
        <Col span={2}>
          <Tooltip
            title="Asociar Veterinario/Clínica Veterinaria"
            placement="right"
          >
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
        {groupedAssociations.length ? (
          returnAssociationCards()
        ) : (
          <Col span={24}>Aún no tienes veterinarios asociados</Col>
        )}
      </Row>

      <Modal
        title="Asociarse con un veterinario"
        visible={isModalOpen}
        onCancel={hideModal}
        footer={[
          <Button
            type="default"
            onClick={hideModal}
            className="register-form__button-cancel-modal"
            key="register-form__button-cancel-modal"
          >
            Cancelar
          </Button>,
          <>
            {completeTemporalAssociation ? (
              <Button
                htmlType="submit"
                type="primary"
                onClick={createAssociation}
                className="stepSave"
                disabled={selectedPetIds.length === 0}
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
                <Typography.Title level={5}>
                  Seleccione que mascotas quiere asociar con el siguiente
                  veterinario:
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ textAlign: "center", color: "#523c89" }}
                  level={3}
                >
                  <MedicineBoxOutlined />
                  {` ${completeTemporalAssociation.veterinaryData.person.name} ${completeTemporalAssociation.veterinaryData.person.lastName}`}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>
                  Con la clínica veterinaria:
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ textAlign: "center", color: "#523c89" }}
                  level={3}
                >
                  <HomeOutlined />
                  {` ${
                    completeTemporalAssociation?.vetData
                      ? completeTemporalAssociation?.vetData.name
                      : "Atención particular"
                  }`}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={
                    petOptions.length > 0
                      ? "Seleccione las mascotas a asociar"
                      : "No tiene mascotas registradas"
                  }
                  onChange={refreshSelectedPets}
                  // notFoundContent={
                  //   !!petOptions && "No tiene mascotas registradas"
                  // }
                >
                  {petOptions}
                </Select>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col span={24}>
                <Typography.Title level={5}>
                  Ingrese código de asociación brindado por el veterinario:
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  type="number"
                  name="phone"
                  placeholder="Código de asociacion"
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
