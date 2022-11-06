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
  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

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
    props.stepSave(e);
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
            Exámen Físico
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            layout="horizontal"
            labelCol={{ sm: { span: 8 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            onFinish={register}
            onChange={changeForm}
            fields={initValue}
          >
            <Col span={24}>
              <Form.Item
                name="weight"
                label="Peso"
                tooltip={{
                  title: "Peso en Kilogramos",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  name="weight"
                  min={1}
                  style={{ width: "100%" }}
                  disabled={disabled}
                  addonAfter={'Kg'}
                  onChange={inputValidation}
                  keyboard="false"
                  placeholder="Ingrese el peso"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="temperature"
                label="Temperatura"
                tooltip={{
                  title: "Temperatura en grados Celsius",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  name="temperature"
                  disabled={disabled}
                  style={{ width: "100%" }}
                  min={30}
                  max={50}
                  keyboard="false"
                  addonAfter={'°C'}
                  onChange={inputValidation}
                  placeholder="Ingrese la temperatura"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="pulse"
                label="Pulso"
                tooltip={{
                  title: "Latidos por minuto",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  name="pulse"
                  disabled={disabled}
                  style={{ width: "100%" }}
                  min={30}
                  onChange={inputValidation}
                  addonAfter={'lpm'}
                  keyboard="false"
                  placeholder="Ingrese el pulso"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="mucousMembrane"
                label="Mucosa"
                tooltip={{
                  title: "información relacionada con la mucosa",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  name="mucousMembrane"
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
                label="Condición corporal"
                tooltip={{
                  title: "",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  name="bodyCondition"
                  disabled={disabled}
                  onChange={selectChange}
                  placeholder={"Seleccione condición corporal"}
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
                label="Observación"
                tooltip={{
                  title: "algo",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  disabled={disabled}
                  name="observation"
                  rows={4}
                  allowClear
                  onChange={inputValidation}
                  placeholder="Ingrese alguna observación"
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 4, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item wrapperCol={{ span: 24 }}>
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
        </Col>
      </Row>
    </>
  );
}
