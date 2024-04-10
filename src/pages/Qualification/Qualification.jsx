import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import { findAllByTutorId } from "../../services/qualification.service";
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


const { Title } = Typography;

export default function Qualification()
{
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  
  useEffect(() => {
    const id = 1; // Ejemplo de ID, puedes usar el que necesites

    // Llama a la función findOne del servicio
    qualificationService.findOneById(id)
      .then((result) => {
        console.log('Resultado de findOne:', result);
      })
      .catch((error) => {
        console.error('Error al llamar a findOne:', error);
      });
  }, []);
  
  // if (!isInit) {
  //   setIsInit(true);
  //   findAllByTutorId(profile.tutor.id).then((response) => {
  //     console.log('Resultado de Qualifications:', response);
  //     //setPets(response);
  //   });
  // }

  //Obtencion del valor de las estrellas
  const [rating, setRating] = useState(0); // Estado para almacenar la calificación seleccionada

  // Función para manejar la selección de calificación
  const handleRatingSelect = (value,record) => {
    console.log(`Se seleccionó una calificación de ${value} estrellas para el registro:`, record);
  
    setRating(value);
  };


  function Qualification() {
    const renderQualificationList = [];
    
  
    return renderQualificationList;
  }

  //Datos hardcodeados de prueba
    const data = [
      { dateAssist: '20/05/2023',veterinary: 'Juan Martinez', pet: 'Lola', observation:'Gran velocidad para solucionar emergencia' },
      { dateAssist: '06/11/2023',veterinary: 'María Perez', pet: 'Mila', observation:'Atencion amable' },
      { dateAssist: '12/08/2023',veterinary: 'Pedro Cortez', pet: 'Rodo' , observation:'No me gusto el trato hacia mi mascota'},
    ];

  //Columnas de la tabla
    const columnsComplete = [
      {
        title: "Fecha Consulta",
        dataIndex: "dateAssist",
        key: "tutorName",
        sorter: (a, b) => a.tutorName.length - b.tutorName.length,
        // responsive: ['sm']
      },
      {
        title: "Veterinario",
        dataIndex: "veterinary",
        key:"veterinary",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age,
        responsive: ["md"],
      },
      {
        title: "Mascota",
        dataIndex: "pet",
        sorter: (a, b) => a.name.length - b.name.length,
      },
      // {
      //   title: "Calificación",
      //   dataIndex: "name",
      //   sorter: (a, b) => a.name.length - b.name.length,
      //   render: (_, record) => (
      //       <>
      //   <Link to={"/Qualification"} className="admin-sider__item">
      //     <Tooltip placement="top">
      //     {[1, 2, 3, 4, 5].map((value) => (
      //           <span key={value} onClick={() => handleRatingSelect(value, record)}>
      //             {value <= rating ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}
      //           </span>
      //         ))}
              
      //     </Tooltip>
      //   </Link>
      //   </>
      //   )
        
      // },
      {
        title: "Calificación",
        dataIndex: "name",
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
        //   responsive: ["md"],
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
        {/* <div class="column">
          <h2>     Calificaciones pendientes</h2>
          
        </div>
        <div class="column"></div> */}

        {/* <div class="column">
          <h2>     Consultas calificadas</h2>
          <div class="divider"></div>

          
        </div> */}
      </div>
      {/* row de las tablas  */}
      {/* <div class="row"> */}
      <div class="divider"></div>
          
        <div class="divider"></div>
        
        
          <Table
          columns={columnsComplete}
          dataSource={data}
          scroll={{ x: 500 }}
          
          />
        {/* </div> */}

    </body>
   
      
       </>

      
  );
}