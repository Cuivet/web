import {
  Form,
  Row,
  Col,
  Typography,
  Radio,
  Input,
  Button,
  Tooltip,
  Space,
} from "antd";
import React, { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";

export default function Anamnesis(props) {
  const { answers } = props;
  const [disabled, setIsDisabled] = useState(false);
  // const [radioValue, setRadioValue] = useState([null]);
  const [radiosValues, setRadiosValues] = useState([null]);
  const [initValue, setInitValue] = useState([{ name: null, value: null }]);

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
  // no se para que lo hice pero no lo borro todavia
  // const [input, setInput] = useState(
  //   questions.map((question) => {
  //     return {
  //       anamnesisId: props.id,
  //       anamnesisQuestionId: question.id,
  //       booleanResponse: null,
  //       textResponse: null,
  //     };
  //   })
  // );

  //Create form fields based off how many items are in the questions
  // const itemInputs = questions.map((item) => {
  //   return {
  //     id: item.id,
  //     question: item.question,
  //     isBooleanResponse: item.isBooleanResponse,
  //     isTextResponse: item.isTextResponse,
  //   };
  // });


  //funcion para mapear las preguntas 
  const itemInputs = questions.map((item) => {
    if (item.isBooleanResponse && item.isTextResponse) {
      return { type1: item.question };
    } else {
      if (item.isBooleanResponse) {
        return { type2: item.question };
      }
      if (item.isTextResponse) {
        return { type3: item.question };
      }
    }
  });
  
  const wrapper = {
    sm: { offset: 5, span: 14 },
    xs: {
      offset: 0,
    },
  };

  // const onChange = (e) => {
  //   // setRadioValue(e.target.value);
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   const oldValues = [...radiosValues];
  //   oldValues.splice(e.target.name, 1, e.target.value);
  //   setRadiosValues(oldValues);
  // };

  //carga de datos en los campos
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
      console.log(props.answers[0].anamnesisQuestionId);
      const newAnswers = props.answers.map((answer) => {
        //tipo pregunta 1: texto + radio
        if (answer.booleanResponse !== null && answer.textResponse !== null) {
          return {
            name: answer.anamnesisQuestionId,
            value: answer.textResponse,
          };
          //tipo pregunta 2: radio
        } else if (answer.booleanResponse) {
          return {
            name: answer.anamnesisQuestionId,
            value: answer.booleanResponse,
          };
          //tipo pregunta 3: texto
        } else {
          return {
            name: answer.anamnesisQuestionId,
            value: answer.textResponse,
          };
        }
      });

      setInitValue(newAnswers);
    } else {
      setIsDisabled(false);
    }
  }, [props]);

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
          //tipo pregunta 1: texto + radio
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
          //mapear pregunta para respoder
          //radio
          if (initValue[i] === undefined) {
            render.push(
              <Col>
                <Form.Item
                  name={`textResponse${i}`}
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
            //mapear pregunta para responder
            //texto
            render.push(
              <Col>
                <Form.Item
                  name={`booleanResponse${i}`}
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

  //cada vez que cambia el formulario
  //texto no deja ingresar mas de un caracter por vez
  //probar de hacer la carga en el onfinish
  const changeForm = (e) => {
    // props.stepSave(e);
    // if (e.target.name.slice(0, 15) === "booleanResponse") {
    //   setTest({
    //     ...test,
    //     anamnesisQuestionId: parseInt(e.target.name.slice(15)),
    //     [e.target.name.slice(0, 15)]: e.target.value,
    //   });
    // }
    // if(e.target.name.slice(0,12) === 'textResponse'){
    //   setTest({
    //     ...test,
    //     [e.target.name.slice(0,12)]: e.target.value});
    // }
    // setInput(input.map(i => {
    //   if (i.anamnesisQuestionId === parseInt(e.target.name.slice(15))){
    //     return test;
    //   }
    //   return i;
    // }))
    // setInput(input.map( i => {
    //         if(e.target.name.slice(0,4) === 'bool' && i.anamnesisQuestionId === parseInt(e.target.name.slice(4))){
    //             return {...i, booleanResponse: e.target.value,};
    //         }
    //         // else if (e.target.name.slice(0,4) === 'text' && i.anamnesisQuestionId === parseInt(e.target.name.slice(4))){
    //         //     return {...i, textResponse: e.target.value,};
    //         // }
    //          else{
    //             return {...i};
    //         }
    // }));
    // console.log(test);
    // console.log(input);
  };

  // const onblurForm = (e) => {
  //   console.log(e.target);
  // };

  const register = (e) => {
    console.log(e);
    // let size = Object.keys(e).length;
    // let last = 0;
    // let list = [];
    // for (let key in e) {
    //   let obj;
    //   if (
    //     parseInt(key.slice(15)) === last &&
    //     key.slice(0, 16) === "booleanResponse"
    //   ) {
    //     obj = { booleanResponse: e[key] };
    //     last = parseInt(key.slice(15));
    //   }
    //   if (
    //     parseInt(key.slice(12)) === last &&
    //     key.slice(0, 13) === "textResponse"
    //   ) {
    //     obj = { textResponse: e[key] };
    //     last = parseInt(key.slice(12));
    //   }
    //   console.log(obj);
    //   list.push(obj);
    // console.log(key.slice(15));
    // console.log(`${key}: ${e[key]}`);
    // }
    // console.log(list);
    props.stepSave(e);
  };

  console.log(initValue)
  const test = [{ hola: "bye" }, { hola: "chau" }];


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
            onFinish={register}
            className="stepForm"
            autoComplete="off"
            onChange={changeForm}
          >
            <RenderQ />
            
            <Col>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Tooltip title={"Guardar"}>
                  <Button
                    htmlType="submit"
                    className="stepSave"
                    shape="round"
                    disabled={disabled}
                    type="primary"
                  >
                    <CheckOutlined />
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
