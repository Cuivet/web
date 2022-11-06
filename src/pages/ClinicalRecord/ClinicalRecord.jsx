import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
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
import { getPetsByTutorId } from "../../services/pet.service";

const { Title } = Typography;

export default function ClinicalRecord() {
  const location = useLocation();
  useEffect(() => {
    if (location.state.clinicalRecordId) {
      clinicalRecordService
        .findOneById(location.state.clinicalRecordId)
        .then((res) => {
          setClinicalRecord(res);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    } else {
      const clinicalRecord = {
        veterinaryId: JSON.parse(sessionStorage.getItem("profile")).veterinary
          .id,
        petId: location.state.petId,
        vetId: 1, // cuando desarrollemos lo de vets habria que mandarlo bien
      };
      clinicalRecordService
        .registerClinicalRecord(clinicalRecord)
        .then((res) => {
          setClinicalRecord(res);
        })
        .catch((error) => {
          message.error(error.response.data);
        });
    }
  }, [location]);
  const [isInit, setIsInit] = useState(false);
  const [pets, setPets] = useState([]);
  const [clinicalRecord, setClinicalRecord] = useState(null);
  const [editableStr, setEditableStr] = useState("Motivo de la consulta");
  const [current, setCurrent] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studies, setStudies] = useState(false);
  var veterinary = false;
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  if (profile.veterinary != null) {
    veterinary = true;
  }
  // if (!isInit) {
  //   setIsInit(true);
  //   getPetsByTutorId(profile.tutor.id).then((response) => {
  //     setPets(response);
  //   });
  // }
  const [cRecord, setcRecord] = useState({
    id: 1,
    veterinaryData: {
      veterinary: {
        id: profile.person.id,
        mp: veterinary ? profile.veterinary.mp : null,
        userId: null,
      },
      person: {
        id: 1,
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        address: profile.person.address,
        dni: profile.person.dni,
        userId: null,
      },
    },
    tutorData: {
      tutor: {
        id: 1,
        userId: 3,
      },
      person: {
        id: 2,
        name: "Tomás",
        lastName: "Bardin",
        phone: "3515936520",
        address: "San Cayetano 4465",
        dni: 40402461,
        userId: 3,
      },
    },
    pet: {
      id: 1,
      name: "Malu",
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
      name: "Clínica La Recta",
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
          "El paciente se acercó a la clínica para controlar las lastimaduras y todo ok",
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
          textResponse: "Algún comentario..",
        },
        {
          id: 23,
          anamnesisId: 10,
          anamnesisQuestionId: 4,
          booleanResponse: false,
          textResponse: "comentario...",
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
        "Se palpa en el tórax derecho que el animal sufre de cortes y golpes",
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
          observation: "Radiografia de torax",
          url: "www.cuivet.com/302HLk22",
        },
        {
          id: 3,
          presumptiveDiagnosisId: 4,
          complementaryStudyTypeId: 1,
          observation: "",
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
  });

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
  const { Step } = Steps;

  const changeForm = (fd) => {
    setcRecord({
      ...cRecord,
      [fd.target.name]: fd.target.value,
    });
  };

  const [physcalExam, setPhysicalExam] = useState({
    id: null,
    visitId: null,
    temperature: null,
    weight: null,
    pulse: null,
    mucousMembrane: null,
    bodyCondition: null,
    observation: null,
  });

  const [presumptiveDiagnosis, setPresumptiveDiagnosis] = useState({
    id: 4,
    visitId: 2,
    presumptiveDiagnosisItem: [],
  });

  //faltan los tratamientos
  const [diagnosisItem, setDiagnosisItem] = useState({
    id: null,
    diagnosisId: null,
    diagnosisResult: null,
    observation: null,
    diagnosisTypeId: 2, //???
    diagnosisItemTreatments: [],
  });
  const [diagnosis, setDiagnosis] = useState({
    id: null,
    visitId: null,
    diagnosisItems: [diagnosisItem],
  });

  const [prognosis, setPrognosis] = useState({
    id: null,
    visitId: null,
    observation: null,
  });

  const physicalExamChangeForm = (pe) => {
    setPhysicalExam({
      ...physcalExam,
      [pe.target.name]: pe.target.value,
    });
  };

  //sin terminar el presuntivo
  const [pDI, setPDI] = useState([]);
  const presumptiveDiagnosisChangeForm = (pd) => {
    console.log(pd.presumptiveDiagnosisItem);
    const test = pd.presumptiveDiagnosisItem;
    for (let i in pd.presumptiveDiagnosisItem) {
      console.log(i);
      setPDI([...pDI, { id: 1, observation: test[i].observation }]);
    }
    console.log(pDI);
    // setPresumptiveDiagnosis({
    //   ...presumptiveDiagnosis,
    //   [pd.target.name]: pd.target.value,
    // })
  };

  const diagnosisChangeForm = (d) => {
    if (
      d.target.name === "diagnosisResult" ||
      d.target.name === "observation"
    ) {
      setDiagnosisItem({ ...diagnosisItem, [d.target.name]: d.target.value });
    }
    setDiagnosis({ ...diagnosis, diagnosisItems: diagnosisItem });
  };

  const prognosisChangeForm = (p) => {
    setPrognosis({ ...prognosis, [p.target.name]: p.target.value });
  };

  console.log(prognosis);

  const steps = [
    {
      title: "Reseña",
      content: (
        <Review
          id={Exists(cRecord.review, cRecord.review.id)}
          pet={cRecord.pet}
        />
        // <Review
        //   id={null}
        //   pet={null}
        // />
      ),
      subTitle: Visits(cRecord.review),
    },
    {
      title: "Anamnesis",
      content: (
        // <Anamnesis
        //   id={Exists(cRecord.anamnesis, cRecord.anamnesis.id)}
        //   answers={cRecord.anamnesis.anamnesisItems}
        //   stepSave={changeForm}
        // />
        <Anamnesis id={null} answers={null} stepSave={changeForm} />
      ),
      subTitle: Visits(cRecord.anamnesis),
    },
    {
      title: "Exámen Físico",
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
          stepSave={changeForm}
        />
        // <PhysicalExam
        //   id={null}
        //   weight={null}
        //   temperature={null}
        //   pulse={null}
        //   mucousMembrane={null}
        //   bodyCondition={null}
        //   observation={null}
        //   stepSave={physicalExamChangeForm}
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
        //  stepSave={presumptiveDiagnosisChangeForm}
        // />
        <PresumptiveDiagnosis
          id={null}
          presumptiveDiagnosis={null}
          stepSave={presumptiveDiagnosisChangeForm}
        />
      ),
      subTitle: Visits(cRecord.presumptiveDiagnosis),
    },
    {
      title: "Diagnóstico Final",
      content: (
        // <Diagnosis
        //   id={Exists(cRecord.diagnosis, cRecord.diagnosis.id)}
        //   diagnosis={Exists(cRecord.diagnosis, cRecord.diagnosis.diagnosisItems[0])}
        //    stepSave={diagnosisChangeForm}
        // />
        <Diagnosis id={null} treatments={null} stepSave={diagnosisChangeForm} />
      ),
      subTitle: Visits(cRecord.diagnosis),
    },
    {
      title: "Pronóstico",
      content: (
        // <Prognosis
        //   id={Exists(cRecord.presumptiveDiagnosis, cRecord.presumptiveDiagnosis.id)}
        //  stepSave={prognosisChangeForm}
        // />
        <Prognosis id={null} stepSave={prognosisChangeForm} />
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
        <Typography.Text strong>
          Tutor:{" "}
          {`${cRecord.tutorData.person.name} ${cRecord.tutorData.person.lastName}`}
        </Typography.Text>
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
      {studies ? (
        <div>
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            text="Estudio complementario"
          />
        </div>
      ) : null}
    </>
  );
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="appTitle">Consulta Médica</Title>
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Col span={24}>
          {/* back */}
          <PageHeader
            title={`${cRecord.veterinaryData.person.name} ${cRecord.veterinaryData.person.lastName}`}
            //subTitle="Visita Nro: 1"
            ghost={false}
            className="site-page-header"
            tags={<Tag color="purple">{cRecord.pet.name}</Tag>}
            extra={[
              <Tooltip title="Cerrar Consulta">
                <Button shape="circle" key={2} type="primary">
                  <IssuesCloseOutlined />
                </Button>
              </Tooltip>,
            ]}
            // reemplazar con nombre del back
            avatar={{
              icon: `${cRecord.veterinaryData.person.name.slice(
                0,
                1
              )}${cRecord.veterinaryData.person.lastName.slice(0, 1)}`,
              style: { backgroundColor: "#f56a00" },
            }}
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
            subTitle={cRecord.visits.date}
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
              <Button
                type="dashed"
                style={{ borderColor: "#57266a" }}
                shape="round"
              >
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
            <Button
              type="primary"
              className="primaryDisabled"
              disabled={showControl}
              onClick={handleControl}
            >
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
