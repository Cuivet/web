import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Divider,
  Input,
  Space,
  Typography,
  Progress,
  Tooltip,
  Popconfirm,
} from "antd";
import { clinicalRecordService } from "../../services/clinical_record.service";
import { anamnesisQuestionService } from "../../services/anamnesis_question.service";
import { drugTypeService } from "../../services/drug_type.service";
import { drugService } from "../../services/drug.service";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";
import { hairColorService } from "../../services/hair_color.service";
import { petSizeService } from "../../services/pet_size.service";
import { hairLengthService } from "../../services/hair_length.service";
import { treatmentTypeService } from "../../services/treatment_type.service";
import { treatmentOptionService } from "../../services/treatment_option.service";
import {
  FilePdfOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  WarningOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import moment from "moment";

import ClinicalRecordExport from "../../components/PDFExport/ClinicalRecodExport";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Importa PDFDownloadLink

const { Title, Text } = Typography;

export default function ClinicalRecordsManagement() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [clinicalRecordPDF, setClinicalRecordPDF] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [races, setRaces] = useState([]);
  const [species, setSpecies] = useState([]);
  const [petSizes, setPetSizes] = useState([]);
  const [hairColors, setHairColors] = useState([]);
  const [hairLengths, setHairLengths] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [selectedTreatmentTypeId, setSelectedTreatmentTypeId] = useState(null);
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drugTypes, setDrugTypes] = useState([]);


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
      await anamnesisQuestionService.findAll().then((response) => {
        setQuestions(response);
      });
      await hairColorService.findAll().then((response) => {
        setHairColors(response);
      });
      await hairLengthService.findAll().then((response) => {
        setHairLengths(response);
      });
      await petSizeService.findAll().then((response) => {
        setPetSizes(response);
      });
      await treatmentTypeService.findAll().then((response) => {
        setSelectedTreatmentTypeId(response);
      });
      await treatmentOptionService.findAll().then((response) => {
        setTreatmentOptions(response);
      });
      setIsFetchData(true);
      console.log("Info obtenida" + {species})
    };

    fetchData();
  }, []);


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

  if (!isInit) {
    refreshComponent();
    setIsInit(true);
  }

  function refreshComponent() {
    clinicalRecordService
      .findAllByVeterinaryId(profile.veterinary.id)
      .then((clinicalRecords) => {
        console.log(clinicalRecords);
        generateData(clinicalRecords);
        setIsLoading(false);
        setClinicalRecordPDF(clinicalRecords);
      });
  }

  function generateData(clinicalRecords) {
    var finalData = [];
    clinicalRecords.forEach((clinicalRecord) => {
      console.log(clinicalRecord);
      finalData.push({
        key: clinicalRecord.id,
        clinicalRecordId: clinicalRecord.id,
        petName: clinicalRecord.pet.name,
        vetName: clinicalRecord.vet.name,
        tutorName:
          clinicalRecord.tutorData.person.name +
          " " +
          clinicalRecord.tutorData.person.lastName,
        progressObject: calculateProgress(clinicalRecord),
        date: moment(clinicalRecord.createdAt).format("DD/MM/YYYY"), //clinicalRecord.createdAt.slice(0, 10),
        indexIdForButton: clinicalRecord.id,
      });
    });
    setData(finalData);
  }

  function calculateProgress(clinicalRecord) {
    let percentage = 0;
    percentage = clinicalRecord.review ? percentage + 10 : percentage;
    percentage = clinicalRecord.anamnesis ? percentage + 20 : percentage;
    percentage = clinicalRecord.physicalExam ? percentage + 20 : percentage;
    percentage = clinicalRecord.presumptiveDiagnosis
      ? percentage + 20
      : percentage;
    percentage = clinicalRecord.diagnosis ? percentage + 20 : percentage;
    percentage = clinicalRecord.prognosis ? percentage + 10 : percentage;
    let fromColor = percentage === 100 ? "#008000" : "#4B0082";
    let toColor = percentage === 100 ? "#00e600" : "#BA55D3";
    return { percentage: percentage, fromColor: fromColor, toColor: toColor };
  }

  function handleDownloadPDF(petName, clinicalRecordId) {
    // Llama a refreshSpeciesAndRaces antes de generar el enlace del PDF
    

    const currentDate = moment().format("DDMMYY");
    const fileName = `${petName}_Ficha${clinicalRecordId}_${currentDate}.pdf`;
    const clinicalrecord = clinicalRecordPDF.find(record => record.id === clinicalRecordId);
    
    const petRace = races.find((race) => race.id === clinicalrecord.pet.raceId);
    const petHairColor = hairColors.find((hairColor) => hairColor.id === clinicalrecord.pet.hairColorId);
    const petHairLenght = hairLengths.find((hairLength) => hairLength.id === clinicalrecord.pet.hairLengthId);
    const petSize = petSizes.find((petSize) => petSize.id === clinicalrecord.pet.petSizeId);
    


    return (
        <PDFDownloadLink
            document={
                <ClinicalRecordExport
                    petName={petName}
                    clinicalRecord={clinicalrecord}
                    questions={questions}
                    petRace={petRace}
                    races={races}
                    species={species}
                    petHairColor={petHairColor}
                    petHairLenght={petHairLenght} 
                    petSize={petSize} // Validar si `petRace` existe
                    drugs={drugs}
                    drugTypes = {drugTypes}
                    treatmentOptions = {treatmentOptions}
                    selectedTreatmentTypeId= {selectedTreatmentTypeId}
                />
            }
            fileName={fileName}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Button shape="circle" size="large" className="margin-right">
                <FilePdfOutlined />
            </Button>
        </PDFDownloadLink>
    );
}

  const columns = [
    {
      title: "Código de Ficha",
      dataIndex: "clinicalRecordId",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("clinicalRecordId"),
      onFilter: (value, record) => record.clinicalRecordId.includes(value),
      filterSearch: true,
      // width: "30%",
      responsive: ["md"],
      sorter: (a, b) => a.clinicalRecordId - b.clinicalRecordId,
    },
    {
      title: "Paciente",
      dataIndex: "petName",
      ...getColumnSearchProps("petName"),
      sorter: (a, b) => a.petName.length - b.petName.length,
    },
    {
      title: "Veterinaria",
      dataIndex: "vetName",
      ...getColumnSearchProps("vetName"),
      sorter: (a, b) => a.vetName.length - b.vetName.length,
      // responsive: ['sm']
    },
    {
      title: "Tutor",
      dataIndex: "tutorName",
      ...getColumnSearchProps("tutorName"),
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      // responsive: ['sm']
    },
    {
      title: "% Completado",
      dataIndex: "progressObject",
      responsive: ["md"],
      render: (_, { progressObject }) => (
        <>
          <Progress
            percent={progressObject.percentage}
            size="small"
            strokeColor={{
              from: progressObject.fromColor,
              to: progressObject.toColor,
            }}
          />
        </>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      sorter: (a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY");
        const dateB = moment(b.date, "DD/MM/YYYY");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
      // responsive: ['md']
    },
    {
      title: "Acciones",
      dataIndex: "indexIdForButton",
      align: "center",
      fixed: "right",
      render: (_, { indexIdForButton, progressObject, petName, record }) => (
        <>
          <Tooltip placement="top" title="Descargar PDF">
            {handleDownloadPDF(petName, indexIdForButton)} {/* Llama a la función aquí */}
          </Tooltip>
          {progressObject.percentage === 100 ? (
            <Tooltip placement="top" title="Ver la Ficha Clínica">
              <Button
                shape="circle"
                type="dashed"
                size="large"
                className="margin-right"
                onClick={(e) => {
                  goToClinicalRecord(indexIdForButton);
                }}
              >
                <EyeOutlined />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="Continuar la Ficha Clínica">
              <Button
                shape="circle"
                size="large"
                className="margin-right"
                onClick={(e) => {
                  goToClinicalRecord(indexIdForButton);
                }}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
          )}
          <Tooltip placement="top" title="Borrar la Ficha Clínica">
            <Popconfirm
              title="¿Seguro que quieres borrar esta ficha?"
              placement="left"
              icon={<WarningOutlined style={{ color: "red" }} />}
            >
              <Button shape="circle" danger size="large">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  function goToClinicalRecord(clinicalRecordId) {
    sessionStorage.setItem(
      "clinicalRecordId",
      JSON.stringify(clinicalRecordId)
    );
    navigate("/clinical-record", {
      state: { clinicalRecordId: clinicalRecordId, petId: null },
    });
  }
  // const filterClinicalRecordId = (e) => {};

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Historiales Clínicos</Title>
        </Col>
      </Row>

      {/* <Divider orientation="left">Filtros</Divider>

      <Row gutter={[16, 16]}>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
          <Input
            placeholder="Código de la ficha clinica"
            allowClear
            onChange={filterClinicalRecordId}
          />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
          <Select
            className="full-width"
            showSearch
            placeholder="Ingrese nombre o código de la mascota"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="1">Lima - CuivetID: 200</Option>
            <Option value="2">Wendy - CuivetID: 2522</Option>
            <Option value="3">Tom - CuivetID: 32</Option>
          </Select>
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
          <Input placeholder="DNI del tutor..." />
        </Col>
        <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
          <Input placeholder="Fecha desde..." />
        </Col>
      </Row> */}

      <Divider orientation="left"></Divider>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500, y: 500 }}
        onChange={onChange}
        loading={isLoading}
      />
    </>
  );
}
