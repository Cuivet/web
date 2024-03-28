import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  message,
  Button,
  Input,
  Tooltip,
} from "antd";
import {
  InfoCircleOutlined,
  CheckOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";

export default function Prognosis(props) {
  // const [disabled, setIsDisabled] = useState(false);
  const { disabled, toggleEdit } = useEditContext();
  const [initValue, setInitValue] = useState([{ name: ["algo"], value: 23 }]);

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

  // useEffect(() => {
  //   //caso1: trae TODOS los datos cargados
  //   if (props.id !== null) {
  //     // setIsDisabled(true);
  //   } else {
  //     //caso2: carga SOLO los campos
  //     //habilita campo
  //     // setIsDisabled(false);
  //     //deja campo vacio, no hace falta recorrer, sobresbribe todo los fields en vacios
  //     //   for (let i in props) {
  //     // setInitValue([{ name: toString(i), value: null }]);
  //     setInitValue([{ name: "empty", value: null }]);
  //     //   }
  //   }
  // }, [props]);

  const changeForm = (e) => {
    //posible uso en el futuro
  };
  const areObjectPropertiesUndefined = (object) => {
    const propertyNames = Object.keys(object);
    return propertyNames.every(
      (property) => typeof object[property] === "undefined"
    );
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
    message.loading("Guardando..", 1, () => {
      // Object.keys(e).length === 0
      areObjectPropertiesUndefined(e)
        ? sessionStorage.setItem("prognosis", JSON.stringify(null))
        : sessionStorage.setItem("prognosis", JSON.stringify(e));

      message.success("Guardado con exito!");
      // setIsDisabled(true);
    });
    console.log(e);
  };

  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("prognosis")) || {}
  );
  useEffect(() => {
    sessionStorage.setItem("prognosis", JSON.stringify(responses));
  }, [responses]);
  console.log(responses);
  const handleTextResponseChange = (name, value) => {
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Pronóstico
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            layout="horizontal"
            labelCol={{ sm: { span: 10 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            // onFinish={register}
            className="stepForm"
            // onChange={changeForm}
            fields={initValue}
          >
            <Col>
              <Form.Item
                // name="observation"
                label="Observación"
                tooltip={{
                  title: "Pronostico de la mascota",
                  icon: <InfoCircleOutlined />,
                }}  
              >
                <Input.TextArea
                  disabled={disabled}
                  // name="observation"
                  rows={4}
                  allowClear
                  placeholder="Ingrese el pronóstico..."
                  maxLength={500}
                  showCount
                  value={responses.observation || undefined}
                  onChange={(e) =>
                    handleTextResponseChange("observation", e.target.value)
                  }
                  autoSize={{ minRows: 4, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
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
