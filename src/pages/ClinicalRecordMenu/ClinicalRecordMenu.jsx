import React, { useState } from "react";
import {
  Col,
  Row,
  Divider,
  Typography,
  Button,
  Input,
  message,
  Spin,
  Select,
  Alert,
} from "antd";
import { getTutorDataByDni } from "../../services/tutor.service";
import AvatarSearch from "../../components/AvatarSearch";
import { SettingTwoTone } from "@ant-design/icons";
import { getPetsByTutorId } from "../../services/pet.service";
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

  const refreshDni = (e) => {
    setSearchedTutorData(null);
    setPetOptions(null);
    setSelectedPetId(null);
    setTutorDni(e.target.value);
  };

  const searchTutorData = () => {
    setIsSearchingTutorData(true);
    getTutorDataByDni(tutorDni)
      .then((res) => {
        setSearchedTutorData(res);
        setIsSearchingTutorData(false);
        getPetsByTutorId(res.tutor.id).then((pets) => {
          setPetOptions(generatePetOptions(pets));
        });
      })
      .catch((error) => {
        message.error(error.response.data);
        setIsSearchingTutorData(false);
      });
  };

  const refreshSelectedPet = (value) => {
    setSelectedPetId(value);
  };

  function generatePetOptions(pets) {
    var renderPetOptions = [];
    pets.forEach(function eachPet(pet) {
      renderPetOptions.push(<Option key={pet.id}>{pet.name}</Option>);
    });
    return renderPetOptions;
  }

  const createClinicalRecord = () => {
    navigate("/clinical-record", {
      state: { clinicalRecordId: null, petId: Number(selectedPetId) },
    });
  };

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Ficha Clínica</Title>
        </Col>
      </Row>

      <Divider orientation="center">Nueva ficha clínica</Divider>

      <>
        {/* <Divider orientation="left" plain> Ingrese DNI del tutor de la mascota </Divider> */}
        <Row>
          <Col
            xs={{ span: 24 }}
            md={{ span: 6, offset: 9 }}
            style={{ marginBottom: "1%" }}
          >
            <Typography.Text>
              Ingrese DNI del tutor de la mascota:
            </Typography.Text>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 4, offset: 9 }}>
            <Input
              type="number"
              name="phone"
              placeholder="DNI del tutor a asociar"
              onChange={refreshDni}
              allowClear
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 2, offset: 0 }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
              onClick={searchTutorData}
              className="register-form_button-ok-modal"
            >
              Buscar tutor
            </Button>
          </Col>
        </Row>
        <br></br>
        <Row span={5}>
          {searchedTutorData ? (
            <Col xs={{ span: 24 }} md={{ span: 6, offset: 9 }}>
              <AvatarSearch
                name={searchedTutorData.person.name}
                lastName={searchedTutorData.person.lastName}
              ></AvatarSearch>
            </Col>
          ) : isSearchingTutorData ? (
            <>
              <Spin />
              Buscando...
            </>
          ) : (
            <Col xs={{ span: 24 }} md={{ span: 6, offset: 9 }}>
              <Alert
                message="Aun no has seleccionado ningún tutor"
                type="warning"
              />
            </Col>
          )}
        </Row>
        <Row>
          <Col
            xs={{ span: 24 }}
            md={{ span: 6, offset: 9 }}
            style={{ marginBottom: "1%", marginTop: "3%" }}
          >
            <Typography.Text>Seleccione una mascota:</Typography.Text>
          </Col>
          {searchedTutorData ? (
            <>
              <Col xs={{ span: 24 }} md={{ span: 6, offset: 9 }}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Seleccione la mascota a atender"
                  onChange={refreshSelectedPet}
                >
                  {petOptions}
                </Select>
              </Col>
              <Col span={24}>
                <br></br>
                {selectedPetId ? (
                  <Col xs={{ span: 24 }} md={{ span: 2, offset: 11 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="register-form_button-ok-modal"
                      onClick={createClinicalRecord}
                      shape="round"
                    >
                      Crear
                    </Button>
                  </Col>
                ) : (
                  <>
                    <Row>
                      <Col xs={{ span: 24 }} md={{ span: 6, offset: 9 }}>
                        <Alert
                          message={"Información "}
                          description="Debes seleccionar una mascota para poder crear la ficha clínica"
                          type="info"
                          icon={<SettingTwoTone twoToneColor="#523c89" spin />}
                          showIcon
                        ></Alert>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </>
          ) : (
            <Col xs={{ span: 24 }} md={{ span: 6, offset: 9 }}>
              <Alert
                message="Información "
                description="Debes buscar un tutor para poder avanzar con la creación de la
                ficha clínica"
                type="info"
                icon={<SettingTwoTone twoToneColor="#523c89" spin />}
                showIcon
              ></Alert>
            </Col>
          )}
        </Row>
      </>
    </>
  );
}
