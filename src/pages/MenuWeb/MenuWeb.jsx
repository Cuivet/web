import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Typography, Divider } from "antd";
import CardMenu from "../../components/CardMenu";
import mascota from "../../assets/img/jpg/home/mascota.jpeg";
import fichaClinica from "../../assets/img/jpg/home/fichaclinica.jpeg";
import estudios from "../../assets/img/jpg/home/estudioscomplementarios.jpeg";
import vacunacion from "../../assets/img/jpg/home/vacunacion.jpeg";
import calificacion from "../../assets/img/jpg/home/calificacion.jpeg";
import clinica from "../../assets/img/jpg/home/clinica.jpeg";
import historial from "../../assets/img/jpg/home/historialclinico.jpeg";
import mapa from "../../assets/img/jpg/home/mapa.jpeg";
import reportes from "../../assets/img/jpg/home/reportes.jpeg";
import user from "../../assets/img/jpg/home/user.jpeg";
import veterinario from "../../assets/img/jpg/home/veterinario.jpeg";
import veterinarios from "../../assets/img/jpg/home/veterinarios.jpeg";
// import huella from "../../assets/img/jpg/Huella1.jpg";
import atencion from "../../assets/img/jpg/AtencionClinica.jpg";
// import calendario from "../../assets/img/jpg/calendario.jpg";
// import valorar from "../../assets/img/jpg/valorar.jpg";
// import clinica from "../../assets/img/jpg/clinica.jpg";
// import visitsReports from "../../assets/img/jpg/reportes.jpg";
// import users from "../../assets/img/jpg/users.jpg";
import MyContext from "../../MyContext";
import "../Settings/UserSettings/UserSettings.scss";

const { Title } = Typography;

