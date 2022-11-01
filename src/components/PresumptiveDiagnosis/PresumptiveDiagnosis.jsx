import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Divider,
  Tooltip,
  Select,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';

const {Title} =Typography;
const {Option}= Select;

export default function PresumptiveDiagnosis(props) {
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: ["weight"], value: 12 }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState({
    visitId: null,
    presumptiveDiagnosisItem: null,
  });
  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

  useEffect(() => {
    if (props.id !== null) {
      setIsDisabled(true);
      const newDiagnosis = props.presumptiveDiagnosisItem.map((item, index) => {
        if (item.observation !== null && item.id !== null) {
          return { name: `observation${index}`, value: item.observation };
        }
        return { name: "error", value: null };
      });
      setInitValue(newDiagnosis);
    } else {
      setIsDisabled(false);
      setInitValue([{ name: "empty", value: null }]);
    }
  }, [props]);

  const showModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function RenderD() {
    const render = [];
    for (let i in initValue) {
      if (initValue[i] !== undefined) {
        if (initValue[i]["name"].slice(0, 11) === "observation") {
          render.push(
            <Col>
              <Form.Item
                name={initValue[i]["name"]}
                label="Diagnostico"
                tooltip={{
                  title: "diagnostico presuntivo",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  name=""
                  disabled={disabled}
                  keyboard="false"
                  className="appDataFieldStep"
                  placeholder="Ingrese el diagnostico"
                />
              </Form.Item>
            </Col>
          );
        }
      }
    }
    return render;
  }
  const [item, setItem] = useState([{}]);

  const changeForm = (e) => {
    console.log(e);
    // console.log(e.target.value)
    setItem([...item, { [e.target.name]: e.target.value }]);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(item);
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
    //recibo los datos cargados en el form, capas no haga falta hace el guardado en el cambio

    console.log("Received values of form:", e.presumptiveDiagnosisItem);
  };

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Diagnostico Presuntivo
            <Tooltip title="Pedido de Estudios Complementarios" placement="right">
            <Button
              type="link"
              className="appButton"
              size="small"
              style={{marginLeft:'1%'}}
              icon={<BiotechOutlinedIcon />}
              onClick={showModal}
            />
          </Tooltip>
          </Typography.Title>
          
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            onFinish={register}
            autoComplete="off"
            layout="horizontal"
            labelCol={{ sm: { span: 8 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            fields={initValue}
            onChange={changeForm}
          >
            {disabled ? (
              <RenderD />
            ) : (
              <>
                <Col>
                  <Form.Item
                    name="observation"
                    label="Diagnostico"
                    tooltip={{
                      title: "diagnostico presuntivo",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input
                      name="observation"
                      disabled={disabled}
                      keyboard="false"
                      className="appDataFieldStep"
                      placeholder="Ingrese el diagnostico"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Divider>Diagnostico Diferencial</Divider>
                </Col>

                <Form.List name="presumptiveDiagnosisItem">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <>
                          <Col span={24}>
                            <Form.Item
                              {...restField}
                              name={[name, `observation`]}
                              label={"Diagnostico"}
                              tooltip={{
                                title: "diagnostico diferencial",
                                icon: <InfoCircleOutlined />,
                              }}
                            >
                              <Input
                                disabled={disabled}
                                name={`observation`}
                                placeholder="Ingrese su diagnostico"
                              />
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
                        <Form.Item
                          wrapperCol={{
                            xs: { span: 24 },
                            sm: { span: 20, offset: 2 },
                          }}
                        >
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Agregar diagnostico
                          </Button>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Form.List>
              </>
            )}

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

          <Modal title='Pedido de Estudios Complementarios'             
                visible={isModalOpen} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" >
                        Generar
                    </Button>,
                ]}>
            <Row>
                <Title level={5}>Tipo de Estudio Complementario:</Title>
            </Row>
            <Row>
                <Col span={24}>
                    <Select placeholder='Estudios'
                            allowClear
                            showSearch
                            name={'complementaryStudyTypeId'}
                            className="select-before full-width"
                            style={{ width: '100%' }} > 
                    <Option value={1}>Radiografia</Option>
                    <Option value={2}>Rayos X</Option>
                    <Option value={3}>Particular</Option>
                    <Option value={4}>Ecografia</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Title level={5}>Observaciones:</Title>
            </Row>
            <Row>
                <Col span={24}>
                <Input.TextArea
                    showCount
                    allowClear
                    maxLength={500}
                    placeholder='Ingrese observacion...'
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    
                />
                </Col>
            </Row>

        </Modal>
        </Col>
      </Row>
    </>
  );
}
