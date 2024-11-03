import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Typography, Divider } from "antd";
import CardMenu from "../../components/CardMenu";
import huella from "../../assets/img/jpg/Huella1.jpg";
import atencion from "../../assets/img/jpg/AtencionClinica.jpg";
// import calendario from "../../assets/img/jpg/calendario.jpg";
import valorar from "../../assets/img/jpg/valorar.jpg";
import clinica from "../../assets/img/jpg/clinica.jpg";
import visitsReports from "../../assets/img/jpg/reportes.jpg";
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
      ? ["Clinicas Veterinarias", "Mapa"]
      : [
          "Ficha Clínica",
          "Vacunacion",
          "Estudios Complementarios",
          "Historial Clinico",
          "Calificaciones",
          "Gestion de Veterinarios",
          "Mis Pacientes",
          "Clinicas Veterinarias",
          "Mapa",
          "Reportes",
        ],
    description: veterinaryWithNoVets
      ? [
          "Visualizá las Clínicas asociadas",
          "Mapa con las Clínicas Veterinarias",
        ]
      : [
          "Iniciar una nueva consulta",
          "Gestion de vacunas a mascotas",
          "Visualizar estudios complementarios de mascotas",
          "Visualizar los historiales clinicos de las mascotas asociadas",
          "Aqui puedes ver las claificaciones que tus atenciones han recibido",
          "Gestiona todos los veterinarios asociados a la Clínicas",
          "Visualizá tus pacientes asociados",
          "Visualizá las Clínicas asociadas",
          "Mapa con las Clínicas Veterinarias",
          "Visualizá tus reportes",
        ],
    disabled: [false, true],
    img: veterinaryWithNoVets
      ? [clinica, huella]
      : [
          atencion,
          huella,
          huella,
          huella,
          huella,
          huella,
          huella,
          clinica,
          huella,
          visitsReports,
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
          "/vetsMap",
          "/reports",
        ],
  };

  const tutor = {
    module: [
      "Historial Clínico",
      "Estudios Complementarios",
      "Mis Mascotas",

      "Veterinarios Asociados",
      "Calificaciones",
      "Mapa",
    ],
    description: [
      "Visualizá el Historial Clínico de tus Mascotas",
      "Visualizá estudios complementarios de tus Mascotas",
      "Gestiona tus Mascotas",
      "Gestiona todos los Veterinarios asociados a tus mascotas",
      "Registrá una reseña a tus Veterinarios asociados",
      "Mapa de las Clínicas Veterinarias",
    ],
    disabled: [false, true],
    img: [huella, huella, valorar, atencion, huella, huella, huella],
    routes: [
      "/clinical-history",
      "/studies",
      "/pets",
      "/qualification",
      "/veterinaries-associations",
      "/vetsMap",
    ],
  };

  const vetOwner = {
    module: ["Mis Veterinarios", "Mis Clínicas Veterinarias", "Mapa"],
    description: [
      "Visualiza los datos los Veterinarios asociados",
      "Visualizá los datos de tu/s Clinica/s",
      "Mapa de las Clínicas Veterinarias",
    ],
    disabled: [false, true],
    img: [atencion, clinica, huella],
    routes: ["/veterinaries-management", "/vets", "/vetsMap"],
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
    }
    if (profile.veterinary != null) {
      cards.module.push(veterinary.module);
      cards.description.push(veterinary.description);
      cards.img.push(veterinary.img);
      cards.routes.push(veterinary.routes);
    }
    if (profile.vetOwner != null) {
      cards.module.push(vetOwner.module);
      cards.description.push(vetOwner.description);
      cards.img.push(vetOwner.img);
      cards.routes.push(vetOwner.routes);
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
