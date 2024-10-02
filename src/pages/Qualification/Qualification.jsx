import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import { Input, Button,  Tooltip, Typography, Divider, Modal ,Table} from "antd";
import "./Qualification.scss";
import StarSelector from './StarSelector';// Importa el componente StarRatingSelector
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";


const { Title } = Typography;

export default function Qualification()
{
  const profile = JSON.parse(sessionStorage.getItem("profile"))
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [editableRow, setEditableRow] = useState(null);


  const handleSave = async (record) => {
    console.log("Guardando registro: ", record);
    console.log("Guardando registro: ", data);

    // Aquí asumiendo que `record` ya contiene todos los campos necesarios de la calificación
    try {
        // Llamar al servicio para actualizar la calificación pasando el objeto completo
        const response = await qualificationService.save(record);

        // Manejar la respuesta del servidor
        console.log("Calificación actualizada correctamente:", response.data);
    } catch (error) {
        console.error("Error al actualizar la calificación:", error);
    }
};

  const dataSet = [
    { date_CR: '20/05/2023',vetName: 'Juan Martinez', petName: 'Lola', observation:'Gran velocidad para solucionar emergencia' },
    { date_CR: '06/11/2023',vetName: 'María Perez', petName: 'Mila', observation:'Atencion amable' },
    { date_CR: '12/08/2023',vetName: 'Pedro Cortez', petName: 'Rodo' , observation:'No me gusto el trato hacia mi mascota'},
  ];

  if(!isInit){
    refreshComponent();
    setIsInit(true);
}

function refreshComponent() {
    qualificationService.findAllByTutorId(profile.tutor.id)
        .then(responseQualifications => {
            generateData(responseQualifications);
            setIsLoading(false);
        }
    );
}

function generateData(responseQualifications){
  var finalData = [];
  responseQualifications.forEach(item => {
    finalData.push(
      {
        key: item.qualification.id,
        date: item.clinicalRecord.createdAt.slice(0, 10),
        vetName: (item.clinicalRecord.veterinaryData.person.name) +' '+ (item.clinicalRecord.veterinaryData.person.lastName),      
        petName: item.clinicalRecord.pet.name,
        qualification: item.qualification.qualification,
        observation: item.qualification.observation_qa,
      })

  })
  setData(finalData);
} 

const handleDataChange = (value, record, type) => {
  console.log(`Se seleccionó una calificación de ${value} estrellas para el registro:`, record);
    
  setData((prevData) =>
    prevData.map((item) =>
      item.id === record.id ? { ...item, [type]: value } : item
      )
  );
};


const columnsComplete = [
    {
      title: "Fecha Consulta",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.tutorName.length - b.tutorName.length,
      responsive: ['sm']
    },
    {
      title: "Veterinario",
      dataIndex: "vetName",
      key:"vetName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      responsive: ["md"],
    },
    {
      title: "Mascota",
      dataIndex: "petName",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Calificación',
      dataIndex: 'qualification',
      key: 'qualification',
      render: (_, record) => (
        <StarSelector
        qualification={record.qualification}
        onChange={(value) => handleDataChange(value, record, 'qualification')} // Indica que es una calificación
        />
      ),
    },
    {
      title: "Observación",
      dataIndex: "observation",
      key: 'observation',
      fixed: 'center',
      render: (_, record) => (
        <input
          type="text"
          placeholder="Ingrese observación"
          value={record.observation || ""} // El valor controlado desde el estado
          onChange={(e) => handleDataChange(e.target.value, record, 'observation')} // Maneja los cambios
        />
      ),
    },
    {
      title: "Acción",
      dataIndex: "actions",
      fixed: "right",
        responsive: ["md"],
        render: (_, record) => (
          <Link to={"/Qualification"} className="admin-sider__item">
            <Tooltip placement="top" title="Guardar calificación">
              <Button
                type="link"
                className="appTableButton"
                textalign="center"
                icon={<LockOutlinedIcon />}
                onClick={() => handleSave(record)}  // Asegúrate de manejar el guardado por fila
              />
            </Tooltip>
          </Link>
        ),
    },
  ];

  
 
     
    return (
      <>
       <body>
      <div class="row">
      <Title className="appTitle">Calificaciones </Title>
      </div>
      
      <div class="row">
      </div>
      {/* row de las tablas  */}
      {/* <div class="row"> */}
      <div class="divider"></div>
          
        <div class="divider"></div>
          <Table
          columns={columnsComplete}
          dataSource={data}//datasET
          scroll={{ x: 500 }}
          Loading = {isLoading}
          />
    </body>
   
       </>
  );
}