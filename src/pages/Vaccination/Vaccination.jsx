import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Row,
  Col,
  Typography,
  Divider,
  Tooltip,
  Button,
  Table,
  Modal,
  Spin,
  Card,
  Alert,
  Input,
  Select,
  message,
  Space,
  Form,
  InputNumber,
  DatePicker,
  Popconfirm,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  SettingTwoTone,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import AvatarSearch from "../../components/AvatarSearch";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { getTutorDataByDni } from "../../services/tutor.service";
import { getAllByTutorId } from "../../services/pet_association.service";
import { drugTypeService } from "../../services/drug_type.service";
import { drugService } from "../../services/drug.service";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";
import locale from "antd/lib/date-picker/locale/es_ES";
import "./Vaccination.scss";
import {
  findAllByPetId,
  vaccinationService,
  deleteVaccination,
} from "../../services/vaccination.service";
import { getAllByVeterinaryId } from "../../services/pet_association.service";
import MyContext from "../../MyContext";
const { Title, Text } = Typography;
const { Option } = Select;

export default function Vaccination() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findPet, setFindPet] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [petOptions, setPetOptions] = useState(null);
  const [searchedTutorData, setSearchedTutorData] = useState(null);
  const [tutorDni, setTutorDni] = useState(null);
  const [isSearchingTutorData, setIsSearchingTutorData] = useState(false);
  const [drugTypes, setDrugTypes] = useState([]);
  const [selectedDrugTypeId, setSelectedDrugTypeId] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [races, setRaces] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [petData, setPetData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [form] = Form.useForm();
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const { selectedVet } = useContext(MyContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await raceService.findAll().then((response) => {
        setRaces(response);
      });
      await specieService.findAll().then((response) => {
        setSpecies(response);
      });
      await drugTypeService.findAll().then((response) => {
        setDrugTypes(response);
      });
      await drugService.findAll().then((response) => {
        setDrugs(response);
      });
      setIsFetchData(true);
    };

    fetchData();
  }, [isModalOpen]);

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
        text
      ),
  });

  const refreshComponent = () => {
    getAllByVeterinaryId(profile.veterinary.id).then((associations) => {
      generatePetData(associations);
    });
    // findAllByVeterinaryId(profile.veterinary.id).then((vaccination) => {
    //   console.log(vaccination);
    // });
  };

  const generatePetData = (associations) => {
    let finalData = [];
    associations.forEach((association) => {
      console.log(association);
      finalData.push({
        key: association.pet.id,
        id: association.pet.id,
        name: association.pet.name,
        sex: association.pet.isMale === 1 ? "Macho" : "Hembra",
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
      findAllByPetId(association.pet.id).then((response) => {
        generatePetVaccinationData(association.pet.id, response);
      });
    });
    // console.log("tabla1: ", finalData);
    setPetData(finalData);
  };

  const generatePetVaccinationData = (petId, vaccinations) => {
    let finalData = [];
    // console.log("vaccinations: ", vaccinations);
    vaccinations.forEach((vaccination) => {
      finalData.push({
        key: vaccination.id,
        petId: petId === vaccination.petId ? petId : null,
        id: vaccination.id,
        placementDate: moment(vaccination.placementDate).format("DD/MM/YYYY"),
        drug: drugs.find((drug) => drug.id === vaccination.drugId).name,
        drugType: drugTypes.find(
          (drugType) =>
            drugType.id ===
            drugs.find((drug) => drug.id === vaccination.drugId).drugTypeId
        ).name,
        weight: vaccination.weight,
        signed: vaccination.signed,
        nextDate:
          vaccination.nextDate === null
            ? "-"
            : moment(vaccination.nextDate).format("DD/MM/YYYY"),
        observation: vaccination.observation,
      });
    });
    console.log("tabla2: ", finalData);
    // setVaccinatioData(finalData);
    setVaccinationData((prevData) => [...prevData, ...finalData]);
  };

  if (!isInit && isFetchData) {
    refreshComponent();
    setIsInit(true);
  }

  const renderDrugTypes = (drugTypeId) => {
    let list = [];
    drugTypes.forEach((drugType) => {
      if (drugType.id !== drugTypeId) {
        list.push(
          <Select.Option key={drugType.id} value={drugTypeId}>
            {drugType.name}
          </Select.Option>
        );
      } else {
        list.push(
          <Select.Option key={drugType.id} value={drugType.id}>
            {drugType.name}
          </Select.Option>
        );
      }
    });
    return list;
  };

  const onDrugTypeChange = (drugTypeId) => {
    setSelectedDrugTypeId(drugTypeId);
  };
  const renderDrugs = (drugTypeId) => {
    let list = [];
    // console.log(drug);
    if (selectedDrugTypeId !== null || drugTypeId !== null) {
      // console.log(selectedDrugTypeId);

      drugs.forEach((drug) => {
        // console.log(drug.drugTypeId);
        if (drug.drugTypeId === selectedDrugTypeId) {
          // console.log(drug);
          list.push(
            <Select.Option key={drug.id} value={drug.id}>
              {drug.name}
            </Select.Option>
          );
        }
      });
    }
    return list;
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setTutorDni(null);
    setFindPet(true);
    setSelectedDrugTypeId(null);
    setDrugs(null);
    setPetOptions(null);
    setSelectedPetId(null);
    setSearchedTutorData(null);
    sessionStorage.removeItem("tutor");
    sessionStorage.removeItem("petId");
    setIsModalOpen(false);
    window.location.replace("");
  };

  const refreshDni = (e) => {
    setSearchedTutorData(null);
    setPetOptions(null);
    setSelectedPetId(null);
    setTutorDni(e.target.value);
  };

  const searchTutorData = () => {
    setIsSearchingTutorData(true);
    getTutorDataByDni(tutorDni)
      .then((res) => {
        // setSearchedTutorData(res);
        setIsSearchingTutorData(false);
        getAllByTutorId(res.tutor.id).then((pets) => {
          const petsArray = pets
            .filter(
              (item) =>
                item.veterinaryData.veterinary.id === profile.veterinary.id ||
                item.vetData.id === selectedVet.value
            )
            .map((item) => item.pet);
          petsArray.length === 0
            ? setSearchedTutorData(null)
            : setSearchedTutorData(res);
          console.log(petsArray);
          setPetOptions(generatePetOptions(petsArray));
        });
        // getPetsByTutorId(res.tutor.id).then((pets) => {
        //   setPetOptions(generatePetOptions(pets));
        // });
        sessionStorage.setItem("tutor", JSON.stringify(res));
      })
      .catch((error) => {
        message.error(error.response.data);
        setIsSearchingTutorData(false);
      });
  };

  const generatePetOptions = (pets) => {
    var renderPetOptions = [];
    pets.forEach(function eachPet(pet) {
      renderPetOptions.push(<Option key={pet.id}>{pet.name}</Option>);
    });
    return renderPetOptions;
  };
  const refreshSelectedPet = (value) => {
    setSelectedPetId(value);
    sessionStorage.setItem("petId", JSON.stringify(value));
  };

  const handleItemTreatmentChange = (field, value, id) => {
    if (field === "drugTypeId") {
      onDrugTypeChange(Number(value));
    }
  };

  const createVaccination = (values) => {
    let newVaccination = {
      petId: Number(selectedPetId),
      drugId: values.drugId,
      drugTypeId: Number(values.drugTypeId),
      placementDate: new Date().toISOString(),
      weight: values.weight,
      signed: values.signed === undefined ? false : values.signed,
      nextDate: values.nextDate === undefined ? null : moment(values.nextDate),
      observation: values.observation === undefined ? null : values.observation,
      veterinaryId: profile.veterinary.id,
      vetId: selectedVet?.value,
    };
    // console.log("Received values of form: ", values);
    // console.log("New vaccination: ", newVaccination);
    vaccinationService
      .registerVaccination(newVaccination)
      .then((res) => {
        console.log(res);
        message.success("Vacunación registrada");
        hideModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response.data);
      });
  };
  const confirm = (id) => {
    message.success("Vacunación borrada");
    deleteVaccination(id);
    window.location.replace("");
  };

  const expandedRowRender = (pet) => {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        width: 50,
        responsive: ["sm"],
      },
      {
        title: "Fecha",
        dataIndex: "placementDate",
        key: "placementDate",
        defaultSortOrder: "descend",
        sorter: (a, b) => {
          const dateA = moment(a.placementDate, "DD/MM/YYYY");
          const dateB = moment(b.placementDate, "DD/MM/YYYY");
          return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        },
        // width: 120,
        // responsive: ["sm"],
      },
      {
        title: "Profilaxis",
        dataIndex: "drugType",
        key: "drugType",
        sorter: (a, b) => a.drugType.length - b.drugType.length,
        width: 150,
      },
      {
        title: "Droga",
        dataIndex: "drug",
        key: "drug",
        sorter: (a, b) => a.drug.length - b.drug.length,
        // width: 100,
        // responsive: ["xs"],
      },

      {
        title: "Peso (Kg)",
        dataIndex: "weight",
        key: "weight",
        sorter: (a, b) => a.weight - b.weight,
        // responsive: ["xs"],
        // align: "center",
        width: 150,
      },
      {
        title: "Proxima Vacuna",
        dataIndex: "nextDate",
        key: "nextDate",
        // responsive: ["sm"],
        sorter: (a, b) => {
          const dateA = moment(a.nextDate, "DD/MM/YYYY");
          const dateB = moment(b.nextDate, "DD/MM/YYYY");
          return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        },
        responsive: ["sm"],
      },
      {
        title: "Observaciones",
        dataIndex: "observation",
        key: "observation",
        responsive: ["sm"],
        ellipsis: true,
      },
      {
        title: "Firma",
        dataIndex: "signed",
        key: "signed",
        width: 70,
        align: "center",
        render: (text, record) => (
          <>
            {record.signed ? (
              <CheckCircleTwoTone
                style={{ fontSize: 20 }}
                twoToneColor={"#52c41a"}
              />
            ) : (
              <CloseCircleTwoTone
                style={{ fontSize: 20 }}
                twoToneColor={"#f5222d"}
              />
            )}
          </>
        ),
      },
      {
        title: "Acciones",
        dataIndex: "actions",
        fixed: "right",
        align: "center",
        // width: 50,
        // responsive: ["md"],
        render: (_, record, index) => (
          <>
            <Tooltip placement="top" title="Borrar la vacuna">
              <Popconfirm
                title="¿Seguro que quieres borrar esta vacuna?"
                placement="left"
                onConfirm={() => confirm(record.id)}
                cancelText="Cancelar"
                okText="Borrar"
                // onConfirm={() => deleteClinicalRecord(indexIdForButton)}
                icon={<WarningOutlined style={{ color: "red" }} />}
              >
                <Button shape="circle" danger size="default">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
          </>
        ),
      },
    ];
    const petVaccinations = vaccinationData.filter(
      (vaccination) => vaccination.petId === pet.id
    );

    return (
      <Table
        columns={columns}
        dataSource={petVaccinations}
        pagination={false}
        bordered
        size="small"
      />
    );
  };

  const columns = [
    {
      title: "ID Mascota",
      dataIndex: "id",
      key: "id",
      width: 150,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      // responsive: ["md"],
    },
    {
      title: "Nombre Mascota",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Tutor",
      dataIndex: "tutorName",
      key: "tutorName",
      ...getColumnSearchProps("tutorName"),
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      // responsive: ['sm']
    },
    {
      title: "Especie",
      dataIndex: "especie",
      key: "especie",
      sorter: (a, b) => a.especie.length - b.especie.length,
      // responsive: ['md']
    },
    {
      title: "Raza",
      dataIndex: "raza",
      key: "raza",
      sorter: (a, b) => a.raza.length - b.raza.length,
      // responsive: ['md']
    },
    {
      title: "Sexo",
      dataIndex: "sex",
      key: "sex",
      sorter: (a, b) => a.sex.length - b.sex.length,
      // responsive: ['md']
    },
  ];

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title className="appTitle">Vacunación y otras profilaxis</Title>
        </Col>
        <Col span={2}>
          <Tooltip title="Agregar nueva vacuna" placement="right">
            <Button
              type="link"
              className="appButton"
              size="large"
              icon={<VaccinesOutlinedIcon fontSize="large" />}
              onClick={showModal}
            />
          </Tooltip>
        </Col>
      </Row>
      <Divider orientation="center"></Divider>
      <Table
        columns={columns}
        dataSource={petData}
        scroll={{ x: 500 }}
        expandable={{
          expandedRowRender: (pet) => expandedRowRender(pet),
          defaultExpandedRowKeys: [0],
          columnWidth: 50,
        }}
        // onChange={onChange}
      />
      <Modal
        title="Nueva vacuna"
        visible={isModalOpen}
        onCancel={hideModal}
        cancelText="Cancelar"
        okText="Guardar"
        okButtonProps={{ disabled: findPet, className: "stepSave" }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              createVaccination(values);
              // onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {findPet ? (
          <Card
            bordered={false}
            actions={[
              <Col>
                {selectedPetId ? (
                  <Col xs={{ span: 24 }} md={{ span: 4, offset: 10 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="register-form_button-ok-modal"
                      onClick={() => {
                        // createVaccination();
                        setFindPet(false);
                      }}
                      shape="round"
                    >
                      Generar
                    </Button>
                  </Col>
                ) : (
                  <div style={{ marginLeft: "2%", marginRight: "2%" }}>
                    <Alert
                      message={
                        searchedTutorData ? (
                          <Text>
                            Debes seleccionar una{" "}
                            <Text keyboard strong>
                              MASCOTA
                            </Text>{" "}
                            para poder generar la vacunacion
                          </Text>
                        ) : (
                          <Text>
                            Debes seleccionar un{" "}
                            <Text keyboard strong>
                              TUTOR
                            </Text>{" "}
                            para poder crear la vacunacion
                          </Text>
                        )
                      }
                      type="info"
                      icon={<SettingTwoTone twoToneColor="#523c89" spin />}
                      showIcon
                    ></Alert>
                  </div>
                )}
              </Col>,
            ]}
          >
            <Row>
              <Col style={{ marginBottom: "1%" }}>
                <Typography.Text>
                  Ingrese DNI del tutor de la mascota:
                </Typography.Text>
              </Col>
              <Col xs={{ span: 24 }}>
                <Input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  placeholder="DNI del tutor a buscar"
                  onChange={refreshDni}
                  allowClear
                />
              </Col>
              <Col xs={{ span: 24 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%", marginTop: "2%" }}
                  onClick={searchTutorData}
                  className="register-form_button-ok-modal"
                >
                  Buscar tutor
                </Button>
              </Col>
            </Row>
            <br></br>
            <Row span={5}>
              {searchedTutorData ? (
                <Col xs={{ span: 24 }}>
                  <AvatarSearch
                    person={searchedTutorData.person}
                  ></AvatarSearch>
                </Col>
              ) : isSearchingTutorData ? (
                <>
                  <Spin />
                  Buscando...
                </>
              ) : (
                <Col xs={{ span: 24 }}>
                  <Alert
                    message="Aun no has seleccionado ningún tutor"
                    type="warning"
                  />
                </Col>
              )}
            </Row>
            <Row>
              {searchedTutorData ? (
                <>
                  <Col
                    xs={{ span: 24 }}
                    style={{ marginBottom: "1%", marginTop: "3%" }}
                  >
                    <Typography.Text>Seleccione una mascota:</Typography.Text>
                  </Col>
                  <Col xs={{ span: 24 }}>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Seleccione la mascota a atender"
                      onChange={refreshSelectedPet}
                    >
                      {petOptions}
                    </Select>
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>
          </Card>
        ) : (
          <Form
            layout="horizontal"
            requiredMark={false}
            form={form}
            // onFinish={createVaccination(values)}
            // wrapperCol={wrapper}
            labelCol={{ sm: { span: 6 }, xs: { span: 5 } }}
          >
            <Col>
              <Form.Item
                name={"weight"}
                label="Peso: "
                rules={[
                  { required: true, message: "Por favor ingrese el peso" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Ingrese el peso"
                  min={0}
                  addonAfter="Kg"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"drugTypeId"}
                label="Profilaxis: "
                tooltip={{
                  title: "clasificacion ",
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione el tipo de droga",
                  },
                ]}
              >
                <Select
                  placeholder="Seleccione el tipo de droga"
                  allowClear
                  onChange={(value) =>
                    handleItemTreatmentChange("drugTypeId", value, 0)
                  }
                >
                  {renderDrugTypes()}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"drugId"}
                label="Droga: "
                tooltip={{
                  title: "drogas ",
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  { required: true, message: "Por favor ingrese la droga" },
                ]}
              >
                <Select placeholder="Seleccione la droga" allowClear>
                  {renderDrugs(selectedDrugTypeId)}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"signed"}
                valuePropName="checked"
                label="Firma: "
                tooltip={{
                  title:
                    "Este firmado no reemplaza el firmado del carnet de vacunacion.",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Checkbox size="large">Desea firmar esta vacunacion?</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"nextDate"}
                label="Proxima fecha: "
                tooltip={{
                  title: "Proxima fecha de vacunacion ",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  locale={locale}
                  disabledDate={disabledDate}
                  placeholder="Fecha"
                  className="appDatePicker"
                  format={"DD/MM/yyyy"}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"observation"}
                label="Observacion: "
                tooltip={{
                  title: "Alguna observacion ",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  name="observation"
                  rows={4}
                  allowClear
                  placeholder="Ingrese alguna observacion"
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Form>
        )}
      </Modal>
    </>
  );
}
