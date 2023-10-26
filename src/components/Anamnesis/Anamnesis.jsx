import {
  Form,
  Row,
  Col,
  Typography,
  Radio,
  Input,
  Button,
  Tooltip,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import { CheckOutlined, LockOutlined, LockTwoTone, UnlockOutlined, UnlockTwoTone, LockFilled, UnlockFilled} from "@ant-design/icons";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";
export default function Anamnesis(props) {
  const { answers } = props;
  // const [disabled, setIsDisabled] = useState(false);
  const {disabled, toggleEdit}=useEditContext();
  const [initValue, setInitValue] = useState([{ name: null, value: null }]);
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

  //funcion para mapear las preguntas, sin usar QUITAR
  // const itemInputs = questions.map((item) => {
  //   if (item.isBooleanResponse && item.isTextResponse) {
  //     return { type1: item.question };
  //   } else {
  //     if (item.isBooleanResponse) {
  //       return { type2: item.question };
  //     }
  //     if (item.isTextResponse) {
  //       return { type3: item.question };
  //     }
  //   }
  // });

  const wrapper = {
    sm: { offset: 5, span: 14 },
    xs: {
      offset: 0,
    },
  };

  //carga de datos en los campos
  // useEffect(() => {
  //   //caso1: trae TODOS los datos cargados
  //   const anamnesisItems = JSON.parse(sessionStorage.getItem("anamnesisItems"));
  //   if (props.id !== null || anamnesisItems !== null) {
  //     console.log(anamnesisItems);
  //     setIsDisabled(true);
  //     // console.log(props.answers[0].anamnesisQuestionId);
  //     anamnesisItems.forEach((answer) => {
  //       //tipo pregunta 1: texto + radio
  //       if (answer.booleanResponse !== null && answer.textResponse !== null) {
  //         setInitValue((initValue) => [
  //           ...initValue,
  //           { name: answer.anamnesisQuestionId, value: answer.textResponse },
  //         ]);
  //         //tipo pregunta 2: radio
  //       } else if (answer.booleanResponse) {
  //         setInitValue((initValue) => [
  //           ...initValue,
  //           { name: answer.anamnesisQuestionId, value: answer.booleanResponse },
  //         ]);
  //         //tipo pregunta 3: texto
  //       } else {
  //         setInitValue((initValue) => [
  //           ...initValue,
  //           { name: answer.anamnesisQuestionId, value: answer.textResponse },
  //         ]);
  //       }
  //     });
  //     initValue.slice(1, initValue.length);
  //   } else {
  //     setIsDisabled(false);
  //   }
  // }, [props]);
  // console.log(initValue);

  function RenderQ() {
    const render = [];
    for (let i in questions) {
      //caso2: creo los campos para responder a las preguntas
      if (questions[i]["isBooleanResponse"] && questions[i]["isTextResponse"]) {
        if (initValue[i] === undefined || initValue.length === 1) {
          //mapear pregunta vacia
          //texto + radio
          render.push(
            <Col key={i}>
              <Form.Item
                label={questions[i]["question"]}
                name={`booleanResponse${i}`}
              >
                <Radio.Group
                  disabled={disabled}
                  optionType="button"
                  name={`booleanResponse`}
                >
                  <Radio style={{ width: "50%" }} value={true}>
                    Si
                  </Radio>
                  <Radio style={{ width: "50%" }} value={false}>
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name={`textResponse${i}`}>
                <Input
                  type="text"
                  name={`textResponse`}
                  placeholder={"Ingrese su respuesta"}
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
          );
        } else {
          //tipo pregunta 1: texto + radio, respondida
          if (
            initValue[i]["name"] === questions[i]["id"] &&
            initValue[i]["value"] !== null &&
            typeof initValue[i]["value"] === "string"
          ) {
            render.push(
              <Col key={i}>
                <Form.Item label={questions[i]["question"]}>
                  <Radio.Group
                    disabled={disabled}
                    value={answers[i].booleanResponse}
                    optionType="button"
                  >
                    <Radio style={{ width: "50%" }} value={true}>
                      Si
                    </Radio>
                    <Radio style={{ width: "50%" }} value={false}>
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={questions[i]["id"]}>
                  <Input
                    placeholder={"Ingrese su respuesta"}
                    disabled={disabled}
                  />
                </Form.Item>
              </Col>
            );
          }
        }
      } else {
        if (questions[i]["isBooleanResponse"]) {
          //mapear pregunta vacia
          //radio
          if (initValue[i] === undefined) {
            render.push(
              <Col>
                <Form.Item
                  name={`booleanResponse${i}`}
                  label={questions[i]["question"]}
                >
                  <Radio.Group
                    disabled={disabled}
                    name="booleanResponse"
                    optionType="button"
                  >
                    <Radio style={{ width: "50%" }} value={true}>
                      Si
                    </Radio>
                    <Radio style={{ width: "50%" }} value={false}>
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            );
          } else {
            //pregunta respondida
            if (initValue[i]["name"] === questions[i]["id"]) {
              render.push(
                <Col>
                  <Form.Item
                    name={questions[i]["id"]}
                    label={questions[i]["question"]}
                  >
                    <Radio.Group disabled={disabled} optionType="button">
                      <Radio style={{ width: "50%" }} value={true}>
                        Si
                      </Radio>
                      <Radio style={{ width: "50%" }} value={false}>
                        No
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              );
            }
          }
        }
        if (questions[i]["isTextResponse"]) {
          if (initValue[i] === undefined) {
            //mapear pregunta vacia
            //texto
            render.push(
              <Col>
                <Form.Item
                  name={`textResponse${i}`}
                  label={questions[i]["question"]}
                >
                  <Input
                    name="textResponse"
                    disabled={disabled}
                    placeholder="Ingrese su respuesta"
                  />
                </Form.Item>
              </Col>
            );
          } else {
            render.push(
              <Col>
                <Form.Item
                  name={questions[i]["id"]}
                  label={questions[i]["question"]}
                >
                  <Input
                    disabled={disabled}
                    placeholder="Ingrese su respuesta"
                  />
                </Form.Item>
              </Col>
            );
          }
        }
      }
    }
    // let test = <Form.List name={"anamnesisItems"}>{() => render}</Form.List>;
    return render;
  }
  const areObjectPropertiesUndefined = (object) => {
    const propertyNames = Object.keys(object);
    return propertyNames.every(
      (property) => typeof object[property] === "undefined"
    );
  };

  const register = (e) => {
    const result = Object.entries(e).reduce((acc, [key, value]) => {
      const index = /\d+/.exec(key);
      if (index) {
        acc[index] = acc[index] || {};
        acc[index][key.replace(index, "")] = value;
      } else {
        acc.push({ [key]: value });
      }
      return acc;
    }, []);

    const resultFill = result.map((obj, index) => {
      if (!("id" in obj)) {
        obj.id = null;
      }
      if (!("anamnesisId" in obj)) {
        obj.anamnesisId = null;
      }
      if (!("booleanResponse" in obj)) {
        obj.booleanResponse = null;
      }
      if (!("textResponse" in obj)) {
        obj.textResponse = null;
      }
      return obj;
    });

    const anamnesisItems = resultFill.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).sort(([prop1], [prop2]) =>
          prop1.localeCompare(prop2)
        )
      )
    );
    // onNextStep(anamnesisItems);

    //prueba
    console.log(anamnesisItems);
    const data = anamnesisItems;
    message.loading("Guardando..", 1, () => {
      areObjectPropertiesUndefined(e)
        ? sessionStorage.setItem("anamnesisItems", JSON.stringify(null))
        : sessionStorage.setItem("anamnesisItems", JSON.stringify(data));
      message.success("Guardado con exito!");
      // setIsDisabled(true);
    });

    // props.stepSave(e);
  };

  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("anamnesisItems")) || {}
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
                      style={{marginBottom:'2%'}}
                      name={`booleanResponse${q.id}`}
                      value={responses[q.id]?.booleanResponse || undefined}
                      onChange={(e) =>
                        handleBooleanResponseChange(q.id, e.target.value)
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
                      value={responses[q.id]?.textResponse || ""}
                      onChange={(e) =>
                        handleTextResponseChange(q.id, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            ))}

            {/* <Form.List name={"anamnesisItems"} >
              {(fields) => (
                <>
                {console.log(fields)}
                  {fields.map((field, i) => (
                    <>
                      <Form.Item {...field}>
                        <Input />
                      </Form.Item>
                      {console.log(field)}
                      {Object.keys(itemInputs[i])[0] === "type1"
                        ? 
                          console.log("entre")
                        : 
                          console.log("no")}
                    </>
                  ))}
                </>
              )}
            </Form.List> */}

            {/* {itemInputs.map((item, i) => {
              console.log(Object.keys(item));
              if (Object.keys(item)[0] === "type1") {
                return (
                  <>
                    <Col key={i}>
                      <Form.Item label={item.type1} name={`booleanResponse`}>
                        <Radio.Group
                          disabled={disabled}
                          optionType="button"
                          name={`booleanResponse`}
                        >
                          <Radio style={{ width: "50%" }} value={true}>
                            Si
                          </Radio>
                          <Radio style={{ width: "50%" }} value={false}>
                            No
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name={`textResponse`}>
                        <Input
                          type="text"
                          name={`textResponse`}
                          placeholder={"Ingrese su respuesta"}
                          disabled={disabled}
                        />
                      </Form.Item>
                    </Col>
                  </>
                );
              }
            })} */}

            <Col>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Tooltip title={disabled ? "Desbloquear" : "Bloquear"}>
                  <Button
                    // htmlType="submit"
                    className="stepSave"
                    shape="round"
                    // disabled={disabled}
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
