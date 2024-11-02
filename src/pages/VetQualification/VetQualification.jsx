import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import { Typography, Table } from "antd";
import "./vetQualification.scss";
import StarSelector from './StarSelector'; 
import { StarTwoTone } from '@ant-design/icons'; // Importa el icono


const { Title } = Typography;

export default function VetQualification() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [averageQualification, setAverageQualification] = useState(0);
    const profile = JSON.parse(sessionStorage.getItem("profile")); // OBTENER PERFIL DEL VET

    useEffect(() => {
        refreshComponent();
    }, []); // Ejecuta solo una vez 

    function refreshComponent() {
        qualificationService.findAllByVeterinaryId(profile.veterinary.id)
            .then(responseQualifications => {
                generateData(responseQualifications);
                setIsLoading(false);
            });
    }

    function generateData(responseQualifications) {
        //debugger
        const finalData = responseQualifications
            .map(item => ({
                key: item.qualification.id,
                date: item.qualification.updatedAt.slice(0, 10),
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
            return sum + (typeof qualification === 'number' ? qualification : 0); // Asegúrate de sumar solo números
        }, 0);

        const count = data.filter(record => Number.isInteger(record.qualification)).length; // Contar solo las calificaciones válidas

        console.log("Total Qualifications:", totalQualifications); // Debug: Muestra el total
        console.log("Count of Valid Qualifications:", count); // Debug: Muestra el conteo

        const average = count > 0 ? (totalQualifications / count) : 0; // Evitar división por cero
        setAverageQualification(average);
    }

    useEffect(() => {
        console.log("Average Qualification:", averageQualification); // Debug: Muestra el promedio
    }, [averageQualification]);

    const columnsComplete = [
        {
            title: "Fecha Calificación",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            responsive: ['sm'],
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
            title: 'Calificación',
            dataIndex: 'qualification',
            key: 'qualification',
            render: (_, record) => (
                record.qualification != null ? (
                    <StarSelector
                        qualification={record.qualification}
                        disabled
                    />
                ) : null
            ),
        },
        {
            title: "Observación",
            dataIndex: "observation",
            key: 'observation',
            fixed: 'center',
            render: (_, record) => (
                record.observation != null ? (
                    <span>{record.observation}</span>
                ) : null
            ),
        },
    ];

    return (
        <>
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <Title className="appTitle" style={{ marginBottom: 0 }}>Calificaciones Obtenidas</Title>
        <div className="qualifications__average" style={{ marginLeft: '40px', display: 'flex', alignItems: 'center' }}>
            <StarTwoTone style={{ fontSize: '28px' }} twoToneColor="rgba(88, 9, 114, 0.329)" />
            <span style={{ marginLeft: '8px', fontSize: '28px' }}>{averageQualification.toFixed(2)}</span>
            </div>
        </div>
            <div className="divider"></div>
            <Table
                columns={columnsComplete}
                dataSource={data}
                loading={isLoading}
            />
        </>
    );
}
