import React, { useState } from "react";
import { Steps, Tooltip, Button, message } from "antd";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Review from "../../components/Review/Review";
import Anamnesis from "../../components/Anamnesis/Anamnesis";
import PhysicalExam from "../../components/PhysicalExam/PhysicalExam";
import PresumptiveDiagnosis from "../../components/PresumptiveDiagnosis/PresumptiveDiagnosis";
import Diagnosis from "../../components/Diagnosis/Diagnosis";
import Prognosis from "../../components/Prognosis/Prognosis";

export default function ConsultationSteps(props) {
  const {
    pet,
    review,
    anamnesis,
    physicalExam,
    presumptiveDiagnosis,
    diagnosis,
    prognosis,
  } = props;
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  console.log(review);
  const steps = [
    {
      title: "Reseña",
      ...(review !== null
        ? { content: <Review id={review.id} pet={pet} /> }
        : { content: <Review id={null} pet={pet} /> }),
      //   subTitle: Visits(cRecord.review),
    },
    {
      title: "Anamnesis",
      ...(anamnesis !== null
        ? {
            content: (
              <Anamnesis
                id={anamnesis.id}
                answers={anamnesis.anamnesisItems}
                //   stepSave={anamnesisChangeForm}
              />
            ),
          }
        : {
            content: (
              <Anamnesis
                id={null}
                answers={null}
                // stepSave={anamnesisChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.anamnesis),
    },
    {
      title: "Exámen Físico",
      ...(physicalExam !== null
        ? {
            content: (
              <PhysicalExam
                id={physicalExam.id}
                physcalExam={physicalExam}
                //   stepSave={physicalExamChangeForm}
              />
            ),
          }
        : {
            content: (
              <PhysicalExam
                id={null}
                physcalExam={null}
                //   stepSave={physicalExamChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.physcalExam),
    },
    {
      title: "Diagnóstico Presuntivo",
      ...(presumptiveDiagnosis !== null
        ? {
            content: (
              <PresumptiveDiagnosis
                id={presumptiveDiagnosis.id}
                presumptiveDiagnosisItem={
                  presumptiveDiagnosis.presumptiveDiagnosisItem
                }
                //  stepSave={presumptiveDiagnosisChangeForm}
              />
            ),
          }
        : {
            content: (
              <PresumptiveDiagnosis
                id={null}
                presumptiveDiagnosis={null}
                // stepSave={presumptiveDiagnosisChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.presumptiveDiagnosis),
    },
    {
      title: "Diagnóstico Final",
      ...(diagnosis !== null
        ? {
            content: (
              <Diagnosis
                id={diagnosis.id}
                diagnosis={diagnosis.diagnosisItems[0]}
                //    stepSave={diagnosisChangeForm}
              />
            ),
          }
        : {
            content: (
              <Diagnosis
                id={null}
                treatments={null}
                // stepSave={diagnosisChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.diagnosis),
    },
    {
      title: "Pronóstico",
      ...(prognosis !== null
        ? {
            content: (
              <Prognosis
                id={presumptiveDiagnosis.id}
                //  stepSave={prognosisChangeForm}
              />
            ),
          }
        : {
            content: (
              <Prognosis
                id={null}
                //  stepSave={prognosisChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.prognosis),
    },
  ];

  return (
    <>
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
    </>
  );
}
