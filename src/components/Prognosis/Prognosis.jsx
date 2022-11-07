import React, { useState, useEffect } from "react";
import { Form, Row, Col, Typography, Button, Input, Tooltip } from "antd";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";

export default function Prognosis(props) {
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: ["algo"], value: 23 }]);
  const [input, setInput] = useState({
    visitId: null,
  });

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

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

  const register = (e) => {
    //guardado de datos, sin validaciones
  };
  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Pronóstico
          </Typography.Title>
        </Col>
        <Col  xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            layout="horizontal"
            labelCol={{ sm: { span: 8 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            onFinish={register}
            onChange={changeForm}
            fields={initValue}
          >
            <Col>
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
                  placeholder="Ingrese el pronóstico..."
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
