import React, { useRef, useState,useEffect } from "react";
import {
  Col,
  Divider,
  Row,
  Input,
  Space,
  Tooltip,
  Button,
  Table,
  Typography,
} from "antd";
import { FilePdfOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router";
import { clinicalRecordService } from "../../services/clinical_record.service";
import ClinicalRecordExport from "../../components/PDFExport/ClinicalRecodExport";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Importa PDFDownloadLink
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

const { Title, Text } = Typography;

export default function ClinicalHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  let navigate = useNavigate();
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
      .findAllByTutorId(profile.tutor.id)
      .then((response) => {
        generateData(response);
        setIsLoading(false);
        console.log(response);
        setClinicalRecordPDF(response);
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
        veterinaryName:
          clinicalRecord.veterinaryData.person.name +
          " " +
          clinicalRecord.veterinaryData.person.lastName,
        tutorName:
          clinicalRecord.tutorData.person.name +
          " " +
          clinicalRecord.tutorData.person.lastName,
        visistsNumber: clinicalRecord.visits.length === 0 ? '-' : clinicalRecord.visits.length,
        // progressObject: calculateProgress(clinicalRecord),
        date: moment(clinicalRecord.createdAt).format("DD/MM/YYYY"), //clinicalRecord.createdAt.slice(0, 10),
        indexIdForButton: clinicalRecord.id,
      });
    });
    setData(finalData);
    console.log(finalData);
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
      title: "Mascota",
      dataIndex: "petName",
      ...getColumnSearchProps("petName"),
      sorter: (a, b) => a.petName.length - b.petName.length,
    },
    {
      title: "Clínica",
      dataIndex: "vetName",
      ...getColumnSearchProps("vetName"),
      sorter: (a, b) => a.vetName.length - b.vetName.length,
      // responsive: ['sm']
    },
    {
      title: "Veterinaria",
      dataIndex: "veterinaryName",
      ...getColumnSearchProps("veterinaryName"),
      sorter: (a, b) => a.veterinaryName.length - b.veterinaryName.length,
      // responsive: ['sm']
    },
    {
      title: "Nro. Visitas",
      dataIndex: "visistsNumber",
      sorter: (a, b) => a.visistsNumber - b.visistsNumber,
      align: "center",
      // responsive: ['md']
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
      render: (_, { indexIdForButton, petName }) => (
          <Tooltip placement="top" title="Descargar PDF">
              {handleDownloadPDF(petName, indexIdForButton)}
          </Tooltip>
      ),
  },
  ];


  function handleDownloadPDF(petName, clinicalRecordId) {
    const currentDate = moment().format("DDMMYY");
    const fileName = `${petName}_Ficha${clinicalRecordId}_${currentDate}.pdf`;

    const clinicalrecord = clinicalRecordPDF.find(record => record.id === clinicalRecordId);
    if (!clinicalrecord) {
        return <Text>No se encontró el registro clínico</Text>;
    }

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
                    petSize={petSize}
                    drugs={drugs}
                    drugTypes={drugTypes}
                    treatmentOptions={treatmentOptions}
                    selectedTreatmentTypeId={selectedTreatmentTypeId}
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

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Historiales Clínicos</Title>
        </Col>
      </Row>
      <Divider></Divider>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        //   onChange={onChange}
        loading={isLoading}
      />
    </>
  );
}
