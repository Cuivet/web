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
import {
  InfoCircleOutlined,
  CheckOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";

export default function PhysicalExam(props) {
  console.log(props);
  const { physicalExam } = props;
  const { disabled, toggleEdit } = useEditContext();

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

  const [flag, setFlag] = useState(physicalExam || '')

  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("physicalExam")) || flag
  );

  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem("physicalExam", JSON.stringify(responses));
    // if (!disabled){
    //   setIsDisabled(JSON.parse(sessionStorage.getItem("disabled")).anamnesis);
    // }
  }, [responses]);
  console.log(responses);

  const handleTextResponseChange = (name, value) => {
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const handleNumericResponseChange = (name, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
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
            // onFinish={register}
            className="stepForm"
            // onChange={changeForm}
            // fields={initValue}
          >
            <Col span={24}>
              <Form.Item
                // name="weight"
                label="Peso"
                tooltip={{
                  title: "Peso en Kilogramos",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  // name="weight"
                  min={1}
                  style={{ width: "100%" }}
                  disabled={disabled}
                  addonAfter={"Kg"}
                  keyboard="false"
                  name={`weight`}
                  value={responses["weight"] || undefined}
                  onChange={(value) =>
                    handleNumericResponseChange("weight", value)
                  }
                  placeholder="Ingrese el peso"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Temperatura"
                tooltip={{
                  title: "Temperatura en grados Celsius",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  name={`temperature`}
                  disabled={disabled}
                  style={{ width: "100%" }}
                  min={30}
                  max={50}
                  keyboard="false"
                  addonAfter={"°C"}
                  placeholder="Ingrese la temperatura"
                  value={responses["temperature"] || undefined}
                  onChange={(value) =>
                    handleNumericResponseChange("temperature", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Pulso"
                tooltip={{
                  title: "Latidos por minuto",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <InputNumber
                  name={`pulse`}
                  disabled={disabled}
                  style={{ width: "100%" }}
                  min={30}
                  addonAfter={"lpm"}
                  keyboard="false"
                  placeholder="Ingrese el pulso"
                  value={responses["pulse"] || undefined}
                  onChange={(value) =>
                    handleNumericResponseChange("pulse", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mucosa"
                tooltip={{
                  title: "información relacionada con la mucosa",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  name={`mucousMembrane`}
                  allowClear
                  disabled={disabled}
                  placeholder={"Ingrese mucosa"}
                  value={responses["mucousMembrane"] || undefined}
                  onChange={(e) =>
                    handleTextResponseChange("mucousMembrane", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Condición corporal"
                tooltip={{
                  title: "clasificacion segun apreciación visual",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  name="bodyCondition"
                  disabled={disabled}
                  // onChange={selectChange}
                  value={responses["bodyCondition"] || undefined}
                  onChange={(value) =>
                    handleTextResponseChange("bodyCondition", value)
                  }
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
                label="Observación"
                tooltip={{
                  title: "comentario relacionado a la condición física",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  name={`observation`}
                  disabled={disabled}
                  rows={4}
                  allowClear
                  placeholder="Ingrese alguna observación"
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 4, maxRows: 5 }}
                  value={responses["observation"] || undefined}
                  onChange={(e) =>
                    handleTextResponseChange("observation", e.target.value)
                  }
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
