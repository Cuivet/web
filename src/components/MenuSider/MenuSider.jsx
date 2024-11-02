import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import Icon, {
  HomeOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  PushpinOutlined
} from "@ant-design/icons";
import PetsIcon from "@mui/icons-material/Pets";
import ScienceIcon from "@mui/icons-material/Science";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import "./MenuSider.scss";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { getAllByRegentId } from "../../services/vet.service";
import MyContext from "../../MyContext";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import BarChartIcon from '@mui/icons-material/BarChart';

export default function MenuSider(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const [regentVets, setRegentVets] = useState([]);
  const [regentOfSelectedVet, setRegentOfSelectedVet] = useState(false);
  const [veterinaryWithNoVets, setVeterinaryWithNoVets] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const { selectedVet } = useContext(MyContext);
  const navigate = useNavigate();

  var tutor = profile.tutor != null;
  var veterinary = profile.veterinary != null;
  var vetOwner = profile.vetOwner != null;

  if (!isInit) {
    if (veterinary) {
      getAllByRegentId(profile.veterinary.id).then((res) => {
        setRegentVets(res); // Aquí guardamos todas las veterinarias que el veterinario regenta
      });
    }
    setIsInit(true);
  }

  useEffect(() => {
    if (selectedVet && regentVets.some((vet) => vet.id === selectedVet.value)) {
      setRegentOfSelectedVet(true);
    } else {
      setRegentOfSelectedVet(false);
    }
    if (window.location.pathname === "/veterinaries-management") {
      navigate("/menu"); // O la ruta que prefieras
    }
  }, [selectedVet]);

  useEffect(() => {
    if (veterinary && !!selectedVet?.value) {
      setVeterinaryWithNoVets(false);
    } else {
      setVeterinaryWithNoVets(true);
    }
  }, [veterinary, selectedVet]);

  return (
    <Sider
      trigger={null}
      collapsible
      className="admin-sider"
      collapsed={menuCollapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        zIndex: 5,
      }}
    >
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="menu">
          <Link to={"/menu"} className="admin-sider__item">
            <HomeOutlined />
            <span className="nav-text"> Inicio </span>
          </Link>
        </Menu.Item>

        {tutor ? (
          <>
            <Menu.Item key="clinicalHistory">
              <Link to={"/clinical-history"} className="admin-sider__item">
                <FolderOpenOutlined />
                <span className="nav-text"> Historiales Clínicos </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="tutorStudies">
              <Link to={"/studies"} className="admin-sider__item">
                <Icon component={""}>
                  <ScienceIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Estudios </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="tutorPets">
              <Link to={"/pets"} className="admin-sider__item">
                <Icon component={""}>
                  <PetsIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Mis Mascotas </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="tutorVeterinariesAssociations">
              <Link
                to={"/veterinaries-associations"}
                className="admin-sider__item"
              >
                <Icon component={""}>
                  <MedicalServicesOutlinedIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Veterinarios Asociados </span>
              </Link>
            </Menu.Item>
          </>
        ) : null}

        {veterinary ? (
          <>
            <Menu.Item key="ClinicalRecordMenu" hidden={veterinaryWithNoVets}>
              <Link to={"/clinical-record-menu"} className="admin-sider__item">
                <Icon>
                  <ContentPasteOutlinedIcon />
                </Icon>
                <span className="nav-text"> Ficha Clínica </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Vaccination" hidden={veterinaryWithNoVets}>
              <Link to={"/vaccination"} className="admin-sider__item">
                <Icon>
                  <MedicationOutlinedIcon />
                </Icon>
                <span className="nav-text"> Vacunación </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="veterinaryStudies" hidden={veterinaryWithNoVets}>
              <Link to={"/studies"} className="admin-sider__item">
                <Icon component={""}>
                  <ScienceIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Estudios </span>
              </Link>
            </Menu.Item>

            <Menu.Item
              key="veterinaryClinicalRecordManagement"
              hidden={veterinaryWithNoVets}
            >
              <Link
                to={"/clinical-records-management"}
                className="admin-sider__item"
              >
                <FolderOpenOutlined />
                <span className="nav-text"> Historiales Clínicos </span>
              </Link>
            </Menu.Item>

            {/* <Menu.Item key="veterinaryClinicalRecordManagement">
              <Link
                to={"/clinical-records-management"}
                className="admin-sider__item"
              >
                <Icon component={""}>
                  <FolderOpenOutlined fontSize="small" />
                </Icon>
                <span className="nav-text"> Historiales Clínicos </span>
              </Link>
            </Menu.Item> */}

            {regentOfSelectedVet ? (
              <Menu.Item key="veterinaryVeterinariesManagement">
                <Link
                  to={"/veterinaries-management"}
                  className="admin-sider__item"
                >
                  <Icon component={""}>
                    <PeopleAltOutlinedIcon fontSize="small" />
                  </Icon>
                  <span className="nav-text"> Gestión de Veterinarios </span>
                </Link>
              </Menu.Item>
            ) : null}

            <Menu.Item
              key="veterinaryPetsManagement"
              hidden={veterinaryWithNoVets}
            >
              <Link to={"/pets-management"} className="admin-sider__item">
                <Icon component={""}>
                  <PetsIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Mis Pacientes </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="veterinaryVetsManagement">
              <Link to={"/vets-associations"} className="admin-sider__item">
                <Icon component={""}>
                  <PersonPinCircleOutlinedIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Clínicas Asociadas </span>
              </Link>
            </Menu.Item>
          </>
        ) : null}

        {vetOwner ? (
          <>
            <Menu.Item key="vetOwnerVeterinariesManagement">
              <Link
                to={"/veterinaries-management"}
                className="admin-sider__item"
              >
                <Icon component={""}>
                  <MedicalServicesOutlinedIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Mis Veterinarios </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="vetOwnerVets">
              <Link to={"/vets"} className="admin-sider__item">
                <Icon component={""}>
                  <PersonPinCircleOutlinedIcon fontSize="small" />
                </Icon>
                <span className="nav-text"> Mis Clínicas </span>
              </Link>
            </Menu.Item>
          </>
        ) : null}

        <Menu.Item key="Reports">
            <Link to={"/reports"} className='admin-sider__item'>            
              <Icon component={''}><BarChartIcon fontSize="small" /></Icon>
                  <span className="nav-text"> Reportes </span>
            </Link>
        </Menu.Item>
        
        <Menu.Item key="map">
          <Link to={"/vetsMap"} className="admin-sider__item">
          <PushpinOutlined />
            <span className="nav-text"> Mapa </span>
          </Link>
        </Menu.Item>

        <Menu.Item key="user">
          <Link to={"/settings/user"} className="admin-sider__item">
            <SettingOutlined />
            <span className="nav-text"> Mi Cuenta </span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
