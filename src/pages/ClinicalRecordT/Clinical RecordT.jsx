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
  Modal,
  Divider,
  Tooltip,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clinicalRecordService } from "../../services/clinical_record.service";
import ConsultationHeader from "../../components/ConsultationHeader/ConsultationHeader";
import ConsultationVisits from "../../components/ConsultationVisits/ConsultationVisits";
import ConsultationSteps from "../../components/ConsultationSteps/ConsultationSteps";

const { Title } = Typography;

export default function ClinicalRecordT() {
  const location = useLocation();
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
      
    }
    updateReview();
  }, [location, flag]);

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
