import React, { useState, useContext } from "react";
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
  Card,
} from "antd";
import { getTutorDataByDni } from "../../services/tutor.service";
import AvatarSearch from "../../components/AvatarSearch";
import { SettingTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MyContext from "../../MyContext";
import { getAllByTutorId } from "../../services/pet_association.service";
const { Option } = Select;
const { Title, Text } = Typography;

export default function ClinicalRecordMenu() {
  let navigate = useNavigate();
  const [tutorDni, setTutorDni] = useState(null);
  const [isSearchingTutorData, setIsSearchingTutorData] = useState(false);
  const [searchedTutorData, setSearchedTutorData] = useState(null);
  const [petOptions, setPetOptions] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const { selectedVet } = useContext(MyContext);
  const profile = JSON.parse(sessionStorage.getItem("profile"));

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
        setIsSearchingTutorData(false);
        getAllByTutorId(res.tutor.id).then((pets) => {
          const petsArray = pets
            .filter(
              (item) =>
                item.veterinaryData.veterinary.id === profile.veterinary.id
            )
            .map((item) => item.pet);
          petsArray.length === 0
            ? setSearchedTutorData(null)
            : setSearchedTutorData(res);
          console.log(petsArray);
          setPetOptions(generatePetOptions(petsArray));
        });
        sessionStorage.setItem("tutor", JSON.stringify(res));
      })
      .catch((error) => {
        message.error(error.response.data);
        setIsSearchingTutorData(false);
      });
  };

  const refreshSelectedPet = (value) => {
    setSelectedPetId(value);
    sessionStorage.setItem("petId", JSON.stringify(value));
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

      <Row>
        <Col
          sm={{ span: 24 }}
          md={{ span: 14, offset: 5 }}
          lg={{ span: 8, offset: 8 }}
          style={{ marginBottom: "1%" }}
        >
          <Card
            title="Datos para la nueva ficha"
            hoverable
            actions={[
              <Col>
                {selectedPetId ? (
                  <Col xs={{ span: 24 }} md={{ span: 4, offset: 10 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="register-form_button-ok-modal"
                      onClick={() => {
                        createClinicalRecord();
                      }}
                      shape="round"
                    >
                      Crear
                    </Button>
                  </Col>
                ) : (
                  <div style={{ marginLeft: "2%", marginRight: "2%" }}>
                    <Alert
                      message={
                        searchedTutorData ? (
                          <Text>
                            Debes seleccionar una{" "}
                            <Text keyboard strong>
                              MASCOTA
                            </Text>{" "}
                            para poder generar la vacunacion
                          </Text>
                        ) : (
                          <Text>
                            Debes seleccionar un{" "}
                            <Text keyboard strong>
                              TUTOR
                            </Text>{" "}
                            para poder crear la vacunacion
                          </Text>
                        )
                      }
                      type="info"
                      icon={<SettingTwoTone twoToneColor="#523c89" spin />}
                      showIcon
                    ></Alert>
                  </div>
                )}
              </Col>,
            ]}
          >
            <Row>
              <Col style={{ marginBottom: "1%" }}>
                <Typography.Text>
                  Ingrese DNI del tutor de la mascota:
                </Typography.Text>
              </Col>
              <Col xs={{ span: 24 }}>
                <Input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  placeholder="DNI del tutor a asociar"
                  onChange={refreshDni}
                  allowClear
                />
              </Col>
              <Col xs={{ span: 24 }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%", marginTop: "2%" }}
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
                <Col xs={{ span: 24 }}>
                  <AvatarSearch
                    person={searchedTutorData.person}
                  ></AvatarSearch>
                </Col>
              ) : isSearchingTutorData ? (
                <>
                  <Spin />
                  Buscando...
                </>
              ) : (
                <Col xs={{ span: 24 }}>
                  <Alert
                    message="Aun no has seleccionado ningún tutor"
                    type="warning"
                  />
                </Col>
              )}
            </Row>
            <Row>
              {searchedTutorData ? (
                <>
                  <Col
                    xs={{ span: 24 }}
                    style={{ marginBottom: "1%", marginTop: "3%" }}
                  >
                    <Typography.Text>Seleccione una mascota:</Typography.Text>
                  </Col>
                  <Col xs={{ span: 24 }}>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Seleccione la mascota a atender"
                      onChange={refreshSelectedPet}
                    >
                      {petOptions}
                    </Select>
                  </Col>
                </>
              ) : (
                <></>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
