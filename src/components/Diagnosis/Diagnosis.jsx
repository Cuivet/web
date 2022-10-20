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
  Divider,
} from "antd";
import {
  InfoCircleOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function Diagnosis(props) {
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: null, value: null }]);
  const [input, setInput] = useState({
    visitId: null,
  });
  console.log(props);
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
      const newTreatments = props.treatments.map((item) =>{
            if(item.treatmentOptionId !== null){
                return {name: 'treatmentOptionId', value: item.treatmentOptionId}
            }
      })
    } else {
      //caso2: carga SOLO los campos
      //habilita campo
      setIsDisabled(false);
      setInitValue([{ name: "empty", value: null }]);
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
    console.log("Received values of form:", e);
  };
  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Diagnostico Final
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
              name=""
              label="Diagnostico"
              tooltip={{
                title: "diagnostico directo final",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                name=""
                disabled={disabled}
                keyboard="false"
                style={{ width: 300 }}
                placeholder="Ingrese el diagnostico"
              />
            </Form.Item>
          </Col>
          <Col>
            <Divider>Tratamiento</Divider>
          </Col>
          {disabled ? 'Renderizar los datos cargados' :
            <Form.List name="diagnosisItemsTreatments">
                
                { (fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                        //   <Space
                        //     key={key}
                        //     style={{
                        //       display: "flex",
                        //       marginBottom: 8,
                        //     }}
                        //     align="baseline"
                        //   >
                        <>
                            <Col span={24}>
                            <Form.Item
                                {...restField}
                                name={[name, "treatmentTypeId"]}
                                label={"Tipo Tratamiento"}
                                tooltip={{
                                title: "tipo de tratamiento",
                                icon: <InfoCircleOutlined />,
                                }}
                                // rules={[
                                //     {
                                //     required: true,
                                //     message: 'Missing first name',
                                //     },
                                // ]}
                            >
                                {/* cargar servicio que trae del back */}
                                <Select
                                placeholder={"Tipo"}
                                disabled={disabled}
                                style={{ width: 300 }}
                                >
                                <Select.Option>Clinico</Select.Option>
                                <Select.Option>Algo</Select.Option>
                                <Select.Option>Algo</Select.Option>
                                </Select>
                                {/* <Input placeholder="First Name" /> */}
                            </Form.Item>
                            </Col>
                            <Col span={24}>
                            <Form.Item
                                {...restField}
                                name={[name, "treatmentOptionId"]}
                                label={"Tratamiento"}
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Missing last name",
                                //   },
                                // ]}
                            >
                                <Select
                                placeholder={"Tratamiento"}
                                disabled={disabled}
                                style={{ width: 300 }}
                                >
                                <Select.Option>Algo</Select.Option>
                                </Select>
                                {/* <Input placeholder="Last Name" /> */}
                            </Form.Item>
                            </Col>
                            <Col style={{ marginBottom: "2%" }}>
                            <Tooltip title={"Borrar tratamiento"} align="left">
                                <Button
                                type="primary"
                                shape="circle"
                                onClick={() => remove(name)}
                                >
                                <MinusCircleOutlined />
                                </Button>
                            </Tooltip>
                            </Col>
                        </>
                        //   </Space>
                        ))}
                        <Col>
                        <Form.Item>
                            <Button
                            type="dashed"
                            style={{ width: 300 }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            >
                            Agregar tratamiento
                            </Button>
                        </Form.Item>
                        </Col>
                    </>
                    )}
            </Form.List>
           }
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
