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
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import { Link } from "react-router-dom";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";
import ComplementaryStudiesModal from "../ComplementaryStudiesModal/ComplementaryStudiesModal";
// import {
//   DiagnosesContext,
//   DiagnosesContextProvider,
//   useDiagnoses
// } from "../../context/ClinicalRecordContext/DiagnosesContex";

const { Title } = Typography;
const { Option } = Select;

export default function PresumptiveDiagnosis(props) {
  // const [disabled, setIsDisabled] = useState(false);
  const { disabled, toggleEdit } = useEditContext();
  const [isDataFill, setIsDataFill] = useState(false);
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

  // useEffect(() => {
  //   if (props.id !== null) {
  //     // setIsDisabled(true);
  //     setIsDataFill(true);
  //     const newDiagnosis = props.presumptiveDiagnosisItem.map((item, index) => {
  //       if (item.observation !== null && item.id !== null) {
  //         return { name: `observation${index}`, value: item.observation };
  //       }
  //       return { name: "error", value: null };
  //     });
  //     setInitValue(newDiagnosis);
  //   } else {
  //     // setIsDisabled(false);
  //     setIsDataFill(false);
  //     setInitValue([{ name: "empty", value: null }]);
  //   }
  // }, [props]);

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
            <Col key={i}>
              <Form.Item
                name={initValue[i]["name"]}
                label="Diagnóstico"
                tooltip={{
                  title: "diagnóstico presuntivo",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  name=""
                  disabled={disabled}
                  keyboard="false"
                  className="appDataFieldStep"
                  placeholder="Ingrese el diagnóstico"
                />
              </Form.Item>
            </Col>
          );
        }
      }
    }
    console.log(render);
    return render;
  }

  const areObjectPropertiesUndefined = (object) => {
    const propertyNames = Object.keys(object);
    return propertyNames.every(
      (property) => typeof object[property] === "undefined"
    );
  };

  const register = (e) => {
    //guardado de datos, sin validaciones
    //recibo los datos cargados en el form
    if (areObjectPropertiesUndefined(e)) {
      message.loading("Guardando..", 1, () => {
        // Object.keys(e).length === 0
        sessionStorage.setItem(
          "presumptiveDiagnosisItem",
          JSON.stringify(null)
        );
        message.success("Guardado con exito!");
        // setIsDisabled(true);
      });
    } else {
      let list;
      e.presumptiveDiagnosisItem
        ? (list = e.presumptiveDiagnosisItem)
        : (list = []);
      for (let i in list) {
        list[i].id = parseInt(i) + 1;
        list[i].presumptiveDiagnosisId = null; //completar
        list[i].diagnosisTypeId = 2;
      }
      //cargo el primer diagnostico al array
      let first = {
        observation: e.observation,
        id: 0,
        presumptiveDiagnosisId: null,
        diagnosisTypeId: 2,
      };
      list.splice(0, 0, first);
      message.loading("Guardando..", 1, () => {
        // Object.keys(e).length === 0
        sessionStorage.setItem(
          "presumptiveDiagnosisItem",
          JSON.stringify(list)
        );
        message.success("Guardado con exito!");
        // setIsDisabled(true);
      });
      // console.log(list);
    }
  };

  const [showMore, setShowMore] = useState(false);
  const [flag, setFlag] = useState(props.presumptiveDiagnosisItem || "");
  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("presumptiveDiagnosisItem")) || flag
  );

  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem(
      "presumptiveDiagnosisItem",
      JSON.stringify(responses)
    );
    if (Object.keys(responses).length > 1) {
      setShowMore(true);
    }
  }, [responses]);

  const handleTextResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: {
        ...responses[id],
        id: id,
        presumptiveDiagnosisId: null,
        diagnosisTypeId: 2,
        observation: value,
      },
    });
  };

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Diagnostico Presuntivo
            <Tooltip
              title="Pedido de Estudios Complementarios"
              placement="right"
            >
              <Button
                type="link"
                className="appButton"
                size="small"
                style={{ marginLeft: "1%" }}
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
            className="stepForm"
            labelCol={{ sm: { span: 8 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            fields={initValue}
            // onChange={changeForm}
          >
              <>
                <Col>
                  <Form.Item
                    // name="observation"
                    label="Diagnóstico"
                    tooltip={{
                      title: "diagnóstico presuntivo",
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <Input
                      name="0"
                      disabled={disabled}
                      keyboard="false"
                      className="appDataFieldStep"
                      placeholder="Ingrese el diagnóstico"
                      value={responses["0"]?.observation || undefined}
                      onChange={(e) =>
                        handleTextResponseChange(e.target.name, e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Divider>Diagnóstico Diferencial</Divider>
                </Col>
                <Form.List name="diagnoses">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, i) => (
                        <div key={key}>
                          <Col span={24}>
                            <Form.Item
                              {...restField}
                              key={key}
                              // name={[name, `observation`]}
                              label={"Diagnóstico"}
                              tooltip={{
                                title: "diagnóstico diferencial",
                                icon: <InfoCircleOutlined />,
                              }}
                            >
                              <Input
                                disabled={disabled}
                                name={i + 1}
                                placeholder="Ingrese el diagnóstico"
                                value={
                                  responses[i + 1]?.observation || undefined
                                }
                                onChange={(e) =>
                                  handleTextResponseChange(
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col style={{ marginBottom: "2%" }}>
                            <Tooltip title={"Borrar diagnóstico"} align="left">
                              <Button
                                type="primary"
                                shape="circle"
                                onClick={() => remove(name)}
                              >
                                <MinusCircleOutlined />
                              </Button>
                            </Tooltip>
                          </Col>
                        </div>
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
                            {showMore
                              ? "Mostrar mas diagnósticos"
                              : "Agregar diagnóstico"}
                          </Button>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Form.List>
              </>

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
          {/* Estudios complementarios */}
          <ComplementaryStudiesModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </Col>
      </Row>
    </>
  );
}
