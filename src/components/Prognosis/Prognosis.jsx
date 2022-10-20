import React, { useState, useEffect } from "react";
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

export default function Prognosis(props) {
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: ["algo"], value: 23 }]);
  const [input, setInput] = useState({
    visitId: null,
  });

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
            Pronostico
          </Typography.Title>
        </Col>
        <Form
          layout="horizontal"
          labelCol={{ span: 8 }}
          onFinish={register}
          onChange={changeForm}
          fields={initValue}
        >
          <Col>
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
                placeholder="Ingrese el pronostico..."
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
      </Row>
    </>
  );
}
