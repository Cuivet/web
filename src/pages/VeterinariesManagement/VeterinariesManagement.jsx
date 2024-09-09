import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Divider,
  Input,
  Select,
  Typography,
  Tooltip,
  Modal,
  Spin,
  message,
} from "antd";
import { NodeIndexOutlined } from "@ant-design/icons";
import SyncDisabledOutlinedIcon from "@mui/icons-material/SyncDisabledOutlined";
import {
  getVetsByVetOwnerId,
  registerTemporalAssociation,
  getAllByRegentId,
} from "../../services/vet.service";
import { getVeterinaryDataByMP } from "../../services/veterinary.service";
import { veterinaryAssociationService } from "../../services/veterinary_association.service";
import AvatarSearch from "../../components/AvatarSearch";
import MyContext from "../../MyContext";
const { Option } = Select;
const { Title } = Typography;

export default function VeterinariesManagement() {
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const { selectedVet } = useContext(MyContext);
  const [isInit, setIsInit] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(false);
  const [vetOptions, setVetOptions] = useState(null);
  const [selectedVetId, setSelectedVetId] = useState(null);
  const [mp, setMP] = useState(null);
  const [completeTemporalAssociation, setCompleteTemporalAssociation] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isSearchingVeterinaryData, setIsSearchingVeterinaryData] =
    useState(false);
  const [searchedVeterinaryData, setSearchedVeterinaryData] = useState(null);
  const [isModalVetOwner, setIsModalVetOwner] = useState(false);
  const [isModalRegent, setIsModalRegent] = useState(false);

  if (!isInit) {
    if (profile.vetOwner != null) {
      setIsOwner(true);
      getVetsByVetOwnerId(profile.vetOwner.id).then((vets) => {
        setVetOptions(generateVetOptionsForOwner(vets));
        generateDataOwner(vets);
      });
    } else {
      setIsOwner(false);
      getAllByRegentId(profile.veterinary.id).then((vets) => {
        setVetOptions(generateVetOptionsForRegent(vets));
      });
      veterinaryAssociationService
        .getAllCoVeterinariesDataByRegent(profile.veterinary.id)
        .then((associations) => {
          generateDataRegent(associations);
        });
    }
    setSearchedVeterinaryData(null);
    refreshComponent();
    setIsInit(true);
  }

  function generateVetOptionsForOwner(vets) {
    let renderVetOptions = [];
    if (!vets || vets.length === 0) {
      renderVetOptions.push(
        <Option key="no-vets" disabled>
          No tiene veterinarias registradas
        </Option>
      );
    } else {
      vets?.forEach(function eachVet(vet) {
        renderVetOptions.push(<Option key={vet.vet.id}>{vet.vet.name}</Option>);
      });
    }
    return renderVetOptions;
  }

  function generateVetOptionsForRegent(vets) {
    let renderVetOptions = [];
    vets.forEach(function eachVet(vet) {
      renderVetOptions.push(<Option key={vet.id}>{vet.name}</Option>);
    });
    return vets.map((vet) => (
      <Option key={vet.id} value={vet.id}>
        {vet.name}
      </Option>
    ));
  }

  function refreshComponent() {
    setVetOptions(null);
    setSelectedVetId(null);
    setIsModalRegent(false);
    setIsModalVetOwner(false);
    setGeneratedCode(false);
    setMP(null);
    setCompleteTemporalAssociation(null);
    setIsLoading(false);
  }

  function generateDataOwner(vets) {
    var finalData = [];
    vets.forEach((vet) => {
      if (vet.veterinaryData === null) {
        return;
      }
      finalData.push({
        key: vet.vet.id,
        matricula: vet.veterinaryData.veterinary.mp,
        name: vet.veterinaryData.person.name,
        lastName: vet.veterinaryData.person.lastName,
        phone: vet.veterinaryData.person.phone,
        vet: vet.vet.name,
        regent: regent[0],
        actions:
          regent[0] === "Si" ? (
            <Tooltip placement="top" title="Desvincular">
              <Button
                type="link"
                className="appTableButton"
                icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}
              ></Button>
            </Tooltip>
          ) : null,
        id: vet.vet.id,
        address: vet.vet.address,
      });
    });
    setData(finalData);
  }

  function generateDataRegent(associations) {
    var finalData = [];
    let filteredData = associations.filter(
      (ass) => ass.vetData.vet.id === selectedVet?.value
    );
    filteredData.forEach((association) => {
      finalData.push({
        matricula: association.coveterinaryData.veterinary.mp,
        name: association.coveterinaryData.person.name,
        lastName: association.coveterinaryData.person.lastName,
        phone: association.coveterinaryData.person.phone,
        vet: association.vetData.vet.name,
        address: association.coveterinaryData.person.address,
        actions:
          regent[0] === "Si" ? (
            <Tooltip placement="top" title="Desvincular">
              <Button
                type="link"
                className="appTableButton"
                icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}
              ></Button>
            </Tooltip>
          ) : null,
      });
    });
    setData(finalData);
  }

  const refreshSelectedVets = (value) => {
    setSelectedVetId(value);
  };

  const regent = ["Si", "No"];

  const columns = [
    {
      title: "Matrícula Profesional",
      dataIndex: "matricula",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.mp - b.mp,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      responsive: ["sm"],
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      responsive: ["md"],
    },
    // {
    // 	title: "Clínica Veterinaria",
    // 	dataIndex: "vet",
    // 	sorter: (a, b) => a.vet.length - b.vet.length,
    // 	responsive: ["md"],
    // },
    {
      title: "Dirección",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      responsive: ["md"],
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      fixed: "right",
    },
  ];

  if (isOwner) {
    columns.splice(4, 0, {
      title: "Clínica Veterinaria",
      dataIndex: "vet",
      sorter: (a, b) => a.vet.length - b.vet.length,
      responsive: ["md"],
    });
  }

  const showModalOwner = () => {
    setIsModalVetOwner(true);
  };

  const showModalRegent = () => {
    setIsModalRegent(true);
  };

  const generateCode = () => {
    setIsLoading(true);
    if (isOwner) {
      registerTemporalAssociation({ mp: mp, vetId: selectedVetId }).then(
        (response) => {
          setCompleteTemporalAssociation(response);
          setIsLoading(false);
          setGeneratedCode(true);
        }
      );
    } else {
      veterinaryAssociationService
        .registerTemporalAssociation({ mp: mp, vetId: selectedVetId })
        .then((response) => {
          setCompleteTemporalAssociation(response);
          setIsLoading(false);
          setGeneratedCode(true);
        });
    }
  };

  const hideModal = () => {
    setIsModalVetOwner(false);
    setGeneratedCode(false);
    setIsModalRegent(false);
    setIsLoading(false);
  };

  const refreshMP = (e) => {
    setSearchedVeterinaryData(null);
    setMP(e.target.value);
  };

  const searchVeterinaryData = () => {
    setIsSearchingVeterinaryData(true);
    getVeterinaryDataByMP(mp)
      .then((res) => {
        setIsSearchingVeterinaryData(false);
        if (res.person.id === profile.person.id) {
          message.error("No puede asociarse con usted mismo");
        } else {
          setSearchedVeterinaryData(res);
        }
      })
      .catch((error) => {
        message.error(error.response.data);
        setIsSearchingVeterinaryData(false);
      });
  };

  useEffect(() => {
    if (selectedVet && selectedVet?.value) {
      setIsLoading(true);
      setSelectedVetId(selectedVet.value);
      veterinaryAssociationService
        .getAllCoVeterinariesDataByRegent(profile.veterinary.id)
        .then((associations) => {
          const filteredData = associations.filter(
            (ass) => ass.vetData.vet.id === selectedVet.value
          );
          generateDataRegent(filteredData);
        })
        .finally(() => setIsLoading(false));
    } else {
      //aca solo los que tienen null (atencion particular)
      setData([]);
    }
  }, [selectedVet]);

  return (
    <>
      <Row align="middle">
        {!isOwner ? (
          selectedVet?.key ? (
            <>
              <Col span={22}>
                <Title className="appTitle">
                  Gestión de Co-Veterinarios para la clínica:{" "}
                  {selectedVet?.children}
                </Title>
              </Col>
              <Col span={2}>
                <Tooltip title="Asociar Co-Veterinarios" placement="right">
                  <Button
                    type="link"
                    className="appButton"
                    size="large"
                    icon={<NodeIndexOutlined />}
                    onClick={showModalRegent}
                    hidden={!selectedVet?.value}
                  />
                </Tooltip>
              </Col>
            </>
          ) : (
            <Title className="appTitle">
              No puede gestionar veterinarios para "Atencion Particular"
            </Title>
          )
        ) : (
          <>
            <Col span={22}>
              <Title className="appTitle">
                Gestión de Veterinarios Regentes en Clínicas Veterinarias
              </Title>
            </Col>
            <Col span={2}>
              <Tooltip title="Asociar Veterinario Regente" placement="right">
                <Button
                  type="link"
                  className="appButton"
                  size="large"
                  icon={<NodeIndexOutlined />}
                  onClick={showModalOwner}
                />
              </Tooltip>
            </Col>
          </>
        )}
      </Row>
      <Divider orientation="left"></Divider>

      {selectedVet?.key && (
        <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
      )}

      {/* modal para owner */}
      <Modal
        title="Generar código de asociación con Veterinario Regente"
        visible={isModalVetOwner}
        onCancel={hideModal}
        footer={[
          <Button
            type="default"
            onClick={hideModal}
            className="register-form__button-cancel-modal"
          >
            Cancelar
          </Button>,
          <>
            {generatedCode ? (
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => {
                  setIsInit(false);
                  hideModal();
                }}
                className="register-form_button-ok-modal"
              >
                Aceptar
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                onClick={generateCode}
                className="register-form_button-ok-modal"
                disabled={
                  isLoading || !searchedVeterinaryData || !selectedVetId
                }
              >
                Generar
              </Button>
            )}
          </>,
        ]}
      >
        {generatedCode ? (
          <>
            <Row>
              <Col span={24}>
                <Typography.Title level={4}>
                  {`El código generado para ${completeTemporalAssociation.veterinaryData.person.name} ${completeTemporalAssociation.veterinaryData.person.lastName} MP: ${completeTemporalAssociation.veterinaryData.veterinary.mp} es:`}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ display: "flex", justifyContent: "center" }}
                  copyable={{
                    tooltips: ["Click para copiar código", "Código copiado"],
                  }}
                >
                  {completeTemporalAssociation.code}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
            El mismo expirará en 10 minutos
          </>
        ) : (
          <>
            {isLoading ? (
              <Spin />
            ) : (
              <>
                <Row>
                  <Col span={24}>
                    <div>Ingrese la MP del Veterinario Regente a asociar</div>
                  </Col>
                  <Col span={15}>
                    <Input
                      type="number"
                      name="mp"
                      placeholder="M.P. Veterinario"
                      allowClear
                      onChange={refreshMP}
                    />
                  </Col>
                  <Col span={9}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={searchVeterinaryData}
                      className="register-form_button-ok-modal"
                      disabled={isLoading}
                    >
                      Buscar Veterinario
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <>
                    <Divider orientation="left" plain>
                      Resultado de la búsqueda
                    </Divider>
                  </>
                  {searchedVeterinaryData ? (
                    <>
                      <AvatarSearch
                        person={searchedVeterinaryData.person}
                      ></AvatarSearch>
                      <Divider
                        orientation="left"
                        plain
                        style={{ marginBottom: "2%", marginTop: "4%" }}
                      >
                        Seleccione con que clínica veterinaria desea asociarlo
                      </Divider>
                      <Col span={24}>
                        <Select
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Clínicas Veteriarias"
                          onChange={refreshSelectedVets}
                        >
                          {vetOptions}
                        </Select>
                      </Col>
                    </>
                  ) : isSearchingVeterinaryData ? (
                    <>
                      <Spin />
                      Buscando...
                    </>
                  ) : (
                    <>
                      Debe realizar una búsqueda del veterinario para poder
                      avanzar
                    </>
                  )}
                </Row>
                <br></br>
              </>
            )}
          </>
        )}
      </Modal>

      {/* modal para regente */}
      <Modal
        title="Generar código de asociación con Veterinario"
        visible={isModalRegent}
        onCancel={hideModal}
        footer={[
          <Button
            type="default"
            onClick={hideModal}
            className="register-form__button-cancel-modal"
          >
            Cancelar
          </Button>,
          <>
            {generatedCode ? (
              <Button
                htmlType="submit"
                type="primary"
                onClick={hideModal}
                className="register-form_button-ok-modal"
              >
                Aceptar
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                onClick={generateCode}
                className="register-form_button-ok-modal"
                disabled={
                  isLoading || !searchedVeterinaryData || !selectedVetId
                }
              >
                Generar
              </Button>
            )}
          </>,
        ]}
      >
        {generatedCode ? (
          <>
            <Row>
              <Col span={24}>
                <Typography.Title level={4}>
                  El código generado para{" "}
                  {completeTemporalAssociation.veterinaryData.person.name}{" "}
                  {completeTemporalAssociation.veterinaryData.person.lastName}{" "}
                  MP {completeTemporalAssociation.veterinaryData.veterinary.mp}{" "}
                  es:
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ display: "flex", justifyContent: "center" }}
                  copyable={{
                    tooltips: ["Click para copiar código", "Código copiado"],
                  }}
                >
                  {completeTemporalAssociation.code}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
            El mismo expirará en 10 minutos
          </>
        ) : (
          <>
            {isLoading ? (
              <Spin />
            ) : (
              <>
                <Row>
                  <Col span={24}>
                    <div>Ingrese la MP del Veterinario a asociar</div>
                    <Input
                      type="number"
                      name="mp"
                      placeholder="M.P. Veterinario"
                      onChange={refreshMP}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={searchVeterinaryData}
                      className="register-form_button-ok-modal"
                      disabled={isLoading}
                    >
                      Buscar Veterinario
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <>
                    <Divider orientation="left" plain>
                      {" "}
                      Resultado de la búsqueda{" "}
                    </Divider>
                  </>
                  {searchedVeterinaryData ? (
                    <>
                      <AvatarSearch
                        person={searchedVeterinaryData.person}
                      ></AvatarSearch>
                      <Divider orientation="left" plain>
                        {" "}
                        Seleccione con que clínica veterinaria desea asociarlo{" "}
                      </Divider>
                      <Select
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Clínicas Veteriarias"
                        onChange={refreshSelectedVets}
                        value={selectedVetId}
                      >
                        {vetOptions}
                      </Select>
                    </>
                  ) : isSearchingVeterinaryData ? (
                    <>
                      <Spin />
                      Buscando...
                    </>
                  ) : (
                    <>
                      Debe realizar una búsqueda del veterinario para poder
                      avanzar
                    </>
                  )}
                </Row>
                <br></br>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
