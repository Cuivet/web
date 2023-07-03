import {
  Form,
  Row,
  Col,
  InputNumber,
  Typography,
  Select,
  Button,
  Input,
  message,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

export default function PhysicalExam(props) {
  const { physicalExam } = props;
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState(null);

  const [input, setInput] = useState({
    visitId: null,
    temperature: null,
    weight: null,
    pulse: null,
    mucousMembrane: "",
    bodyCondition: "",
    observation: "",
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
      setInitValue([
        { name: ["weight"], value: physicalExam.weight },
        { name: ["temperature"], value: physicalExam.temperature },
        { name: ["pulse"], value: physicalExam.pulse },
        { name: ["mucousMembrane"], value: physicalExam.mucousMembrane },
        { name: ["bodyCondition"], value: physicalExam.bodyCondition },
        { name: ["observation"], value: physicalExam.observation },
      ]);
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
    // props.stepSave(e);
    // const { value, name } = e.target;
    // console.log(value);
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

  const areObjectPropertiesUndefined = (object) => {
    const propertyNames = Object.keys(object);
    return propertyNames.every(
      (property) => typeof object[property] === "undefined"
    );
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
    console.log(Object.keys(e).length);
    message.loading("Guardando..", 1, () => {
      // Object.keys(e).length === 0
      areObjectPropertiesUndefined(e)
        ? sessionStorage.setItem("physicalExam", JSON.stringify(null))
        : sessionStorage.setItem("physicalExam", JSON.stringify(e));

      message.success("Guardado con exito!");
      setIsDisabled(true);
    });
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
            className="stepForm"
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
                  addonAfter={"Kg"}
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
                  addonAfter={"°C"}
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
                  addonAfter={"lpm"}
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
                  placeholder={"Ingrese mucosa"}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="bodyCondition"
                label="Condición corporal"
                tooltip={{
                  title: "clasificacion segun apreciación visual",
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
                  title: "comentario relacionado a la condición física",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  disabled={disabled}
                  name="observation"
                  rows={4}
                  allowClear
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
