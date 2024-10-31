import React, { useState, useRef } from "react";
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
import ClinicalRecordExport from "./ClinicalRecodExport";
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

  function handleDownloadPDF(petName, clinicalRecordId, registroClinical) {
    const currentDate = moment().format("DDMMYY"); // Obtener la fecha actual en formato ddmmaa
    const fileName = `${petName}_HistoriaClinica_${currentDate}.pdf`; // Formato del nombre del archivo
    const clinicalrecord = data.find(record => record.clinicalRecordId === clinicalRecordId); // Encuentra el registro correspondiente
    //console.log("Regstro" + registroClinical);
    return (
      <PDFDownloadLink
        document={<ClinicalRecordExport petName={petName} clinicalRecord={clinicalrecord} />} // Pasa clinicalRecord a tu componente PDF
        fileName={fileName} // Nombre del archivo
        style={{ textDecoration: "none", color: "inherit" }} // Estilo del enlace
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
            {handleDownloadPDF(petName, indexIdForButton, record)} {/* Llama a la función aquí */}
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
