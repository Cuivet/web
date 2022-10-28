import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
  CloseSquareOutlined,
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
  Modal,
  Divider,
  Form,
  Tooltip,
  Input,
} from "antd";
import React, { useState, useEffect } from "react";
// import User from '../../assets/img/png/tutorUsuario.png';

import "./ClinicalRecord.scss";
import Review from "../../components/Review/Review";
import Anamnesis from "../../components/Anamnesis/Anamnesis";
import PhysicalExam from "../../components/PhysicalExam/PhysicalExam";
import PresumptiveDiagnosis from "../../components/PresumptiveDiagnosis/PresumptiveDiagnosis";
import Diagnosis from "../../components/Diagnosis/Diagnosis";
import Prognosis from "../../components/Prognosis/Prognosis";
import { useLocation } from "react-router-dom";
import { clinicalRecordService } from "../../services/clinical_record.service";

const { Title } = Typography;

export default function ClinicalRecord() {
  const location = useLocation();
  useEffect(() => {
    if(location.state.clinicalRecordId){
      clinicalRecordService.findOneById(location.state.clinicalRecordId)
        .then( res =>{
          setClinicalRecord(res);
        })
        .catch(error => {
          message.error(error.response.data);
        });
    } else{
      const clinicalRecord = {
        veterinaryId: JSON.parse(sessionStorage.getItem('profile')).veterinary.id,
        petId: location.state.petId,
        vetId: 1 // cuando desarrollemos lo de vets habria que mandarlo bien
      };
      clinicalRecordService.registerClinicalRecord(clinicalRecord)
            .then( res => {
              setClinicalRecord(res);
            })
            .catch(error => {
                message.error(error.response.data);
            });
    }
  }, [location]);

  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [editableStr, setEditableStr] = useState("Motivo de la consulta...");
  const [current, setCurrent] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleControl = () => {
    //funcion para guardar el control en la visita
    setIsModalOpen(false);
    setShowControl(true);
  };

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
      name: "Pepe",
      birth: "2012-07-07 02:03:41",
      isMale: true,
      tutorId: 1,
      raceId: 201,
      castrationDate: "2020-07-03T19:00:43.000Z",
      haveChip: true,
      aspects: "Cicatriz en oreja derecha",
      hairColorId: 1,
      hairLengthId: 3,
      petSizeId: 2,
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
      name: "Lima",
      birth: "2018-07-09T19:00:43.000Z",
      isMale: false,
      raceId: 2,
      specieId: 2,
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
      mucousMembrane: "Verde y un poco inflamado",
      bodyCondition: "4",
      observation:
        "Se palpa en el torax derecho que el animal sufre de cortes y golpes",
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
          diagnosisTypeId: 3, //no se va a usar o va a ser fijo
          observation: "Gastroenteritis", //no debe venir null
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
          //va a ser un solo objeto por defecto
          id: 4,
          diagnosisId: 2,
          diagnosisResult: "Gastroenteritis aguda",
          observation: "Costo mucho",
          diagnosisTypeId: 2, //
          diagnosisItemTreatments: [
            {
              id: 5,
              diagnosisItemId: 4,
              drugId: 3, //medicamento, no depende del Option
              treatmentTypeId: 1, //tipo tratamiento
              treatmentOptionId: 2, //tratamiento medico: tipo de medicamento(que efecto cubre esa droga)
              frecuencyInterval: 24, //horas,estos solo si son tipo medicos
              frecuencyDuration: 7, //dias, estos solo si son tipo medicos
            },
            {
              id: 6,
              diagnosisItemId: 4,
              drugId: null,
              treatmentTypeId: 2, //quirurgico
              treatmentOptionId: 4, //
              frecuencyInterval: null,
              frecuencyDuration: null,
            },
            {
              id: 7,
              diagnosisItemId: 4,
              drugId: 2,
              treatmentTypeId: 1, //
              treatmentOptionId: 2, //
              frecuencyInterval: 2,
              frecuencyDuration: 12,
            },
            {
              id: 7,
              diagnosisItemId: 4,
              drugId: null,
              treatmentTypeId: 3, //
              treatmentOptionId: 3, //
              frecuencyInterval: null,
              frecuencyDuration: null,
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
    prognosis: {
      id: 2,
      visitId: 3,
      observation: "Se va a recuperar bien",
    },
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
    if (step !== null) {
      // console.log(cRecord.visits)   ;
      const date = cRecord.visits.map((visit) => {
        // console.log(visit)
        return visit.id === step.visitId ? visit.date : null;
      });
      return date;
    }
  }
  // console.log(Visits(cRecord.presumptiveDiagnosis));
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
      subTitle: Visits(cRecord.anamnesis),
    },
    {
      title: "Examen Físico",
      content: (
        <PhysicalExam
          id={Exists(cRecord.physcalExam, cRecord.physcalExam.id)}
          weight={Exists(cRecord.physcalExam, cRecord.physcalExam.weight)}
          temperature={Exists(
            cRecord.physcalExam,
            cRecord.physcalExam.temperature
          )}
          pulse={Exists(cRecord.physcalExam, cRecord.physcalExam.pulse)}
          mucousMembrane={Exists(
            cRecord.physcalExam,
            cRecord.physcalExam.mucousMembrane
          )}
          bodyCondition={Exists(
            cRecord.physcalExam,
            cRecord.physcalExam.bodyCondition
          )}
          observation={Exists(
            cRecord.physcalExam,
            cRecord.physcalExam.observation
          )}
        />
        // <PhysicalExam
        //   id={null}
        //   weight={null}
        //   temperature={null}
        //   pulse={null}
        //   mucousMembrane={null}
        //   bodyCondition={null}
        //   observation={null}
        // />
      ),
      subTitle: Visits(cRecord.physcalExam),
    },
    {
      title: "Diagnóstico Presuntivo",
      content: (
        // <PresumptiveDiagnosis
        //   id={Exists(
        //     cRecord.presumptiveDiagnosis,
        //     cRecord.presumptiveDiagnosis.id
        //   )}
        //   presumptiveDiagnosisItem={Exists(
        //     cRecord.presumptiveDiagnosis,
        //     cRecord.presumptiveDiagnosis.presumptiveDiagnosisItem
        //   )}
        // />
        <PresumptiveDiagnosis id={null} presumptiveDiagnosis={null} />
      ),
      subTitle: Visits(cRecord.presumptiveDiagnosis),
    },
    {
      title: "Diagnóstico Final",
      content: (
        // <Diagnosis
        //   id={Exists(cRecord.diagnosis, cRecord.diagnosis.id)}
        //   diagnosis={Exists(cRecord.diagnosis, cRecord.diagnosis.diagnosisItems[0])}
        // />
        <Diagnosis id={null} treatments={null} />
      ),
      subTitle: Visits(cRecord.diagnosis),
    },
    {
      title: "Pronóstico",
      content: (
        // <Prognosis
        //   id={Exists(cRecord.presumptiveDiagnosis, cRecord.presumptiveDiagnosis.id)}
        // />
        <Prognosis id={null} />
      ),
      subTitle: Visits(cRecord.prognosis),
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
          {/* back */}
          <PageHeader
            title="Eugenia Frattin"
            subTitle="Visita Nro: 1"
            ghost={false}
            className="site-page-header"
            tags={<Tag color="purple">Malu</Tag>}
            extra={[
              <Tooltip title="Cerrar Consulta">
                <Button shape="circle" key={2} type="primary">
                  <IssuesCloseOutlined />
                </Button>
              </Tooltip>,
            ]}
            // reemplazar con nombre del back
            avatar={{ icon: "EF", style: { backgroundColor: "#f56a00" } }}
          >
            <Row>
              <Col span={24}>{content}</Col>
            </Row>
          </PageHeader>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PageHeader
            title="Visita N°1"
            subTitle="22/10/2022"
            style={{ marginTop: "2%" }}
            ghost={false}
            tags={[
              <Tag color="geekblue">RESEÑA</Tag>,
              <Tag color="geekblue">ANAMNESIS</Tag>,
            ]}
            extra={[
              <Button shape="round" type="default" onClick={showModal}>                
                {showControl ? "Ver control" : "Ingresar control"}
              </Button>,
              <Button type="dashed" style={{borderColor:'#57266a'}} shape="round">
                Guardar visita
              </Button>,
            ]}
          >
            <Row>
              <Col span={24}>
                {showControl ? (
                  <Tag color="green">Control</Tag>
                ) : (
                  <Tag color="red">Sin Control</Tag>
                )}
              </Col>
            </Row>
          </PageHeader>
        </Col>
        <Modal
          title="Control"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button type="default" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button type="primary" className="primaryDisabled" disabled={showControl} onClick={handleControl}>
              Guardar
            </Button>,
          ]}
        >
          <Row>
            <Col span={24}>
              <Form>
                <Form.Item>
                  <Input.TextArea
                    disabled={showControl}
                    name="control"
                    rows={4}
                    allowClear
                    placeholder="Ingrese el control..."
                    maxLength={500}
                    showCount
                    autoSize={{ minRows: 4, maxRows: 5 }}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={24}>
          <Steps
            current={current}
            className="steps"
            labelPlacement="vertical"
            percent={(current + 1) * 16.7}
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
