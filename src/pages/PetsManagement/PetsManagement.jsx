import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Divider,
  Input,
  Typography,
  Tooltip,
  Modal,
  Spin,
  Space,
  message,
} from "antd";
import { SearchOutlined, FormOutlined, NodeIndexOutlined } from "@ant-design/icons";
import {
  registerTemporalAssociation,
  getAllByVeterinaryId,
} from "../../services/pet_association.service";
import { getTutorDataByDni } from "../../services/tutor.service";
import AvatarSearch from "../../components/AvatarSearch";
// import FolderOpenOutlined from "@mui/icons-material/FolderOpenOutlined";
// import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

export default function PetsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(false);
  const [tutorDni, setTutorDni] = useState(null);
  const [isSearchingTutorData, setIsSearchingTutorData] = useState(false);
  const [searchedTutorData, setSearchedTutorData] = useState(null);
  const [completeTemporalAssociation, setCompleteTemporalAssociation] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [races, setRaces] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Text mark style={{ padding: 0, backgroundColor: "#ffc069" }}>
          {text ? text.toString() : ""}
        </Text>
      ) : (
        // <Highlighter
        //   highlightStyle={{
        //     backgroundColor: '#ffc069',
        //     padding: 0,
        //   }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
        text
      ),
  });

  if (!isInit && isFetchData) {
    refreshComponent();
    setIsInit(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      await raceService.findAll().then((response) => {
        setRaces(response);
      });
      await specieService.findAll().then((response) => {
        setSpecies(response);
      });
      setIsFetchData(true);
    };
    fetchData();
  }, []);

  function refreshComponent() {
    getAllByVeterinaryId(profile.veterinary.id).then((associations) => {
      generateData(associations);
    });
    setIsModalOpen(false);
    setGeneratedCode(false);
    setTutorDni(null);
    setCompleteTemporalAssociation(null);
    setIsLoading(false);
  }

  function generateData(associations) {
    var finalData = [];
    associations.forEach((association) => {
      finalData.push({
        key: association.pet.id,
        id: association.pet.id,
        name: association.pet.name,
        tutorName:
          association.tutorData.person.lastName +
          " " +
          association.tutorData.person.name,
        dni: association.tutorData.person.dni,
        especie: species.find(
          (specie) =>
            specie.id ===
            races.find((race) => race.id === association.pet.raceId).specieId
        ).name,
        raza: races.find((race) => race.id === association.pet.raceId).name,
      });
    });
    setData(finalData);
  }

  const columns = [
    {
      title: "ID Mascota",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      responsive: ["md"],
    },
    {
      title: "Nombre Mascota",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Tutor",
      dataIndex: "tutorName",
      ...getColumnSearchProps("tutorName"),
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      // responsive: ['sm']
    },
    {
      title: "DNI Tutor",
      dataIndex: "dni",
      ...getColumnSearchProps("dni"),
      sorter: (a, b) => a.dni - b.dni,
      responsive: ["sm"],
    },
    {
      title: "Especie",
      dataIndex: "especie",
      sorter: (a, b) => a.especie.length - b.especie.length,
      // responsive: ['md']
    },
    {
      title: "Raza",
      dataIndex: "raza",
      sorter: (a, b) => a.raza.length - b.raza.length,
      // responsive: ['md']
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      fixed: "right",
      //   responsive: ["md"],
      render: (_, record) => (
        <>
          {/* <Link
            to={"/clinical-records-management"}
            // className="admin-sider__item"
          > */}
            {/* <Tooltip placement="top" title="Ver Historial Clínico">
              <Button
                shape="circle"
                size="large"
                className="margin-right"
                // icon={}
              ><FolderOutlined /></Button>
            </Tooltip> */}
          {/* </Link> */}
          <Link to={"/clinical-record-menu"} 
          className="admin-sider__item"
          >
            <Tooltip placement="top" title="Registrar nueva consulta">
              <Button
                shape="circle"
                size="large"
                className="margin-right"
                // icon={<ContentPasteOutlinedIcon />}
              ><FormOutlined /></Button>
            </Tooltip>
          </Link>
        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const generateCode = () => {
    setIsLoading(true);
    registerTemporalAssociation({
      tutorDni: tutorDni,
      veterinaryId: JSON.parse(sessionStorage.getItem("profile")).veterinary.id,
    }).then((response) => {
      setCompleteTemporalAssociation(response);
      setIsLoading(false);
      setGeneratedCode(true);
    });
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setGeneratedCode(false);
    setSearchedTutorData(null);
    setTutorDni(null);
    window.location.replace("");
  };

  const refreshDni = (e) => {
    setSearchedTutorData(null);
    setTutorDni(e.target.value);
  };

  const searchTutorData = () => {
    setIsSearchingTutorData(true);
    getTutorDataByDni(tutorDni)
      .then((res) => {
        setSearchedTutorData(res);
        setIsSearchingTutorData(false);
      })
      .catch((error) => {
        message.error(error.response.data);
        setIsSearchingTutorData(false);
      });
  };

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title className="appTitle">Mis Pacientes Asociados</Title>
        </Col>
        <Col span={2}>
          <Tooltip title="Asociar nueva mascota" placement="right">
            <Button
              type="link"
              className="appButton"
              size="large"
              icon={<NodeIndexOutlined />}
              onClick={showModal}
            />
          </Tooltip>
        </Col>
      </Row>
{/* 
      <Divider orientation="left">Filtros</Divider>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <Input placeholder="ID de la mascota..." />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <Input placeholder="Nombre de la mascota..." />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <Input placeholder="Nombre del Tutor..." />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
          <Input placeholder="DNI del Tutor..." />
        </Col>
        <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 4 }}>
          <Select defaultValue="http://" className="select-before full-width">
            <Option value="http://">Animal</Option>
            <Option value="http:///">Perro</Option>
            <Option value="https://">Gato</Option>
          </Select>
        </Col>
        <Col className="gutter-row" xs={{ span: 12 }} md={{ span: 4 }}>
          <Select defaultValue="http://" className="select-before full-width">
            <Option value="http://">Raza</Option>
            <Option value="http:///">Perro</Option>
            <Option value="https://">Gato</Option>
          </Select>
        </Col>
      </Row> */}

      <Divider orientation="left"></Divider>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        onChange={onChange}
      />

      <Modal
        title="Generar código de asociación con mascota"
        visible={isModalOpen}
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
                className="stepSave"
                disabled={isLoading || !searchedTutorData}
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
                  {` El código generado para ${completeTemporalAssociation.tutorData.person.name} ${completeTemporalAssociation.tutorData.person.lastName} es:`}
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Title
                  style={{ display: "flex", justifyContent: "center" }}
                  copyable={{
                    tooltips: ["Click para copiar", "Código copiado"],
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
                <Divider orientation="left" plain>
                  Ingrese DNI del tutor a asociar
                </Divider>
                <Row>
                  <Col span={18}>
                    <Input
                      type="number"
                      name="phone"
                      placeholder="DNI del tutor a asociar"
                      onChange={refreshDni}
                      allowClear
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={searchTutorData}
                      className="register-form_button-ok-modal"
                      disabled={isLoading}
                    >
                      Buscar tutor
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <>
                    <Divider
                      orientation="left"
                      plain
                      style={{ marginBottom: "2%", marginTop: "4%" }}
                    >
                      Resultado de la búsqueda
                    </Divider>
                  </>
                  {searchedTutorData ? (
                    <>
                      <AvatarSearch
                        person={searchedTutorData.person}
                      ></AvatarSearch>
                    </>
                  ) : isSearchingTutorData ? (
                    <>
                      <Spin />
                      Buscando...
                    </>
                  ) : (
                    <>Debe realizar una búsqueda del tutor para poder avanzar</>
                  )}
                </Row>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
