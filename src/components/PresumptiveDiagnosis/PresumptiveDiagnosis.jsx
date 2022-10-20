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
  Space,
  Tooltip,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function PresumptiveDiagnosis(props) {
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: ["weight"], value: 12 }]);
  const [input, setInput] = useState({
    visitId: null,
    temperature: null,
    weight: null,
    pulse: null,
    mucousMembrane: "",
    bodyCondition: "",
    observation: "",
  });

  const changeForm = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(input);
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
    console.log("Received values of form:", e);
  };

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Diagnostico Presuntivo
          </Typography.Title>
        </Col>
        <Form
          name="dynamic_form_nest_item"
          onFinish={register}
          autoComplete="off"
          layout="horizontal"
          labelCol={{span:10}}
        >
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}
