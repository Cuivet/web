import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Tooltip,
} from "antd";
import {
  InfoCircleOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";

export default function Prognosis(props) {
  // const [disabled, setIsDisabled] = useState(false);
  const { prognosis } = props;
  const { disabled, toggleEdit } = useEditContext();

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };
  const [flag, setFlag] = useState(prognosis ||  '');
  // console.log(flag);
  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("prognosis")) || flag
  );
  useEffect(() => {
    sessionStorage.setItem("prognosis", JSON.stringify(responses));
  }, [responses]);
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
