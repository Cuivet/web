import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
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
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { clinicalRecordService } from "../../services/clinical_record.service";
import { findAllByPetId } from "../../services/vaccination.service";
import { drugTypeService } from "../../services/drug_type.service";
import { drugService } from "../../services/drug.service";
import ConsultationHeader from "../../components/ConsultationHeader/ConsultationHeader";
import ConsultationVisits from "../../components/ConsultationVisits/ConsultationVisits";
import ConsultationSteps from "../../components/ConsultationSteps/ConsultationSteps";
import VaccinationModal from "../../components/VaccinationModal/VaccinationModal";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";
import MyContext from "../../MyContext";
import "./ClinicalRecord.scss";

const { Title } = Typography;

export default function ClinicalRecord() {
  const location = useLocation();
  let navigate = useNavigate();
  const { toggleEdit } = useEditContext();
  //recordar que clinicalRecord es una variable asincronica, el impacto se vera reflejado, pero no en el momento
  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [newVisit, setNewVisit] = useState(null);
  const [flag, setFlag] = useState(true);
  const [showVaccination, setShowVaccination] = useState(false);
  const [vaccinationData, setVaccinationData] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [drugTypes, setDrugTypes] = useState([]);
  const { selectedVet } = useContext(MyContext);

  //renderiza los pasos completados en tags en el Header
  const getStepsDone = (cRecord) => {
    const excludedProperties = [
      "id",
      "createdAt",
      "veterinaryData",
      "tutorData",
      "pet",
      "vet",
      "visits",
    ];

    const translations = {
      reasonConsultation: "motivo Consulta",
      review: "revisión",
      anamnesis: "anamnesis",
      physicalExam: "examen Fisico",
      presumptiveDiagnosis: "diagnostico Presuntivo",
      diagnosis: "diagnostico",
      prognosis: "pronostico",
    };
  
    return Object.keys(cRecord)
      .filter((property) => {
        return (
          cRecord[property] !== null && !excludedProperties.includes(property)
        );
      })
      .map((property) => translations[property] || property);
  };

  const generatePetVaccinationData = (vaccinations) => {
    let finalData = [];
    // console.log("vaccinations: ", vaccinations);
    vaccinations.forEach((vaccination) => {
      finalData.push({
        key: vaccination.id,
        petId: vaccination.petId,
        id: vaccination.id,
        placementDate: moment(vaccination.placementDate).format("DD/MM/YYYY"),
        drug: drugs.find((drug) => drug.id === vaccination.drugId).name,
        drugType: drugTypes.find(
          (drugType) =>
            drugType.id ===
            drugs.find((drug) => drug.id === vaccination.drugId).drugTypeId
        ).name,
        weight: vaccination.weight,
        signed: vaccination.signed,
        nextDate:
          vaccination.nextDate === null
            ? "-"
            : moment(vaccination.nextDate).format("DD/MM/YYYY"),
        observation: vaccination.observation,
      });
    });
    // console.log("tabla2: ", finalData);
    // setVaccinatioData(finalData);
    setVaccinationData(finalData);
  };

  useEffect(() => {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    drugTypeService.findAll().then((response) => {
      setDrugTypes(response);
    });
    drugService.findAll().then((response) => {
      setDrugs(response);
    });
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
        vetId: selectedVet?.value, //el vetId seleccionado en el MenuTop
      };
      clinicalRecordService
        .registerClinicalRecord(cRecord)
        .then((res) => {
          setClinicalRecord(res);
          setFlag(false);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    }
    findAllByPetId(clinicalRecord?.pet.id).then((res) => {
      generatePetVaccinationData(res);
    });
    setNewVisit({
      id: null,
      clinicalRecordId: null,
      date: new Date().toISOString(),
    });
    console.log("en useEffect: ", clinicalRecord);
  }, [location, flag]);

  //trae de ConsultationSteps 'data' y setea los datos en el clinicalRecord
  //guarda automaticamente el mismo, todos los pasos de una vez
  const saveClinicalRecord = (data) => {
    console.log(data);

    let visits = clinicalRecord.visits;
    visits.push(newVisit);

    let rConsultation = JSON.parse(
      sessionStorage.getItem("reasonConsultation")
    );

    let isComplete = true;

    // Verificar cada paso y mostrar advertencias si está incompleto
    if (data.anamnesisItems.length === 0) {
      message.warning("Paso 2: Anamnesis incompleto");
      isComplete = false;
    }
    if (data.physicalExam === null) {
      message.warning("Paso 3: Examen Fisico incompleto");
      isComplete = false;
    }
    if (data.presumptiveDiagnosisItems.length === 0) {
      message.warning("Paso 4: Diagnostico Presuntivo incompleto");
      isComplete = false;
    }
    if (!data.diagnosisItems.diagnosisResult) {
      message.warning("Paso 5: Diagnostico Final incompleto");
      isComplete = false;
    }
    if (data.prognosis === null) {
      message.warning("Paso 6: Prognosis incompleta");
      isComplete = false;
    }

    if (isComplete) {
      const cRecord = {
        id: clinicalRecord.id,
        reasonConsultation: rConsultation
          ? Object.values(rConsultation)[0]
          : null,
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
        anamnesis: {
          id:
            clinicalRecord.anamnesis.id !== null
              ? clinicalRecord.anamnesis.id
              : null,
          anamnesisItems: data.anamnesisItems,
        },
        physicalExam: data.physicalExam,
        presumptiveDiagnosis: {
          id:
            clinicalRecord.presumptiveDiagnosis.id !== null
              ? clinicalRecord.presumptiveDiagnosis.id
              : null,
          presumptiveDiagnosisItems: data.presumptiveDiagnosisItems,
          complementaryStudies: data.complementaryStudies,
        },
        diagnosis: {
          id:
            clinicalRecord.diagnosis.id !== null
              ? clinicalRecord.diagnosis.id
              : null,
          diagnosisItems: [data.diagnosisItems],
        },
        prognosis: Object.defineProperties(data.prognosis, {
          id: { value: null },
        }),
      };

      console.log(cRecord);
      message.loading("Finalizando Ficha Clinica", 1, () => {
        clinicalRecordService
          .updateClinicalRecord(cRecord)
          .then((res) => {
            message.success("Ficha Clinica finalizada con exito!");
          })
          .catch((error) => {
            message.error("Error al finalizar Ficha Clinica");
          });

        goBack();
      });
    }
  };
  //guardado del control de la visita, puede estar vacio
  const saveVisitControl = (data) => {
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
  // guardado de ficha en con pasos pendientes
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
    let rConsultation = JSON.parse(
      sessionStorage.getItem("reasonConsultation")
    );
    if (rConsultation !== null) {
      cRecord.reasonConsultation = Object.values(rConsultation)[0];
    }
    let aItems = JSON.parse(sessionStorage.getItem("anamnesisItems"));
    if (aItems !== null) {
      clinicalRecord.anamnesis
        ? clinicalRecord.anamnesis.id
          ? (cRecord.anamnesis = null)
          : (cRecord.anamnesis = {
              id: null,
              anamnesisItems: Object.keys(aItems).map((key) => aItems[key]),
            })
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
      clinicalRecord.presumptiveDiagnosis
        ? clinicalRecord.presumptiveDiagnosis.id
          ? (cRecord.presumptiveDiagnosis = null)
          : (cRecord.presumptiveDiagnosis = {
              id: null,
              presumptiveDiagnosisItems: Object.keys(pDItems).map(
                (key) => pDItems[key]
              ),
              complementaryStudies: complementaryStudies,
            })
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
      clinicalRecord.diagnosis
        ? clinicalRecord.diagnosis.id
          ? (cRecord.diagnosis = null)
          : (cRecord.diagnosis = {
              id: null,
              diagnosisItems: [updateIdToNull(dItems)],
            })
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
          message.success("Ficha Clinica Guardada");
        })
        .catch((error) => {
          message.error("Error al Guardar Ficha Clinica");
        });
    });
    goBack();
  };

  const goBack = () => {
    sessionStorage.removeItem("reasonConsultation");
    sessionStorage.removeItem("anamnesisItems");
    sessionStorage.removeItem("physicalExam");
    sessionStorage.removeItem("presumptiveDiagnosisItems");
    sessionStorage.removeItem("complementaryStudies");
    sessionStorage.removeItem("diagnosisItems");
    sessionStorage.removeItem("prognosis");
    navigate(-1);
  };

  if (clinicalRecord !== null) {
    var lastVisitDate = newVisit.date;
    var stepsDone = getStepsDone(clinicalRecord).map((str) =>
      str.toUpperCase()
    );
    console.log(stepsDone);
  }
  const showVaccinationModal = () => {
    console.log(vaccinationData);
    setShowVaccination(true);
  };

  const handleCancel = () => {
    setShowVaccination(false);
  };
  const IconLink = ({ src, text }) => (
    <Button
      type="link"
      style={{ border: "none" }}
      className="vaccination"
      onClick={showVaccinationModal}
    >
      <img
        className="example-link-icon"
        style={{ marginRight: "5px" }}
        src={src}
        alt={text}
      />
      {text}
    </Button>
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            className="appTitle"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ marginRight: "2%", marginLeft: "1%" }}>
              <Tooltip placement="bottom" title="Volver">
                <Button
                  type="link"
                  shape="circle"
                  className="goBackButton"
                  ghost
                  size="large"
                  onClick={goBack}
                >
                  <ArrowLeftOutlined />
                </Button>
                {"   "}
              </Tooltip>
            </div>
            Consulta Médica
          </Title>
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
                c
              >
                <Row>
                  <Col span={24}>
                    {clinicalRecord !== null ? (
                      <ConsultationHeader
                        id={clinicalRecord.id}
                        tutorName={`${clinicalRecord.tutorData.person.name} ${clinicalRecord.tutorData.person.lastName}`}
                        reasonConsultation={clinicalRecord.reasonConsultation}
                        cStudies={
                          clinicalRecord.presumptiveDiagnosis
                            ?.complementaryStudies
                        }
                      />
                    ) : (
                      <Spin />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ marginTop: "2%" }}>
                    <div>
                      <IconLink
                        src={
                          "https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                        }
                        text=" Carnet de Vacunación"
                      />
                    </div>
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
          <VaccinationModal
            visible={showVaccination}
            onCancel={handleCancel}
            data={vaccinationData}
          />
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
