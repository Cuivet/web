import { SaveOutlined } from "@ant-design/icons";
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
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";

const { Title } = Typography;

export default function ClinicalRecordT() {
  const location = useLocation();
  let navigate = useNavigate();
  const { toggleEdit } = useEditContext();
  //recordar que clinicalRecord es una variable asincronica, el impacto se vera reflejado, pero no en el momento
  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [newVisit, setNewVisit] = useState(null);
  const [flag, setFlag] = useState(true);

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
    //busca una empezada
    if (location.state.clinicalRecordId) {
      clinicalRecordService
        .findOneById(location.state.clinicalRecordId)
        .then((res) => {
          setClinicalRecord(res);
          toggleEdit();
          setFlag(false);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
      //crea una de cero
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
          setFlag(false);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    }
    setNewVisit({
      id: null,
      clinicalRecordId: null,
      date: new Date().toISOString(),
    });
    console.log("en useEffect: ", clinicalRecord);
  }, [location, flag]);

  //trae de ConsultationSteps 'data' y setea los datos en el clinicalRecord
  //guarda automaticamente el mismo
  const saveClinicalRecord = (data) => {
    console.log(data);
    // if (clinicalRecord.visits.length === 0) {
    //   // setClinicalRecord((clinicalPrev) => ({
    //   //   ...clinicalPrev,
    //   //   visits: [
    //   //     {
    //   //       id: null,
    //   //       clinicalRecordId: clinicalRecord.id,
    //   //       control: null,
    //   //       date: new Date().toISOString(),
    //   //     },
    //   //   ],
    //   // }));
    //   data.visits = [
    //     {
    //       id: null,
    //       clinicalRecordId: clinicalRecord.id,
    //       control: null,
    //       date: new Date().toISOString(),
    //     },
    //   ];
    //   console.log(clinicalRecord.visits);
    // }
    const cRecord = {
      id: clinicalRecord.id,
      veterinaryData: clinicalRecord.veterinaryData,
      tutorData: clinicalRecord.tutorData,
      pet: clinicalRecord.pet,
      visits: clinicalRecord.visits,
      review: clinicalRecord.review
        ? clinicalRecord.review
        : {
            id: null,
            name: clinicalRecord.pet.name,
            birth: clinicalRecord.pet.birth,
            isMale: clinicalRecord.pet.isMale,
            raceId: clinicalRecord.pet.raceId,
            specieId: clinicalRecord.pet.specieId,
          },
      anamnesis: { id: null, anamnesisItems: data.anamnesisItems },
      physicalExam: data.physicalExam,
      presumptiveDiagnosis: {
        id: null,
        presumptiveDiagnosisItems: data.presumptiveDiagnosisItems,
        complementaryStudies: data.complementaryStudies,
      },
      diagnosis: { id: null, diagnosisItems: [data.diagnosisItems] },
      prognosis: data.prognosis,
      // visits: data.visits,
    };
    console.log(cRecord);
    message.loading("Finalizando Ficha Clinica", 1, () => {
      clinicalRecordService
        .updateClinicalRecord(cRecord)
        .then((res) => {
          console.log(res);
          message.success("Guardado con exito!");
        })
        .catch((error) => {
          console.log(error.response.data);
          message.error("Error al guardar");
        });

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
    // console.log(data);
    setNewVisit((prevNewVisit) => {
      const updatedVisit = { ...prevNewVisit, control: data };

      setClinicalRecord((clinicalPrev) => ({
        ...clinicalPrev,
        visits: [...clinicalPrev.visits, updatedVisit],
      }));

      return updatedVisit;
    });
  };

  
  function updateIdToNull(data) {
    if (data.id !== undefined && typeof data.id !== "object") {
      data.id = null;
    }
    if (Array.isArray(data.diagnosisItemTreatments)) {
      data.diagnosisItemTreatments.forEach((treatment) => {
        if (treatment.id !== undefined && typeof treatment.id !== "object") {
          treatment.id = null;
        }
      });
    }
    return data;
  }

  const saveClinicalRecordUnfinished = () => {
    let visits = clinicalRecord.visits;
    visits.push(newVisit);

    let cRecord = {
      id: clinicalRecord.id,
      reasonConsultation: clinicalRecord.reasonConsultation,
      veterinaryData: clinicalRecord.veterinaryData,
      tutorData: clinicalRecord.tutorData,
      pet: clinicalRecord.pet,
      review: clinicalRecord.review
        ? clinicalRecord.review
        : {
            id: null,
            name: clinicalRecord.pet.name,
            birth: clinicalRecord.pet.birth,
            isMale: clinicalRecord.pet.isMale,
            raceId: clinicalRecord.pet.raceId,
          },
      visits: visits,
      physicalExam: JSON.parse(sessionStorage.getItem("physicalExam")) || null,
      anamnesis: null,
      presumptiveDiagnosis: null,
      diagnosis: null,
      prognosis: JSON.parse(sessionStorage.getItem("prognosis")) || null,
    };
    let rConsultation = JSON.parse(sessionStorage.getItem("reasonConsultation"));
    if (rConsultation !== null) {
      cRecord.reasonConsultation = Object.values(rConsultation)[0];
    }
    let aItems = JSON.parse(sessionStorage.getItem("anamnesisItems"));
    if (aItems !== null) {
      clinicalRecord.anamnesis.id
        ? (cRecord.anamnesis = null)
        : (cRecord.anamnesis = {
            id: null,
            anamnesisItems: Object.keys(aItems).map((key) => aItems[key]),
          });
    }

    let pDItems = JSON.parse(
      sessionStorage.getItem("presumptiveDiagnosisItems")
    );
    let complementaryStudies =
      JSON.parse(sessionStorage.getItem("complementaryStudies")) || null;
    if (pDItems !== null) {
      clinicalRecord.presumptiveDiagnosis.id
        ? (cRecord.presumptiveDiagnosis = null)
        : (cRecord.presumptiveDiagnosis = {
            id: null,
            presumptiveDiagnosisItems: Object.keys(pDItems).map(
              (key) => pDItems[key]
            ),
            complementaryStudies: complementaryStudies,
          });
    }

    let dItems = JSON.parse(sessionStorage.getItem("diagnosisItems"));
    if (dItems !== null) {
      clinicalRecord.diagnosis.id
        ? (cRecord.diagnosis = null)
        : (cRecord.diagnosis = {
            id: null,
            diagnosisItems: [updateIdToNull(dItems)],
          });
    }

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
    });

    sessionStorage.removeItem("anamnesisItems");
    sessionStorage.removeItem("physicalExam");
    sessionStorage.removeItem("presumptiveDiagnosisItems");
    sessionStorage.removeItem("diagnosisItems");
    sessionStorage.removeItem("prognosis");
  };

  if (clinicalRecord !== null) {
    var lastVisitDate = newVisit.date;
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
                  <Tooltip title="Guardar Consulta">
                    <Button
                      shape="circle"
                      onClick={saveClinicalRecordUnfinished}
                      key={2}
                      type="primary"
                    >
                      <SaveOutlined />
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
                        complementaryStudies={
                          clinicalRecord.presumptiveDiagnosis
                        }
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
