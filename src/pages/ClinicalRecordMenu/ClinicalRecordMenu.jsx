import React, { useState } from "react";
import { Col, Row, Divider, Typography, Button, Input, message, Spin, Select, Alert } from "antd";
import { getTutorDataByDni } from '../../services/tutor.service';
import AvatarSearch from '../../components/AvatarSearch';
import { SettingTwoTone } from '@ant-design/icons';
import { getPetsByTutorId } from '../../services/pet.service';
import { useNavigate } from "react-router";
const { Option } = Select;
const { Title } = Typography;

export default function ClinicalRecordMenu() {
  let navigate = useNavigate();
  const [tutorDni, setTutorDni] = useState(null);
  const [isSearchingTutorData, setIsSearchingTutorData] = useState(false);
  const [searchedTutorData, setSearchedTutorData] = useState(null);
  const [petOptions, setPetOptions] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState([]);

  const refreshDni = e =>{
      setSearchedTutorData(null);
      setPetOptions(null);
      setSelectedPetId(null);
      setTutorDni(e.target.value);
  };

  const searchTutorData = () => {
    setIsSearchingTutorData(true);
    getTutorDataByDni(tutorDni)
      .then(res => {
          setSearchedTutorData(res);
          setIsSearchingTutorData(false);
          getPetsByTutorId(res.tutor.id)
                    .then(pets => {
                        setPetOptions(generatePetOptions(pets));
                    });
      })
      .catch(error => {
          message.error(error.response.data);
          setIsSearchingTutorData(false);
      });
  }

  const refreshSelectedPet = (value) => {
      setSelectedPetId(value);
  };

  function generatePetOptions(pets) {
    var renderPetOptions = [];
    pets.forEach(function eachPet(pet){
        renderPetOptions.push(<Option key={pet.id}>{pet.name}</Option>)
    });
    return renderPetOptions;
}

const createClinicalRecord = () => {
  navigate('/clinical-record', { state: { clinicalRecordId: null, petId: Number(selectedPetId) } });
}
  
return (
  <>
    <Row align="middle">
        <Col span={24}>
            <Title className='appTitle'>Ficha Clínica</Title>
        </Col>
    </Row>

    <Divider orientation="left">Crear nueva ficha clínica</Divider>

    <>
      <Divider orientation="left" plain> Ingrese DNI del tutor de la mascota </Divider>
      <Row>
          <Col span={4}>
              <Input type="number" name="phone" placeholder="DNI del tutor a asociar" onChange={refreshDni} allowClear/>
          </Col>
          <Col span={2}>
              <Button htmlType="submit" type="primary" onClick={searchTutorData} className="register-form_button-ok-modal"> 
                  Buscar tutor
              </Button>
          </Col>
      </Row>
      <br></br>
      <Row span={5}>
            {
            searchedTutorData?
            <> 
              <AvatarSearch name={searchedTutorData.person.name} lastName={searchedTutorData.person.lastName}></AvatarSearch>
            </>
            :
            isSearchingTutorData?
            <><Spin />Buscando...</>
            :
            <>  
              <Alert message="En este momento no tienes ningún tutor seleccionado" type="warning" />
            </>
            }
      </Row>
      <Row>
        <Divider orientation="left" plain> Ingrese los datos para la creación de la ficha clínica </Divider>
        {
          searchedTutorData ?
          <>
            <Col span={4}>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Seleccione las mascotas a asociar"
                onChange={refreshSelectedPet}
                >
                {petOptions}
              </Select>   
            </Col>
            <Col span={24}>
            <br></br>
            {
              selectedPetId ? 
              <>
                <Button htmlType="submit" type="primary" className="register-form_button-ok-modal" onClick={createClinicalRecord}> 
                  Crear
                </Button>
              </>
              :
              <>
                <Row>
                  <SettingTwoTone twoToneColor="#ff00ff" spin/>
                  <Title level={5} className='margin-left-spinner'>Seleccione una mascota para poder crear la ficha clínica</Title>
                </Row>
                </>
            }
            </Col>
          </>
          :
          <>
            <SettingTwoTone twoToneColor="#ff00ff" spin/>
            <Title level={5} className='margin-left-spinner'>Debe encontrar un tutor para poder avanzar con la creación de la ficha clínica</Title>
          </>
        }
      </Row>
    </>
  </>
);}
