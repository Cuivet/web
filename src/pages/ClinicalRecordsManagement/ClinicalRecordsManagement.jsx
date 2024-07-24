import React, { useState } from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Divider,
  Input,
  Select,
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
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import moment from "moment";
const { Option } = Select;
const { Title } = Typography;

export default function ClinicalRecordsManagement() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (!isInit) {
    refreshComponent();
    setIsInit(true);
  }

  function refreshComponent() {
    clinicalRecordService
      .findAllByVeterinaryId(profile.veterinary.id)
      .then((clinicalRecords) => {
        generateData(clinicalRecords);
        setIsLoading(false);
      });
  }

  function generateData(clinicalRecords) {
    var finalData = [];
    clinicalRecords.forEach((clinicalRecord) => {
      finalData.push({
        key: clinicalRecord.id,
        clinicalRecordId: clinicalRecord.id,
        petName: clinicalRecord.pet.name,
        vetName: clinicalRecord.vet.name,
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

  const columns = [
    {
      title: "Código de Ficha",
      dataIndex: "clinicalRecordId",
      defaultSortOrder: "descend",
      onFilter: (value, record) => record.clinicalRecordId.includes(value),
      filterSearch: true,
      // width: "30%",
      responsive: ["md"],
      sorter: (a, b) => a.clinicalRecordId - b.clinicalRecordId,
    },
    {
      title: "Paciente",
      dataIndex: "petName",
      sorter: (a, b) => a.petName.length - b.petName.length,
    },
    {
      title: "Veterinaria",
      dataIndex: "vetName",
      sorter: (a, b) => a.vetName.length - b.vetName.length,
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
      // responsive: ['md'],
      align: "center",
      fixed: "right",
      render: (_, { indexIdForButton, progressObject }) => (
        <>
          <Tooltip placement="top" title="Descargar PDF">
            <Button shape="circle" size="large" className="margin-right">
              <FilePdfOutlined />
            </Button>
          </Tooltip>
          {progressObject.percentage === 100 ? (
            <Tooltip placement="top" title="Ver la Ficha Clínica">
              <Button
                shape="circle"
                type="dashed"
                size="large"
                className="margin-right"
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
                  // console.log(indexIdForButton);
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
              // onConfirm={() => deleteClinicalRecord(indexIdForButton)}
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
  const filterClinicalRecordId = (e) => {};

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Historiales Clínicos</Title>
        </Col>
      </Row>

      <Divider orientation="left">Filtros</Divider>

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
      </Row>

      <Divider orientation="left"></Divider>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        onChange={onChange}
        loading={isLoading}
      />
    </>
  );
}
