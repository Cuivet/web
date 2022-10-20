import {
  Form,
  Row,
  Col,
  InputNumber,
  Typography,
  Select,
  Button,
  Input,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { numberValidation } from "../../utils/formValidation";

export default function PhysicalExam(props) {
  const {
    weight,
    temperature,
    pulse,
    mucousMembrane,
    bodyCondition,
    observation,
  } = props;
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([
    { name: ["weight"], value: weight },
    { name: ["temperature"], value: temperature },
    { name: ["pulse"], value: pulse },
    { name: ["mucousMembrane"], value: mucousMembrane },
    { name: ["bodyCondition"], value: bodyCondition },
    { name: ["observation"], value: observation },
  ]);
  const [input, setInput] = useState({
    visitId: null,
    temperature: null,
    weight: null,
    pulse: null,
    mucousMembrane: "",
    bodyCondition: "",
    observation: "",
  });
  const [formValid, setFormValid] = useState({
    temperature: false,
    weight: false,
    pulse: false,
    mucousMembrane: false,
    bodyCondition: false,
    observation: false,
  });

  //debemos diferenciar el valor que queda vacio por eleccion
  //del que aun no ha se ha cargado.
  //si id == null no tiene nada cargado
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
    } else {
      //caso2: carga SOLO los campos
      //habilita campo
      setIsDisabled(false);
      //deja campo vacio, no hace falta recorrer, sobresbribe todo los fields en vacios
      //   for (let i in props) {
      // setInitValue([{ name: toString(i), value: null }]);
      setInitValue([{ name: "empty", value: null }]);
      //   }
    }
  }, [props]);

  const changeForm = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(input);
  };
  const selectChange = (value) => {
    switch (value) {
      case "1":
        setInput({
          ...input,
          bodyCondition: value,
        });
        break;
      case "2":
        setInput({
          ...input,
          bodyCondition: value,
        });
        break;
      case "3":
        setInput({
          ...input,
          bodyCondition: value,
        });
        break;
      case "4":
        setInput({
          ...input,
          bodyCondition: value,
        });
        break;
      case "5":
        setInput({
          ...input,
          bodyCondition: "1",
        });
        break;
      default:
        break;
    }
  };

  //validacion de los tipos de datos
  //no esta funcionando
  const inputValidation = (e) => {
    console.log("e");
    if (
      e.target.name === "weight" ||
      e.target.name === "temperature" ||
      e.target.name === "pulse"
    ) {
      console.log("Entre");
      setFormValid({
        ...formValid,
        [e.targe.name]: numberValidation(e.target),
      });
    } else {
      setFormValid({
        ...formValid,
        [e.targe.name]: true,
      });
    }
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
  };
  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Examen Físico
          </Typography.Title>
        </Col>
        <Form
          layout="horizontal"
          labelCol={{ span: 8 }}
          onFinish={register}
          onChange={changeForm}
          fields={initValue}
        >
          <Col span={24}>
            <Form.Item
              name="weight"
              label="Peso"
              tooltip={{
                title: "peso en Kilogramos",
                icon: <InfoCircleOutlined />,
              }}
            >
              <InputNumber
                name="weight"
                min={1}
                disabled={disabled}
                onChange={inputValidation}
                keyboard="false"
                style={{ width: 300 }}
                placeholder="Ingrese el peso"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="temperature"
              label="Temperatura"
              tooltip={{
                title: "temperatura en °C",
                icon: <InfoCircleOutlined />,
              }}
            >
              <InputNumber
                name="temperature"
                disabled={disabled}
                min={30}
                max={50}
                keyboard="false"
                onChange={inputValidation}
                style={{ width: 300 }}
                placeholder="Ingrese la temperatura"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="pulse"
              label="Pulso"
              tooltip={{
                title: "latidos por minuto",
                icon: <InfoCircleOutlined />,
              }}
            >
              <InputNumber
                name="pulse"
                disabled={disabled}
                min={30}
                onChange={inputValidation}
                keyboard="false"
                style={{ width: 300 }}
                placeholder="Ingrese el pulso"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="mucousMembrane"
              label="Mucosa"
              tooltip={{
                title: "informacion relacionada con la mucosa",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                name="mucousMembrane"
                style={{ width: 300 }}
                allowClear
                disabled={disabled}
                onChange={inputValidation}
                placeholder={"Ingrese mucosa"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="bodyCondition"
              label="Condicion corporal"
              tooltip={{
                title: "",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                name="bodyCondition"
                style={{ width: 300 }}
                disabled={disabled}
                onChange={selectChange}
                placeholder={"Seleccione condicion corporal"}
              >
                <Select.Option value="1">Muy Flaco</Select.Option>
                <Select.Option value="2">Flaco</Select.Option>
                <Select.Option value="3">Normal</Select.Option>
                <Select.Option value="4">Exceso de Peso</Select.Option>
                <Select.Option value="5">Obeso</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="observation"
              label="Observacion"
              tooltip={{
                title: "algo",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input.TextArea
                style={{ width: 300 }}
                disabled={disabled}
                name="observation"
                rows={4}
                allowClear
                onChange={inputValidation}
                placeholder="Ingrese alguna observacion"
                maxLength={500}
                showCount
                autoSize={{ minRows: 4, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Tooltip title={"Guardar"}>
                <Button
                  htmlType="submit"
                  shape="round"
                  className="stepSave"
                  disabled={disabled}
                  type="primary"
                >
                  <CheckOutlined />
                </Button>
              </Tooltip>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </>
  );
}
