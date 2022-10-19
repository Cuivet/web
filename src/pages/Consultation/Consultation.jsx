import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  BackTop,
  Col,
  PageHeader,
  Row,
  Typography,
  message,
  Tag,
  Steps,
  Divider,
  Tooltip,
} from "antd";
import React, { useState } from "react";
// import User from '../../assets/img/png/tutorUsuario.png';

import "./Consultation.scss";
import Review from "../../components/Review/Review";
import Anamnesis from "../../components/Anamnesis/Anamnesis";
import PhysicalExam from "../../components/PhysicalExam/PhysicalExam";

const { Title } = Typography;

export default function Consultation() {
  const [editableStr, setEditableStr] = useState("Motivo de la consulta...");
  const [current, setCurrent] = useState(0);

  const cRecord = {
    id: 1,
    veterinaryData: {
      veterinary: {
        id: 1,
        mp: 80604020,
        userId: 2,
      },
      person: {
        id: 1,
        name: "Diego",
        lastName: "García",
        phone: "3516432332",
        address: "Recta Martinolli 4465",
        dni: 17465536,
        userId: 2,
      },
    },
    tutorData: {
      tutor: {
        id: 1,
        userId: 3,
      },
      person: {
        id: 2,
        name: "Tomáas",
        lastName: "Bardin",
        phone: "3515936520",
        address: "San Cayetano 4465",
        dni: 40402461,
        userId: 3,
      },
    },
    pet: {
      id: 1,
      name: "Lima",
      birth: "2018-07-09T19:00:43.000Z",
      isMale: null,
      tutorId: 1,
      raceId: null,
    },
    vet: {
      id: 1,
      name: "Clinica La Recta",
      phone: "03543-429312",
      address: "Recta Martinolli 8520",
      photo: null,
      vetOwnerId: 1,
      veterinaryId: 5,
    },
    visits: [
      {
        id: 1,
        clinicalRecordId: 1,
        control:
          "Observamos que la mascota presenta signos de mordidas propias",
        date: "06/05/2020",
      },
      {
        id: 2,
        clinicalRecordId: 1,
        control: null,
        date: "09/05/2020",
      },
      {
        id: 3,
        clinicalRecordId: 1,
        control:
          "Se recetaron dichos medicamentos como alternativa al faltante que presenta el Rivotril",
        date: "12/05/2020",
      },
      {
        id: 4,
        clinicalRecordId: 1,
        control:
          "El paciente se acercó a la clinica para controlar las lastimaduras y todo ok",
        date: "18/05/2020",
      },
    ],
    review: {
      id: 12,
      visitId: 1,
      weight: 22.3,
      temperature: 37,
    },
    anamnesis: {
      id: 10,
      visitId: 1,
      anamnesisItems: [
        {
          id: 20,
          anamnesisId: 10,
          anamnesisQuestionId: 1,
          booleanResponse: true,
          textResponse: "Unas heridas expuestas",
        },
        {
          id: 21,
          anamnesisId: 10,
          anamnesisQuestionId: 2,
          booleanResponse: true,
          textResponse: null,
        },
        {
          id: 22,
          anamnesisId: 10,
          anamnesisQuestionId: 3,
          booleanResponse: null,
          textResponse: "Algun comentario..",
        },
        {
          id: 23,
          anamnesisId: 10,
          anamnesisQuestionId: 4,
          booleanResponse: false,
          textResponse: "algo",
        },
      ],
    },
    physcalExam: {
      id: 12,
      visitId: 1,
      temperature: 36.2,
      weight: 21,
      pulse: 222,
      mucousMembrane: 'Verde y un poco inflamado',
      bodyCondition: '4',
      observation: 'Se palpa en el torax derecho que el animal sufre de cortes y golpes'
    },
    presumptiveDiagnosis: {
      id: 4,
      visitId: 2,
      presumptiveDiagnosisItem: [
        {
          id: 3,
          presumptiveDiagnosisId: 4,
          diagnosisTypeId: 2,
          observation: "Puede presentar esto por manchas en la panza",
        },
        {
          id: 4,
          presumptiveDiagnosisId: 4,
          diagnosisTypeId: 3,
          observation: null,
        },
      ],
      complementaryStudies: [
        {
          id: 2,
          presumptiveDiagnosisId: 4,
          complementaryStudyTypeId: 2,
          url: "www.cuivet.com/302HLk22",
        },
        {
          id: 3,
          presumptiveDiagnosisId: 4,
          complementaryStudyTypeId: 1,
          url: null,
        },
      ],
    },
    diagnosis: {
      id: 2,
      visitId: 3,
      diagnosisItems: [
        {
          id: 4,
          diagnosisId: 2,
          diagnosisTypeId: 2,
          diagnosisItemTreatments: [
            {
              id: 5,
              diagnosisItemId: 4,
              drugId: 3,
              treatmentTypeId: 2,
              frecuencyInterval: 24,
              frecuencyDuration: 7,
            },
            {
              id: 6,
              diagnosisItemId: 4,
              drugId: 4,
              treatmentTypeId: 4,
              frecuencyInterval: 12,
              frecuencyDuration: 3,
            },
          ],
        },
        {
          id: 5,
          diagnosisId: 2,
          diagnosisTypeId: 3,
          diagnosisItemTreatments: [
            {
              id: 7,
              diagnosisItemId: 5,
              drugId: 2,
              treatmentTypeId: 1,
              frecuencyInterval: 8,
              frecuencyDuration: 2,
            },
          ],
        },
      ],
    },
    prognosis: null,
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function Exists(step, datafield) {
    if (step === null) {
      return null;
    } else {
      return datafield;
    }
  }
  function Visits(step) {
    for (let i in cRecord.visits) {
      for (let j in cRecord.visits[i]) {
        return cRecord.visits[i]["id"] === step.visitId
          ? cRecord.visits[i]["date"]
          : null;
      }
    }
  }
  // console.log(Visits(cRecord.review));
  const { Step } = Steps;
  //weight={cRecord.review.weight} temperature={cRecord.review.temperature}
  const steps = [
    {
      title: "Reseña",
      content: (
        <Review
          id={Exists(cRecord.review, cRecord.review.id)}
          pet={cRecord.pet}         
        />
      ),
      subTitle: Visits(cRecord.review),
    },
    {
      title: "Anamnesis",
      content: (
        // <Anamnesis
        //   id={Exists(cRecord.anamnesis, cRecord.anamnesis.id)}
        //   answers={cRecord.anamnesis.anamnesisItems}
        // />
        <Anamnesis id={null} answers={null} />
      ),
    },
    {
      title: "Examen Físico",
      content: (
        // <PhysicalExam
        //   id={Exists(cRecord.physcalExam, cRecord.physcalExam.id)}
        //   weight={Exists(cRecord.physcalExam, cRecord.physcalExam.weight)}
        //   temperature={Exists(cRecord.physcalExam, cRecord.physcalExam.temperature)}
        //   pulse={Exists(cRecord.physcalExam, cRecord.physcalExam.pulse)}
        //   mucousMembrane={Exists(cRecord.physcalExam, cRecord.physcalExam.mucousMembrane)}
        //   bodyCondition={Exists(cRecord.physcalExam, cRecord.physcalExam.bodyCondition)}
        //   observation={Exists(cRecord.physcalExam, cRecord.physcalExam.observation)}
        // />
        <PhysicalExam
          id={null}
          weight={null}
          temperature={null}
          pulse={null}
          mucousMembrane={null}
          bodyCondition={null}
          observation={null}
        />
      ),
    },
    {
      title: "Diagnostico Presuntivo",
      content: "Componente Diagnostico Presuntivo",
    },
    {
      title: "Diagnostico",
      content: "Componente Diagnostico",
    },
    {
      title: "Tratamiento",
      content: "Componente Tratamiento",
    },
    {
      title: "Pronostico",
      content: "Componente Pronostico",
    },
  ];
  const IconLink = ({ src, text }) => (
    <a href="www.estudio.com" className="example-link">
      <img className="example-link-icon" src={src} alt={text} />
      {text}
    </a>
  );

  const content = (
    <>
      <Row>
        <Typography.Text type="secondary">Ficha Nro: 76531732</Typography.Text>
      </Row>
      <Row>
        <Typography.Text strong>Tutor: Tomas Bardin</Typography.Text>
      </Row>
      <Row>
        <Title
          level={5}
          className="motive"
          editable={{
            tooltip: "click to edit text",
            onChange: setEditableStr,
            triggerType: "text",
          }}
        >
          {editableStr}
        </Title>
      </Row>

      <div>
        <IconLink
          src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          text=" Estudio complementario"
        />
      </div>
    </>
  );
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Consulta Medica</Title>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={24}>
          <PageHeader
            title="Eugenia Frattin"
            subTitle="Visita Nro: 1"
            ghost={false}
            className="site-page-header"
            tags={<Tag color="purple">Malu</Tag>}
            extra={[
              <Button key={1} type="default">
                Control
              </Button>,
              <Button key={2} type="primary">
                Cerrar
              </Button>,
            ]}
            avatar={{ icon: "EF", style: { backgroundColor: "#f56a00" } }}
          >
            <Row>
              <Col span={24}>{content}</Col>
            </Row>
          </PageHeader>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={24}>
          <Steps
            current={current}
            className="steps"
            labelPlacement="vertical"
            percent={(current + 1) * 14.4}
            responsive
          >
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                status={item.status}
                description={item.description}
                subTitle={item.subTitle}
              />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current > 0 && (
              <Tooltip title="Atras" placement="top">
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  className="steps-action-back"
                  onClick={() => prev()}
                >
                  <LeftCircleOutlined />
                </Button>
              </Tooltip>
            )}
            {current < steps.length - 1 && (
              <Tooltip title="Siguiente">
                <Button
                  type="primary"
                  className="steps-action-next"
                  onClick={() => next()}
                >
                  <RightCircleOutlined />
                </Button>
              </Tooltip>
            )}
            {current === steps.length - 1 && (
              <Tooltip title="Finalizar">
                <Button
                  type="primary"
                  className="steps-action-finish"
                  onClick={() => message.success("Consulta Finalizada!")}
                >
                  <CheckCircleOutlined />
                </Button>
              </Tooltip>
            )}
          </div>
        </Col>
      </Row>
      <BackTop style={{ color: "#ffff", borderRadius: "20px" }} />
      {/* <Divider></Divider> */}
    </>
  );
}