export default function MenuWeb() {
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [veterinaryWithNoVets, setVeterinaryWithNoVets] = useState(false);
  const [regentVets, setRegentVets] = useState([]);
  const [regentOfSelectedVet, setRegentOfSelectedVet] = useState(false);
  const { selectedVet } = useContext(MyContext);

  useEffect(() => {
    if (profile.veterinary && !!selectedVet?.value) {
      setVeterinaryWithNoVets(false);
    } else {
      setVeterinaryWithNoVets(true);
    }
  }, [profile.veterinary, selectedVet]);

  const veterinary = {
    module: veterinaryWithNoVets
      ? ["Clínicas Veterinarias", "Mapa"]
      : [
          "Ficha Clínica",
          "Vacunación",
          "Estudios Complementarios",
          "Historial Clínico",
          "Calificaciones",
          "Gestión de Veterinarios",
          "Mis Pacientes",
          "Clínicas Veterinarias",
          "Reportes",
          "Mapa",
        ],
    description: veterinaryWithNoVets
      ? [
          "Visualizá las clínicas veterinarias asociadas.",
          "Encuentrá la ubicación de clínicas veterinarias en un mapa interactivo.",
        ]
      : [
          "Iniciá la consulta médica de cada Mascota, registrando sus datos clínicos.",
          "Gestioná las vacunaciones a Mascotas, llevando un control detallado.",
          "Visualizá los estudios complementarios realizados a las Mascotas.",
          "Accedé a los historiales clinicos de las Mascotas, facilitando un seguimiento exhaustivo de su evolución.",
          "Consultá las valoraciones que han recibido tus servicios.",
          "Gestioná a los veterinarios asociados a la clínica.",
          "Visualizá y accedé rápidamente a la lista de pacientes asociados.",
          "Visualizá las clínicas veterinarias asociadas.",
          "Consultá reportes sobre el rendimiento y la actividad de los diferentes servicios del sistema.",
          "Encontrá la ubicación de clínicas veterinarias en un mapa interactivo.",
        ],
    disabled: [false, true],
    img: veterinaryWithNoVets
      ? [clinica, mapa]
      : [
          fichaClinica,
          vacunacion,
          estudios,
          historial,
          calificacion,
          veterinarios,
          mascota,
          clinica,
          reportes,
          mapa,
        ],
    routes: veterinaryWithNoVets
      ? ["/vets-associations", "/vetsMap"]
      : [
          "/clinical-record-menu",
          "/vaccination",
          "/studies",
          "/clinical-records-management",
          "/vetQualification",
          "/veterinaries-management",
          "/pets-management",
          "/vets-associations",
          "/reports",
          "/vetsMap",
        ],
  };

  const tutor = {
    module: [
      "Historial Clínico",
      "Estudios Complementarios",
      "Mis Mascotas",
      "Clínicas Asociadas",
      "Calificaciones",
      "Reportes",
      "Mapa",
    ],
    description: [
      "Accedé a los historiales clinicos de las Mascotas, facilitando un seguimiento exhaustivo de su evolución.",
      "Visualizá los estudios complementarios realizados a las Mascotas.",
      "Gestioná y accedé rápidamente a la lista de Mascotas.",
      "Gestioná a las clinicas asociadas.",
      "Registrá valoraciones a tus Veterinarios asociados",
      "Consultá reportes sobre el rendimiento y la actividad de los diferentes servicios del sistema.",
      "Encontrá la ubicación de clínicas veterinarias en un mapa interactivo.",
    ],
    disabled: [false, true],
    img: [
      historial,
      estudios,
      mascota,
      veterinarios,
      calificacion,
      reportes,
      mapa,
    ],
    routes: [
      "/clinical-history",
      "/studies",
      "/pets",
      "/veterinaries-associations",
      "/qualification",
      "/reports",
      "/vetsMap",
    ],
  };

  const vetOwner = {
    module: ["Mis Veterinarios", "Mis Clínicas Veterinarias", "Mapa"],
    description: [
      "Gestioná a los veterinarios asociados a tus clínicas.",
      "Gestioná tus clínicas veterinarias.",
      "Encontrá la ubicación de clínicas veterinarias en un mapa interactivo.",
    ],
    disabled: [false, true],
    img: [veterinarios, clinica, mapa],
    routes: ["/veterinaries-management", "/vets", "/vetsMap"],
  };

  const admin = {
    module: ["Usuarios", "Clínicas Veterinarias", "Mapa"],
    description: [
      "Visualizá los datos los usuarios registrados.",
      "Visualizá los datos de las clinicas registradas.",
      "Encontrá la ubicación de clínicas veterinarias en un mapa interactivo.",
    ],
    disabled: [false, true],
    img: [user, clinica, mapa],
    routes: ["/users", "/vetsList", "/vetsMap"],
  };

  function cantMod() {
    //definir modulos comunes en todos los perfiles, calendar por ejemplo
    let cards = {
      module: [],
      description: [],
      disabled: [false, true],
      img: [],
      routes: [],
    };
    // let flag = false;
    if (profile.tutor != null) {
      cards.module.push(tutor.module);
      cards.description.push(tutor.description);
      cards.img.push(tutor.img);
      cards.routes.push(tutor.routes);
    } else if (profile.veterinary != null) {
      cards.module.push(veterinary.module);
      cards.description.push(veterinary.description);
      cards.img.push(veterinary.img);
      cards.routes.push(veterinary.routes);
    } else if (profile.vetOwner != null) {
      cards.module.push(vetOwner.module);
      cards.description.push(vetOwner.description);
      cards.img.push(vetOwner.img);
      cards.routes.push(vetOwner.routes);
    } else {
      cards.module.push(admin.module);
      cards.description.push(admin.description);
      cards.img.push(admin.img);
      cards.routes.push(admin.routes);
    }
    return cards;
  }

  //fijo 4 modulos por fila
  function Mod() {
    const renderModules = [];
    for (let i = 0; i < cantMod().module[0].length; i++) {
      renderModules.push(
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <CardMenu
            kei={i}
            route={cantMod().routes[0][i]}
            text={cantMod().module[0][i]}
            description={cantMod().description[0][i]}
            disabled={cantMod().disabled[0]}
            img={cantMod().img[0][i]}
          ></CardMenu>
        </Col>
      );
    }
    return renderModules;
  }

  return (
    <Row>
      <Col span={24}>
        <Title className="appTitle">Inicio</Title>
      </Col>
      <Divider></Divider>
      <Mod></Mod>
    </Row>
  );
}
