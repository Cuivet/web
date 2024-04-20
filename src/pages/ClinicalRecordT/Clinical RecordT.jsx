import { IssuesCloseOutlined } from "@ant-design/icons";
import {
  Button,
  BackTop,
  Col,
  PageHeader,
  Row,
  Typography,
  message,
  Tag,
  Divider,
  Tooltip,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clinicalRecordService } from "../../services/clinical_record.service";
import ConsultationHeader from "../../components/ConsultationHeader/ConsultationHeader";
import ConsultationVisits from "../../components/ConsultationVisits/ConsultationVisits";
import ConsultationSteps from "../../components/ConsultationSteps/ConsultationSteps";
// import { ClinicalRecordProvider } from "../../components/ClinicalRecordContext/ClinicalRecordContext";
//import {ClinicalRecordProvider} from "../../context/ClinicalRecordContext";

const { Title } = Typography;

export default function ClinicalRecordT() {
  const location = useLocation();
  let navigate = useNavigate();
  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [flag, setFlag] = useState(true);

  const updateReview = () => {
    if (clinicalRecord !== null && flag === false) {
      setClinicalRecord((clinicalPrev) => ({
        ...clinicalPrev,
        review: {
          ...clinicalPrev.review,
          name: clinicalRecord.pet.name,
          birth: clinicalRecord.pet.birth,
          isMale: clinicalRecord.pet.isMale,
          raceId: clinicalRecord.pet.raceId,
          specieId: clinicalRecord.pet.specieId,
        },
      }));
    }

    // setFlag(true);
  };

  const getLastDateFromVisits = (visits) => {
    if (Array.isArray(visits) && visits.length > 0) {
      const sortedVisits = visits.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      console.log(sortedVisits);
      return sortedVisits[0].createdAt; //ver si dejo esto o pongo el date
    } else {
      return null; // Return null for empty array or invalid input
    }
  };

  const getStepsDone = (cRecord) => {
    const excludedProperties = [
      "id",
      "CREATEDAT",
      "veterinaryData",
      "tutorData",
      "pet",
      "vet",
      "visits",
    ];

    return Object.keys(cRecord).filter((property) => {
      return (
        cRecord[property] !== null && !excludedProperties.includes(property)
      );
    });
  };

  useEffect(() => {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    if (location.state.clinicalRecordId) {
      clinicalRecordService
        .findOneById(location.state.clinicalRecordId)
        .then((res) => {
          console.log(res);
          setClinicalRecord(res);
          setFlag(false);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    } else if (profile && profile.veterinary && profile.veterinary.id && flag) {
      let cRecord = {
        veterinaryId: profile.veterinary.id,
        petId: location.state.petId,
        vetId: 1, //traer si tiene, debe traer la clinica a la que pertence, pegar al endpoint
      };
      clinicalRecordService
        .registerClinicalRecord(cRecord)
        .then((res) => {
          console.log(res);
          setClinicalRecord(res);
          // sessionStorage.setItem("physicalExam", JSON.stringify(res.physicalExam));
          // sessionStorage.setItem("anamnesisItems", JSON.stringify(res.anamnesis.anamnesisItems || null ));
          // sessionStorage.setItem("presuptiveDiagnosisItem", JSON.stringify(res.presumptiveDiagnosis?.presumptiveDiagnosis));
          // sessionStorage.setItem("diagnosisItems", JSON.stringify(res.diagnosis?.diagnosisItems));
          // sessionStorage.setItem("prognosis", JSON.stringify(res.prognosis));
          setFlag(false);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    }
    // console.log(location.state.clinicalRecordId);

    console.log(clinicalRecord);
    updateReview();
  }, [location, flag]);

  //trae de ConsultationSteps 'data' y setea los datos en el clinicalRecord
  //guarda automaticamente el mismo
  const saveClinicalRecord = (data) => {
    console.log(data);
    if (clinicalRecord.visits.length === 0) {
      setClinicalRecord((clinicalPrev) => ({
        ...clinicalPrev,
        visits: [
          {
            id: null,
            clinicalRecordId: clinicalRecord.id,
            control: null,
            date: new Date().toISOString(),
          },
        ],
      }));
      console.log(clinicalRecord.visits);
    }
    const cRecord = {
      id: clinicalRecord.id,
      veterinaryData: clinicalRecord.veterinaryData,
      tutorData: clinicalRecord.tutorData,
      pet: clinicalRecord.pet,
      visits: clinicalRecord.visits,
      review: clinicalRecord.review,
      anamnesis: { id: null, anamnesisItems: data.anamnesisItems },
      physicalExam: data.physicalExam,
      presumptiveDiagnosis: {
        id: null,
        presumptiveDiagnosisItems: data.presumptiveDiagnosisItems,
        complementaryStudies: data.complementaryStudies,
      },
      diagnosis: { id: null, diagnosisItems: [data.diagnosisItems] },
      prognosis: data.prognosis,
      visits: data.visits,
    };
    console.log(cRecord);
    message.loading("Guardando Ficha Clinica", 1, () => {
      clinicalRecordService
        .updateClinicalRecord(cRecord)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      message.success("Guardado con exito!");
      sessionStorage.removeItem("anamnesisItems");
      sessionStorage.removeItem("physicalExam");
      sessionStorage.removeItem("presumptiveDiagnosisItems");
      sessionStorage.removeItem("complementaryStudies");
      sessionStorage.removeItem("diagnosisItems");
      sessionStorage.removeItem("prognosis");
      sessionStorage.removeItem("visits");
      navigate(-1);
    });
  };

  const saveVisitControl = (data) => {
    // revisar, esto no esta bien
    // if (clinicalRecord.visits[0].id === 0) {
    //   clinicalRecord.visits.shift();
    // }
    console.log(data);
    // console.log(clinicalRecord.visits);

    // Si no hay entrada repetida, actualizar el valor
    // if (!verificarEntradaRepetida(data.date, clinicalRecord.visits)) {
    setClinicalRecord((prevClinicalRecord) => ({
      ...prevClinicalRecord,
      visits: [
        ...prevClinicalRecord.visits,
        {
          id: null,
          clinicalRecordId: null,
          control: data.control,
          date: data.date,
        },
      ],
    }));
    // console.log("entre");
    // };
    console.log(clinicalRecord);
  };

  // Función para verificar si hay una entrada con la misma fecha
  function verificarEntradaRepetida(nuevaEntrada, entradasRegistradas) {
    // const nuevaFecha = new Date(nuevaEntrada.date);
    // console.log(nuevaEntrada);
    // Recorrer las entradas ya registradas
    for (const entrada of entradasRegistradas) {
      // console.log(entrada);
      // const fechaRegistrada = new Date(entrada.date);

      // Comparar las fechas
      if (nuevaEntrada.slice(0, 10) === entrada.date.slice(0, 10)) {
        return true; // Se encontró una entrada con la misma fecha
      }
    }

    return false; // No se encontró ninguna entrada con la misma fecha
  }

  const saveClinicalRecordUnfinished = () => {
    let anamnesisItems;
    let physicalExam;
    let presumptiveDiagnosisItems;
    let diagnosisItems;
    let prognosis;
    if (sessionStorage.getItem("anamnesisItems") !== null) {
      anamnesisItems = JSON.parse(sessionStorage.getItem("anamnesisItems"));
    } else {
      anamnesisItems = [];
    }
    if (sessionStorage.getItem("physicalExam") !== null) {
      physicalExam = JSON.parse(sessionStorage.getItem("physicalExam"));
    } else {
      physicalExam = null;
    }
    if (sessionStorage.getItem("presumptiveDiagnosisItems") !== null) {
      presumptiveDiagnosisItems = JSON.parse(
        sessionStorage.getItem("presumptiveDiagnosisItems")
      );
    } else {
      presumptiveDiagnosisItems = [];
    }
    if (sessionStorage.getItem("diagnosisItems") !== null) {
      diagnosisItems = JSON.parse(sessionStorage.getItem("diagnosisItems"));
    } else {
      diagnosisItems = [];
    }
    if (sessionStorage.getItem("prognosis") !== null) {
      prognosis = JSON.parse(sessionStorage.getItem("prognosis"));
    } else {
      prognosis = null;
    }
    //recordar que clinicalRecord es una variable asincronica, el impacto se vera reflejado, pero no en el momento
    setClinicalRecord((prevClinicalRecord) => ({
      ...prevClinicalRecord,
      anamnesis: {
        ...prevClinicalRecord.anamnesis,
        anamnesisItems: anamnesisItems,
      },
      physicalExam: physicalExam,
      presumptiveDiagnosis: {
        ...prevClinicalRecord.presumptiveDiagnosis,
        presumptiveDiagnosisItems: presumptiveDiagnosisItems,
      },
      diagnosis: {
        ...prevClinicalRecord.diagnosis,
        diagnosisItems: diagnosisItems,
      },
      prognosis: prognosis,
    }));
    message.loading("Guardando Ficha Clinica", 1, () => {
      //
      //pegarle al endpoint para guardar la ficha
      //
      message.success("Guardado con exito!");
      sessionStorage.removeItem("anamnesisItems");
      sessionStorage.removeItem("physicalExam");
      sessionStorage.removeItem("presumptiveDiagnosisItems");
      sessionStorage.removeItem("diagnosisItems");
      sessionStorage.removeItem("prognosis");
      navigate(-1);
    });
    console.log(clinicalRecord);
  };

  if (clinicalRecord !== null) {
    var lastVisitDate = getLastDateFromVisits(clinicalRecord.visits);
    console.log(lastVisitDate);
    var stepsDone = getStepsDone(clinicalRecord).map((str) =>
      str.toUpperCase()
    );
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Consulta Médica</Title>
        </Col>
      </Row>
      <Divider></Divider>
      {clinicalRecord !== null ? (
        <>
          {/* head consulta */}
          <Row>
            <Col span={24}>
              <PageHeader
                title={`${clinicalRecord.veterinaryData.person.name} ${clinicalRecord.veterinaryData.person.lastName}`}
                //subTitle="Visita Nro: 1"
                ghost={false}
                className="site-page-header"
                tags={<Tag color="purple">{clinicalRecord.pet.name}</Tag>}
                extra={[
                  <Tooltip title="Guardar Consulta Parcial">
                    <Button
                      shape="circle"
                      onClick={saveClinicalRecordUnfinished}
                      key={2}
                      type="primary"
                    >
                      <IssuesCloseOutlined />
                    </Button>
                  </Tooltip>,
                ]}
                avatar={{
                  icon: `${clinicalRecord.veterinaryData.person.name.slice(
                    0,
                    1
                  )}${clinicalRecord.veterinaryData.person.lastName.slice(
                    0,
                    1
                  )}`,
                  style: { backgroundColor: "#f56a00" },
                  // size: "small",
                }}
              >
                <Row>
                  <Col span={24}>
                    {clinicalRecord !== null ? (
                      <ConsultationHeader
                        id={clinicalRecord.id}
                        tutorName={`${clinicalRecord.tutorData.person.name} ${clinicalRecord.tutorData.person.lastName}`}
                      />
                    ) : (
                      <Spin />
                    )}
                  </Col>
                </Row>
              </PageHeader>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ConsultationVisits
                id={clinicalRecord.visits.length + 1}
                date={lastVisitDate ? lastVisitDate : "Sin visitas previas"}
                steps={stepsDone}
                visits={clinicalRecord.visits}
                sendDataControl={saveVisitControl}
              />
            </Col>
          </Row>
          <Divider></Divider>
          {/* pasos de la consulta */}
          <Row>
            <Col span={24}>
              <ConsultationSteps
                pet={clinicalRecord.pet}
                review={clinicalRecord.review}
                anamnesis={clinicalRecord.anamnesis}
                physicalExam={clinicalRecord.physicalExam}
                presumptiveDiagnosis={clinicalRecord.presumptiveDiagnosis}
                diagnosis={clinicalRecord.diagnosis}
                prognosis={clinicalRecord.prognosis}
                visits={clinicalRecord.visits}
                sendDataClinicalRecord={saveClinicalRecord}
              />
              {/* <ClinicalRecordProvider value={clinicalRecord} >
                <ConsultationSteps saveStepData={saveStepData}/>
              </ClinicalRecordProvider> */}
            </Col>
          </Row>
        </>
      ) : (
        <Row justify="center">
          <Col span={1} offset={0}>
            <Spin size="large" tip="Cargando..." />
          </Col>
        </Row>
      )}
      <BackTop style={{ color: "#ffff", borderRadius: "20px" }} />
    </>
  );
}
