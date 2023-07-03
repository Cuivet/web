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

const { Title } = Typography;

export default function ClinicalRecordT() {
  const location = useLocation();
  let navigate = useNavigate();
  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [flag, setFlag] = useState(true);

  const [studies, setStudies] = useState(false);

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

  useEffect(() => {
    let profile = JSON.parse(sessionStorage.getItem("profile"));
    if (profile && profile.veterinary && profile.veterinary.id && flag) {
      let cRecord = {
        veterinaryId: profile.veterinary.id,
        petId: location.state.petId,
        vetId: 1, //traer si tiene
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
      //probar de guardar automaticamente
      // if (anamnesisItems) {
      //   console.log(anamnesisItems);
      //   setClinicalRecord((prevRecord) => ({
      //     ...prevRecord,
      //     anamnesis: {
      //       id: clinicalRecord.id,
      //       anamnesisItems: anamnesisItems,
      //       visitId: 1,
      //     },
      //   }));
      // }
    }
    console.log(clinicalRecord);
    updateReview();
  }, [location, flag]);

  //trae de ConsultationSteps 'data' y setea los datos en el clinicalRecord
  //guarda automaticamente el mismo
  const saveClinicalRecord = (data) => {
    setClinicalRecord(prevClinicalRecord => ({
      ...prevClinicalRecord,
      anamnesis: {
        ...prevClinicalRecord.anamnesis,
        anamnesisItems: data.anamnesisItems,
      },
      physicalExam: data.physicalExam,
      presumptiveDiagnosis: {
        ...prevClinicalRecord.presumptiveDiagnosis,
        presumptiveDiagnosisItem: data.presumptiveDiagnosisItem,
      },
      diagnosis: {
        ...prevClinicalRecord.diagnosis,
        diagnosisItems: data.diagnosisItems,
      },
      prognosis: data.prognosis
    }));
    message.loading("Guardando Ficha Clinica", 1, () => {
      //pegarle al endpoint para guardar la ficha
      message.success("Guardado con exito!"); 
      sessionStorage.removeItem("anamnesisItems");
      sessionStorage.removeItem("physicalExam");
      sessionStorage.removeItem("presumptiveDiagnosisItem");
      sessionStorage.removeItem("diagnosisItems");
      sessionStorage.removeItem("prognosis");      
      navigate(-1);    
    });
   
  };

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
                  <Tooltip title="Cerrar Consulta">
                    <Button shape="circle" key={2} type="primary">
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
          {/* visitas */}
          <Row>
            <Col span={24}>
              <ConsultationVisits
                id={1}
                date={clinicalRecord.visits.date}
                steps={["RESEÑA", "ANAMNESIS"]}
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
                sendDataClinicalRecord={saveClinicalRecord}
              />
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
