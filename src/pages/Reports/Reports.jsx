import React, { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Divider,
  Typography,
  DatePicker,
  Input,
  Select,
  Button,
  Tooltip,
} from "antd";
import RingChart from "../../components/RingChart";
import LineChart from "../../components/LineChart";
import WeightEvolutionChart from "../../components/WeightEvolutionChart";
import VetVisitsKPI from "../../components/VetVisitsKPI";
import DiagnosisTreatmentChart from "../../components/DiagnosisTreatmentChart";
import locale from "antd/lib/date-picker/locale/es_ES";
import moment from "moment";
import "../Settings/UserSettings/UserSettings.scss";
import { specieService } from "../../services/specie.service";
import { raceService } from "../../services/race.service";
import {
  getPetsByTutorId,
  getPetsDataByTutorId,
} from "../../services/pet.service";
import { getTutorDataByDni } from "../../services/tutor.service";

const { Title } = Typography;
const { Option } = Select;

function Reports() {
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  const [species, setSpecies] = useState([]);
  const [pets, setPets] = useState([]);
  const [tutorName, setTutorName] = useState("");
  const [dni, setDni] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error
  const [showPetsSelect, setShowPetsSelect] = useState(false);

  // Estados para los filtros
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedPet, setSelectedPet] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState([]);

  const handleApplyFilters = () => {
    // Podrías implementar lógica adicional aquí si es necesario antes de pasar los valores a VetVisitsKPI
    // console.log("Aplicando filtros:", {
    //   fromDate: selectedFromDate,
    //   toDate: selectedToDate,
    //   pet: selectedPet,
    //   specie: selectedSpecies,
    // });
  };

  const handleClearFilters = () => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSelectedPet([]); // Limpia correctamente el filtro de mascotas
    setTutorName("");
    setErrorMessage("");
    setShowPetsSelect(false);
    setDni("");
    setSelectedSpecies([]);
  };

  useEffect(() => {
    // Función para obtener las especies (se ejecuta para cualquier perfil)
    const fetchSpecies = async () => {
      try {
        const speciesData = await specieService.findAll();
        setSpecies(speciesData);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };

    fetchSpecies();

    // Cargar mascotas sólo si el perfil es de tipo tutor
    if (profile && profile.tutor) {
      const fetchPets = async () => {
        try {
          const petsData = await getPetsByTutorId(profile.tutor.id);
          console.log("Mascotas obtenidas:", petsData);
          setPets(Array.isArray(petsData) ? petsData : []);
        } catch (error) {
          console.error("Error al obtener las mascotas:", error);
          setPets([]);
        }
      };

      fetchPets();
    }
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente

  const fetchTutorData = async () => {
    try {
      const { tutor, person } = await getTutorDataByDni(dni);
      if (person && person.name && person.lastName) {
        setTutorName(`${person.name} ${person.lastName}`);
        setErrorMessage("");
        const petsData = await getPetsDataByTutorId(tutor.id);
        if (selectedSpecies.length > 0) {
          const filteredPets = petsData.filter((pet) =>
            selectedSpecies.includes(pet.specieId)
          );
          if (filteredPets.length === 0) {
            setErrorMessage(`No tiene mascotas con la especie seleccionada`);
          }
          setPets(filteredPets);
        } else {
          setPets(petsData);
        }
        setShowPetsSelect(true);

      } else {
        setTutorName("");
        setErrorMessage("DNI no asociado");
        setShowPetsSelect(false);
      }
    } catch (error) {
      console.error("Error fetching tutor data:", error);
      setTutorName("");
      setErrorMessage("DNI no asociado");
      setShowPetsSelect(false);
    }
  };

  useEffect(() => {
    if (dni) {
      fetchTutorData();
    }
  }, [dni]);

  useEffect(() => {
    if (dni) {
      fetchTutorData();
    }
  }, [selectedSpecies]);

  const chartStyle = { height: "400px" }; // Establecer una altura fija

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const renderFilters = () => {
    if (profile.veterinary) {
      return (
        <>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <Select
              placeholder="Especie"
              showSearch
              mode="multiple"
              className="select-before full-width"
              value={selectedSpecies}
              onChange={setSelectedSpecies}
            >
              {species.map((specie) => (
                <Option key={specie.id} value={specie.id}>
                  {specie.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              name="date"
              placeholder="Fecha desde"
              className="appDatePicker"
              format={"DD/MM/yyyy"}
              value={selectedFromDate}
              onChange={setSelectedFromDate}
            />
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              name="date"
              placeholder="Fecha hasta"
              className="appDatePicker"
              format={"DD/MM/yyyy"}
              value={selectedToDate}
              onChange={setSelectedToDate}
            />
          </Col>

          {/* Input de DNI del Tutor */}
          <Col xs={{ span: 24 }} md={{ span: 4 }}>
            <Input
              placeholder="Ingrese DNI del Tutor"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {tutorName && dni && (
              <div style={{ marginTop: "0px" }}>Tutor: {tutorName}</div>
            )}
            {errorMessage && dni && (
              <div style={{ color: "red", marginTop: "0px" }}>
                {errorMessage}
              </div>
            )}
          </Col>

          {/* Filtro de Mascota (habilitado si el DNI es válido) */}
          <Col xs={{ span: 24 }} md={{ span: 4 }}>
            <Select
              placeholder="Seleccione Mascota"
              showSearch
              mode="multiple"
              className="select-before full-width"
              style={{ marginTop: "0px" }}
              disabled={!showPetsSelect} // Se habilita solo si showPetsSelect es true
              //AGREGAR ARREGLO DE ESPECIE
              value={selectedPet} // Ahora `selectedPet` es un array vacío al limpiar
              onChange={setSelectedPet} // Controla el cambio correctamente
            >
              {pets.map((pet) => (
                <Option key={pet.id} value={pet.name}>
                  {pet.name}
                </Option>
              ))}
            </Select>
          </Col>
        </>
      );
    } else if (profile.tutor) {
      return (
        <>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              name="date"
              placeholder="Fecha desde"
              className="appDatePicker"
              format={"DD/MM/yyyy"}
              value={selectedFromDate}
              onChange={setSelectedFromDate}
            />
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <DatePicker
              locale={locale}
              disabledDate={disabledDate}
              name="date"
              placeholder="Fecha hasta"
              className="appDatePicker"
              format={"DD/MM/yyyy"}
              value={selectedToDate}
              onChange={setSelectedToDate}
            />
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <Select
              placeholder="Mascota"
              showSearch
              mode="multiple"
              className="select-before full-width"
              value={selectedPet} // Ahora `selectedPet` es un array vacío al limpiar
              onChange={setSelectedPet} // Controla el cambio correctamente
            >
              {pets.map((pet) => (
                <Option key={pet.id} value={pet.name}>
                  {pet.name}
                </Option>
              ))}
            </Select>
          </Col>
        </>
      );
    }
    // Puedes agregar más condiciones para otros perfiles aquí
  };

  const renderContent = () => {
    if (profile.veterinary) {
      return (
        <>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <div style={chartStyle}>
              <RingChart
                veterinaryId={profile.veterinary.id}
                filters={{
                  fromDate: selectedFromDate,
                  toDate: selectedToDate,
                  pet: selectedPet,
                  specie: selectedSpecies,
                }}
              />
            </div>
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <div style={chartStyle}>
              <DiagnosisTreatmentChart
                veterinaryId={profile.veterinary.id}
                filters={{
                  fromDate: selectedFromDate,
                  toDate: selectedToDate,
                  pet: selectedPet,
                  specie: selectedSpecies,
                }}
              />
            </div>
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <div style={chartStyle}>
              {" "}
              {/* Ajusta la altura aquí */}
              <LineChart
                veterinaryId={profile.veterinary.id}
                filters={{
                  fromDate: selectedFromDate,
                  toDate: selectedToDate,
                  pet: selectedPet,
                  specie: selectedSpecies,
                }}
              />
            </div>
          </Col>
        </>
      );
    } else if (profile.tutor) {
      return (
        <>
          <Col xs={{ span: 20 }} lg={{ span: 12 }}>
            {/* <div style={{ height: "300px" }}> */}
            <VetVisitsKPI
              tutorId={profile.tutor.id}
              fromDate={selectedFromDate}
              toDate={selectedToDate}
              petName={selectedPet}
            />
            {/* </div> */}
          </Col>

          <Col xs={{ span: 20 }} lg={{ span: 12 }}>
            <div style={{ height: "300px" }}>
              <WeightEvolutionChart
                tutorId={profile.tutor.id}
                petNames={selectedPet} // Este es un array de nombres de mascotas
                fromDate={selectedFromDate}
                toDate={selectedToDate}
              />
            </div>
          </Col>
        </>
      );
    }
    // Puedes agregar más condiciones para otros perfiles aquí
  };

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Reportes</Title>
        </Col>
      </Row>

      <Divider orientation="left">Filtros</Divider>

      <Row gutter={[16, 16]}>
        {renderFilters()}
        <Col className="buttom">
          <Tooltip title="Filtrar">
            <Button shape="circle" onClick={handleApplyFilters} type="primary">
              <CheckCircleOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col className="buttom">
          <Tooltip title="Quitar filtros">
            <Button shape="circle" onClick={handleClearFilters} type="primary">
              <CloseCircleOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Divider orientation="left"></Divider>

      <Row gutter={[16, 16]}>{renderContent()}</Row>
    </>
  );
}

export default Reports;
