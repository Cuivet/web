import React, { useState } from "react";
import { Steps, Tooltip, Button } from "antd";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
// import { useClinicalRecord } from "../ClinicalRecordContext/ClinicalRecordContext";
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

  const next = (stepData) => {
    // saveStepData(stepData);
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
              // <Anamnesis
              //   id={anamnesis.id}
              //   answers={anamnesis.anamnesisItems}
              //   //   stepSave={anamnesisChangeForm}
              // />
              <Anamnesis onNextStep={next} answers={anamnesis.anamnesisItems} />
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
      title: "Examen Físico",
      ...(physicalExam !== null
        ? {
            content: (
              <PhysicalExam
                id={physicalExam.id}
                physicalExam={physicalExam}
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
                presumptiveDiagnosisItems={
                  presumptiveDiagnosis.presumptiveDiagnosisItems
                }
                complementaryStudies={presumptiveDiagnosis.complementaryStudies}
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
                diagnosisItems={diagnosis.diagnosisItems[0]}
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
                id={prognosis.id}
                prognosis={prognosis}
                //  stepSave={prognosisChangeForm}
              />
            ),
          }
        : {
            content: (
              <Prognosis
                id={null}
                prognosis={null}
                //  stepSave={prognosisChangeForm}
              />
            ),
          }),
      //   subTitle: Visits(cRecord.prognosis),
    },
  ];
  function updateIdToNull(data) {
    if (data.id !== undefined && typeof data.id !== "object") {
      data.id = null;
      // console.log("entre");
    }
    if (Array.isArray(data.diagnosisItemTreatments)) {
      // console.log("entre2");
      data.diagnosisItemTreatments.forEach((treatment) => {
        if (treatment.id !== undefined && typeof treatment.id !== "object") {
          // console.log("entre3");
          treatment.id = null;
        }
      });
    }
    return data;
  }
  //recopilamos todos los datos que cargamos en la consulta para armar la ficha
  const Save = () => {
    let anamnesisItems =
      Object.keys(JSON.parse(sessionStorage.getItem("anamnesisItems"))).map(
        (key) => JSON.parse(sessionStorage.getItem("anamnesisItems"))[key]
      ) || null;
    let physicalExam = JSON.parse(sessionStorage.getItem("physicalExam")) || null;
    let presumptiveDiagnosisItems = Object.keys(
      JSON.parse(sessionStorage.getItem("presumptiveDiagnosisItems"))
    ).map(
      (key) =>
        JSON.parse(sessionStorage.getItem("presumptiveDiagnosisItems"))[key]
    ) || null;
    let complementaryStudies = JSON.parse(
      sessionStorage.getItem("complementaryStudies")
    ) || [];
    let diagnosisItems = updateIdToNull(
      JSON.parse(sessionStorage.getItem("diagnosisItems"))
    ) || (null);
    let prognosis = JSON.parse(sessionStorage.getItem("prognosis")) || null;
    let visits = JSON.parse(sessionStorage.getItem("visits"));
    
    let cRecord = {
      anamnesisItems: anamnesisItems,
      physicalExam: physicalExam,
      presumptiveDiagnosisItems: presumptiveDiagnosisItems,
      complementaryStudies: complementaryStudies,
      diagnosisItems: diagnosisItems,
      prognosis: prognosis,
      visits: visits,
    };
    console.log(cRecord);
    //prueba del guardado de la ficha clinica,
    //envio los datos recolectados en step a componente padre
    props.sendDataClinicalRecord(cRecord);
  };

  return (
    <>
      <Steps
        current={current}
        className="steps"
        labelPlacement="vertical"
        percent={(current + 1) * 16.7}
        responsive
        // onChange={onChange}
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
          <Tooltip title="Finalizar Ficha Clínica">
            <Button
              type="primary"
              className="steps-action-finish"
              onClick={Save}
              //   onClick={() => message.success("Consulta Finalizada!")}
            >
              <CheckCircleOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
    </>
  );
}
