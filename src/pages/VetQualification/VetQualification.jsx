import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import { Typography, Table, Row, Col, Divider } from "antd";
import "./vetQualification.scss";
import StarSelector from "../../components/StarDisplay/StarDisplay";
import { StarTwoTone } from "@ant-design/icons"; // Importa el icono
import moment from "moment";

const { Title } = Typography;

export default function VetQualification() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageQualification, setAverageQualification] = useState(0);
  const [totalQualifications, setTotalQualifications] = useState(0);
  const profile = JSON.parse(sessionStorage.getItem("profile")); // OBTENER PERFIL DEL VET

  useEffect(() => {
    refreshComponent();
  }, []); // Ejecuta solo una vez

  function refreshComponent() {
    qualificationService
      .findAllByVeterinaryId(profile.veterinary.id)
      .then((responseQualifications) => {
        generateData(responseQualifications);
        setIsLoading(false);
      });
  }

    function generateData(responseQualifications) {
        const finalData = responseQualifications?.map(item => ({
                key: item.qualification.id,
                date: moment(item.clinicalRecord.updatedAt).format("DD/MM/YYYY"),
                tutorName: item.clinicalRecord.tutorData.person.name,
                petName: item.clinicalRecord.pet.name,
                qualification: item.qualification.qualification,
                observation: item.qualification.observation_qa,
            }))
            .filter(record => record.qualification != null || record.observation != null); // Filtrar registros con ambos valores en null
    
        console.log("Final Data:", finalData); // Debug: Muestra el finalData
        setData(finalData);
        calculateAverage(finalData); // Calcular promedio después de setear los datos
    }

  function calculateAverage(data) {
    const totalQualifications = data.reduce((sum, record) => {
      const qualification = record.qualification;
      console.log("Qualification:", qualification); // Debug: Muestra la calificación
      return sum + (typeof qualification === "number" ? qualification : 0); // Asegúrate de sumar solo números
    }, 0);

    const count = data.filter((record) =>
      Number.isInteger(record.qualification)
    ).length; // Contar solo las calificaciones válidas

    console.log("Total Qualifications:", totalQualifications); // Debug: Muestra el total
    console.log("Count of Valid Qualifications:", count); // Debug: Muestra el conteo

    const average = count > 0 ? totalQualifications / count : 0; // Evitar división por cero
    setAverageQualification(average);
    setTotalQualifications(count);
  }

  useEffect(() => {
    console.log("Average Qualification:", averageQualification); // Debug: Muestra el promedio
  }, [averageQualification]);



  const columnsComplete = [
    {
      title: "Fecha Calificación",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY");
        const dateB = moment(b.date, "DD/MM/YYYY");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
      responsive: ["sm"],
    },
    {
      title: "Tutor",
      dataIndex: "tutorName",
      key: "tutorName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tutorName.localeCompare(b.tutorName),
      responsive: ["md"],
    },
    {
      title: "Mascota",
      dataIndex: "petName",
      sorter: (a, b) => a.petName.localeCompare(b.petName),
    },
    {
      title: "Calificación",
      dataIndex: "qualification",
      key: "qualification",
      render: (_, record) => (
        <StarSelector
          qualification={record.qualification}
          disabled={true} // Siempre deshabilitado, sin posibilidad de edición
          // No se pasa `onChange` porque no se debe permitir cambios
        />
      ),
    },
    {
      title: "Observación",
      dataIndex: "observation",
      key: "observation",
      fixed: "center",
      render: (_, record) => <span>{record.observation}</span>, // Solo muestra el valor de la observación
    }
  ];

  return (
    <>
        <Row align={"middle"}>
        <Col span={24} style={{ display: "flex", alignItems: "center" }}>
          <Title className="appTitle" style={{ marginBottom: 0 }}>
            Calificaciones Obtenidas{" "}
          </Title>
          <StarTwoTone
            
            title="Promedio de calificaciones"
            style={{ fontSize: "28px", marginLeft: "2%" }}
            twoToneColor="rgba(88, 9, 114, 0.329)"
          />
          <span style={{ marginLeft: "1%", fontSize: "25px" }}>
            {averageQualification.toFixed(2)} 
          </span>
          <span style={{ marginLeft: "1%", fontSize: "15px" }}>
            ({totalQualifications} calificaciones)
          </span>
        </Col>
      </Row>

      <Divider />
      <Table columns={columnsComplete} dataSource={data} loading={isLoading} />
    </>
  );
}
