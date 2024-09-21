import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import { findAllByTutorId } from "../../services/qualification.service";
import { getPetsByTutorId } from "../../services/pet.service";
import { clinicalRecordService } from "../../services/clinical_record.service";
import { Col, Row, Button, label, Drawer, Tooltip, Typography, Divider, Modal ,Table} from "antd";
import Card from "../../components/Card";
import "./Qualification.scss";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarSelector from './StarSelector';// Importa el componente StarRatingSelector
import { CardContent } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import { EyeOutlined } from '@ant-design/icons';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'; //Para cuando seleccione el editar calificacion
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from "react-router-dom";
import { Pets } from "@material-ui/icons";


const { Title } = Typography;

export default function Qualification()
{
  
  const [isFetchData, setIsFetchData]= useState(false);//tiene que iniciar en false
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const dataSet = [
    { date_CR: '20/05/2023',vetName: 'Juan Martinez', petName: 'Lola', observation:'Gran velocidad para solucionar emergencia' },
    { date_CR: '06/11/2023',vetName: 'María Perez', petName: 'Mila', observation:'Atencion amable' },
    { date_CR: '12/08/2023',vetName: 'Pedro Cortez', petName: 'Rodo' , observation:'No me gusto el trato hacia mi mascota'},
  ];


  useEffect(() => {
    const fetchData = async () => {

      setIsFetchData(true);
        // 1. Obtener las mascotas por tutor
        if (profile && profile.tutor) {
          const petsResponse = await qualificationService.findAllByTutorId(profile.tutor.id);
          setPets(petsResponse);        
          console.log("Pets obtenidos  "+petsResponse);
          }
        
    };
    if (!isFetchData){
       fetchData();
    }
   


  })



  //Datos hardcodeados de prueba
  

  //Columnas de la tabla
    const columnsComplete = [
      {
        title: "Fecha Consulta",
        dataIndex: "date_CR",
        key: "date_cr",
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
        title: "Calificación",
        dataIndex: "qualification",
        sorter: (a, b) => a.name.length - b.name.length,
        render: (_, record) => (
          <>
            <StarSelector rating={record.rating} onClick={(value) => handleRatingSelect(value, record)} />
          </>
        )
      },
      {
        title: "Observación",
        dataIndex: "observation",
        fixed: "center",
      },
      {
        title: "Acción",
        dataIndex: "actions",
        fixed: "right",
          responsive: ["md"],
        render: (_, record) => (
          <>
          
            <Link to={"/Qualification"} className="admin-sider__item">
              <Tooltip placement="top" title="Editar calificación">
                <Button
                  type="link"
                  className="appTableButton"
                  textalign="center"
                  icon={<LockOutlinedIcon />}
                ></Button>
              </Tooltip>
            </Link>
          </>
        ),
      },
    ];

    
      //Obtencion del valor de las estrellas
  const [rating, setRating] = useState(0); // Estado para almacenar la calificación seleccionada

  // Función para manejar la selección de calificación
  const handleRatingSelect = (value,record) => {
    console.log(`Se seleccionó una calificación de ${value} estrellas para el registro:`, record);
  
    setRating(value);
  };
    
      
    
    const StarIconSelector = ({ rating, onClick }) => {
      return (
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} onClick={() => onClick(value)}>
              {value <= rating ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
            </span>
          ))}
        </div>
      );
    };
     
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
          dataSource={dataSet}//datasET
          scroll={{ x: 500 }}
          Loading = {isLoading}
          />
    </body>
   
       </>
  );
}