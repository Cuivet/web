import {
  Form,
  Row,
  Col,
  Typography,
  Radio,
  Input,
  Button,
  Tooltip,
} from "antd";
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { LockFilled, UnlockFilled } from "@ant-design/icons";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";
export default function Anamnesis(props) {
  // console.log(props);
  const { disabled, toggleEdit } = useEditContext();

  //preguntas de anamnesis, cambiar por la pegada al endpoint que traiga las preguntas
  const questions = [
    {
      id: 1,
      question: "¿Presenta lesiones expuestas? Describa cuales",
      isBooleanResponse: true,
      isTextResponse: true,
    },
    {
      id: 2,
      question: "¿El pulso es correcto?",
      isBooleanResponse: true,
      isTextResponse: false,
    },
    {
      id: 3,
      question: "¿Cómo ve el estado de la mascota en general?",
      isBooleanResponse: false,
      isTextResponse: true,
    },
    {
      id: 4,
      question: "¿Presenta algo? Describa que",
      isBooleanResponse: true,
      isTextResponse: true,
    },
  ];

  const wrapper = {
    sm: { offset: 5, span: 14 },
    xs: {
      offset: 0,
    },
  };

  const [flag, setFlag] = useState(props.answers || '');

  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("anamnesisItems")) || flag
  );

  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem("anamnesisItems", JSON.stringify(responses));
  }, [responses]);

  const handleBooleanResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: {
        ...responses[id],
        booleanResponse: value,
      },
    });
  };

  const handleTextResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: {
        ...responses[id],
        textResponse: value,
      },
    });
  };

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Typography.Title level={4}>Anamnesis</Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            layout="vertical"
            labelCol={{ sm: { span: 14, offset: 5 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            // onFinish={register}
            className="stepForm"
            autoComplete="off"
          >
            {/*prueba  <RenderQ /> */}
            {questions.map((q, i) => (
              <Col key={q.id}>
                <Form.Item label={q.question} name={`question${q.id}`}>
                  {q.isBooleanResponse && (
                    <Radio.Group
                      optionType="button"
                      disabled={disabled}
                      style={{ marginBottom: "2%" }}
                      name={`booleanResponse${q.id}`}
                      value={responses[i]?.booleanResponse }
                      onChange={(e) =>
                        handleBooleanResponseChange(i, e.target.value)
                      }
                    >
                      <Radio style={{ width: "50%" }} value={true}>
                        Si
                      </Radio>
                      <Radio style={{ width: "50%" }} value={false}>
                        No
                      </Radio>
                    </Radio.Group>
                  )}
                  {q.isTextResponse && (
                    <Input
                      type="text"
                      disabled={disabled}
                      placeholder={"Ingrese su respuesta"}
                      value={responses[i]?.textResponse || ""}
                      onChange={(e) =>
                        handleTextResponseChange(i, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            ))}
            <Col>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Tooltip title={disabled ? "Desbloquear" : "Bloquear"}>
                  <Button
                    className="stepSave"
                    shape="round"
                    type="primary"
                    onClick={toggleEdit}
                  >
                    {disabled ? <LockFilled /> : <UnlockFilled />}
                  </Button>
                </Tooltip>
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
}
