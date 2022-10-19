import { Form, Row, Col, Typography, Radio, Input, Button } from "antd";
import React, { useState, useEffect } from "react";

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
      question: "¿Presenta algo? Describa cuales",
      isBooleanResponse: true,
      isTextResponse: true,
    },
  ];

  const [input, setInput] = useState(questions.map((question)=> {
        return {anamnesisId: props.id,
        anamnesisQuestionId: question.id,
        booleanResponse: null,
        textResponse: null}
  }));

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
      // setInitValue(props.answers.map(question =>  ({
      //     name: question.anamnesisQuestionId,
      //     value: question.booleanRespons  ? question.booleanResponse : question.textResponse,
      // })));
    } else {
        setIsDisabled(false);

        // const newQuestions = questions.map((question,index) => {
        //     return {
        //         anamnesisId: props.id,
        //         anamnesisQuestionId: question.id,
        //         booleanResponse: null,
        //         textResponse: null};
        // }) 
        // setInput(newQuestions);
        // console.log(newQuestions)
    }
  }, [props]);

function RenderQ() {
    const render = [];
    for (let i in questions) {
        //caso2: creo los campos para cargar las respuestas a las preguntas
        // newInput.push({
        //         anamnesisId: props.id,
        //         anamnesisQuestionId: null,
        //         booleanResponse: null,
        //         textResponse: null
        // });

        
                    
        // console.log(newInput);

        if (questions[i]["isBooleanResponse"] && questions[i]["isTextResponse"]) {
            // console.log(initValue[i]);
            if (initValue[i] === undefined || initValue.length === 1) {
            //mapear pregunta vacia
                render.push(
                    <Col span={24} key={i}>
                    <Form.Item label={questions[i]["question"]}>
                        <Radio.Group
                        disabled={disabled}
                        optionType="button"
                        name={`booleanResponse${questions[i].id}`}
                        >
                            <Radio value={true}>Si</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name={questions[i]["id"]}>
                        <Input
                        type="text"
                        name={`textResponse${questions[i].id}`}
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
                <Col span={24} key={i}>
                    <Form.Item label={questions[i]["question"]}>
                    <Radio.Group
                        disabled={disabled}
                        value={answers[i].booleanResponse}
                        optionType="button"
                    >
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
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
            //esto para traer cuando esta cargado
            if (initValue[i] === undefined) {
            } else {
                if (initValue[i]["name"] === questions[i]["id"]) {
                render.push(
                    <Col span={24}>
                    <Form.Item
                        name={questions[i]["id"]}
                        label={questions[i]["question"]}
                    >
                        <Radio.Group disabled={disabled} optionType="button">
                        <Radio value={true}>Si</Radio>
                        <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    </Col>
                );
                }
            }
            }
            if (questions[i]["isTextResponse"]) {
            if (initValue[i] === undefined) {
            } else {
                render.push(
                <Col span={24}>
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
        };
    };
    return render;
};
// console.log(input);
const [test, setTest] = useState({
  anamnesisId: null,
  anamnesisQuestionId: null,
  booleanResponse: null,
  textResponse: null
}) 
//cada vez que cambia el formulario
//texto no deja ingresar mas de un caracter por vez
    //probar de hacer la carga en el onfinish
const changeForm = e =>{    
  if(e.target.name.slice(0,15) === 'booleanResponse'){
    setTest({ 
      ...test, 
      anamnesisQuestionId: parseInt(e.target.name.slice(15)),
      [e.target.name.slice(0,15)]: e.target.value,
    });
    
  }
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
    
    console.log(test);
    console.log(input);
  };

  const register = e => {
    console.log(e)
    const keys = Object.keys(e);
    for (let j in keys){
      setInput(input.map( i => {   
        console.log(e[keys[j]]);
        if (i.anamnesisQuestionId === keys[j]){
          // console.log( e);
          return {...i, textResponse:e[keys[j]]}
        }
        return {...i}
      }))
    }
    console.log(input);
    // setInput(input.map( i => {
    //   for (let j in keys){
    //     console.log(j)
    //     if (i.anamnesisQuestionId == keys[j]){
    //       // return{ ...i, textResponse: 'algo'}
          
    //     }
    //   }
      

    // }))
  }

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Typography.Title level={4}>Anamnesis</Typography.Title>
        </Col>
        <Form layout="vertical" labelCol={{ span: 24 }} onFinish={register}  fields={initValue} onChange={changeForm}>
          <RenderQ />
          <Col>
            <Form.Item>
              <Button htmlType="submit"  type="primary">Guardar</Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </>
  );
}
