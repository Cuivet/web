import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Typography,
  Select,
  Button,
  Input,
  Tooltip,
  Divider,
  InputNumber,
} from "antd";
import {
  InfoCircleOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {treatmentTypeService} from '../../services/treatment_type.service';
import {treatmentOptionService} from '../../services/treatment_option.service';
import {drugService} from '../../services/drug.service';

export default function Diagnosis(props) {
  const [treatmentTypes, setTreatmentTypes]= useState([]);
  const [selectedTreatmentTypeId, setSelectedTreatmentTypeId]= useState(null);
  const [treatmentOptions, setTreatmentOptions]= useState([]);
  const [selectedTreatmentOptionId, setSelectedTreatmentOptionId]= useState(null);
  const [drugs, setDrugs]= useState([]);
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([{ name: null, value: null }]);
  const [input, setInput] = useState({
    visitId: null,
    diagnosisItem: [
      {
        id: null,
        diagnosisId: null,
        diagnosisResult: null,
        observation: null,
        diagnosisTypeId: null,
        diagnosisItemTreatments: null,
      },
    ],
  });
  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
        await treatmentOptionService.findAll()
        .then(response => {
          setTreatmentOptions(response);
        });
        await treatmentTypeService.findAll()
        .then(response => {
          setTreatmentTypes(response);
        });
        await drugService.findAll()
        .then(response => {
          setDrugs(response)
        })
    };
    fetchData();
}, []);

  //   console.log(props);
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);

      //Martina
      const newTreatments = props.diagnosis.diagnosisItemTreatments.map(
        (item, index) => {
          //   console.log(item);
          if (
            item.treatmentOptionId !== null &&
            item.treatmentTypeId !== null
          ) {
            //mapeo si es tipo:medico los demas campos
            if (
              item.drugId !== null &&
              item.frecuencyInterval !== null &&
              item.frecuencyDuration !== null &&
              item.treatmentTypeId === 1
            ) {
              return [
                {
                  name: `treatmentTypeId${index}`,
                  value: item.treatmentTypeId,
                },
                {
                  name: `treatmentOptionId${index}`,
                  value: item.treatmentOptionId,
                },
                {
                  name: `drugId${index}`,
                  value: item.drugId,
                },
                {
                  name: `frecuencyInterval${index}`,
                  value: item.frecuencyInterval,
                },
                {
                  name: `frecuencyDuration${index}`,
                  value: item.frecuencyDuration,
                },
              ];
            } else {
              //si no solo el tipo y el tratamiento
              return [
                {
                  name: `treatmentTypeId${index}`,
                  value: item.treatmentTypeId,
                },
                {
                  name: `treatmentOptionId${index}`,
                  value: item.treatmentOptionId,
                },
              ];
            }
          }
          return { name: "Test", value: "test" };
        }
      );
      let data = [];
      for (let i in newTreatments) {
        for (let j in newTreatments[i]) {
          // console.log();
          data.push(newTreatments[i][j]);
        }
      }
      if (props.diagnosis.diagnosisResult !== null) {
        data.push({
          name: "diagnosisResult",
          value: props.diagnosis.diagnosisResult,
        });
      }
      if (props.diagnosis.observation !== null) {
        data.push({ name: "observation", value: props.diagnosis.observation });
      }

      //   console.log(data);
      setInitValue(data);
    } else {
      //caso2: carga SOLO los campos
      //habilita campo
      setIsDisabled(false);
      setInitValue([{ name: "empty", value: null }]);
    }
  }, [props]);

  console.log(initValue);
  const [flag, setFlag] = useState(false);

  function renderTreatmentTypes() {
    treatmentTypes.forEach(treatmentType => {
        list.push(<Select.Option value={treatmentType.id}>{treatmentType.name}</Select.Option>);
    })
    return list;
  }

function renderTreatmentOptions() {
    let list = [];
    if(selectedTreatmentTypeId!==null){
      treatmentOptions.forEach(treatmentOption => {
        if(treatmentOption.treatmentTypeId === selectedTreatmentTypeId){
            list.push(<Select.Option value={treatmentOption.id}>{treatmentOption.name}</Select.Option>);
        }
      })
    }
    return list;
  }

  function renderDrugs() {
    let list = [];
    drugs.forEach(drug => {
        list.push(<Select.Option value={drug.id}>{drug.name}</Select.Option>);
    })
    return list;
  }

  function RenderT() {
    const render = [];
    for (let i in initValue) {
      if (initValue[i] !== undefined) {
        //agrega el tratamiento
        //falta los intervalos y duracion si son tipo medicos
        //mapear con una bandera de activacion, distintos obj en el array
        if (initValue[i]["name"].slice(0, 15) === "treatmentTypeId") {
          render.push(
            <Col>
              <Form.Item
                name={initValue[i]["name"]}
                // wrapperCol={wrapper}
                label={"Tipo Tratamiento"}
              >
                <Select
                  disabled={disabled}
                  className="appDataFieldStep"
                  placeholder={"Seleccione tipo de tratamiento"}
                >
                  {/* Martina */}
                  {renderTreatmentTypes()}
                </Select>
              </Form.Item>
            </Col>
          );
          if (
            initValue[i]["name"].slice(0, 15) === "treatmentTypeId" &&
            initValue[i]["value"] === 1
          ) {
            setFlag(true);
            console.log(flag);
          }
        } else if (initValue[i]["name"].slice(0, 17) === "treatmentOptionId") {
          render.push(
            <Col>
              <Form.Item
                name={initValue[i]["name"]}
                // wrapperCol={wrapper}
                label={"Tratamiento"}
              >
                <Select
                  disabled={disabled}
                  className="appDataFieldStep"
                  placeholder={"Seleccione tratamiento"}
                >
                  {/* Martina */}
                  {renderTreatmentOptions()}
                </Select>
              </Form.Item>
            </Col>
          );
        } //render intervalo y duracion de medicamentos
        if (flag) {
          if (initValue[i]["name"].slice(0, 17) === "frecuencyInterval") {
            render.push(
              <Col>
                <Form.Item
                  name={initValue[i]["name"]}
                  label={"Intervalo"}
                  //   wrapperCol={wrapper}
                  tooltip={{
                    title: "Intervalo en horas del tratamiento",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <InputNumber
                    min={0}
                    max={24}
                    placeholder={"Ingrese intervalo"}
                    className="appDataFieldStep"
                    addonAfter={"horas"}
                    disabled={disabled}
                  />
                  {/* <TimePicker placeholder="Seleccione intervalo en horas" disabled={disabled} showNow={false} popupStyle={{width:300}} defaultValue={moment('12', 'HH')} style={{width: 300}} format={'HH'}/> */}
                </Form.Item>
              </Col>
            );
          }
          if (initValue[i]["name"].slice(0, 17) === "frecuencyDuration") {
            render.push(
              <Col span={24}>
                <Form.Item
                  name={initValue[i]["name"]}
                  label={"Duración"}
                  //   wrapperCol={wrapper}
                  tooltip={{
                    title: "Duración en días del tratamiento",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <InputNumber
                    min={0}
                    placeholder="Ingrese duración"
                    className="appDataFieldStep"
                    addonAfter={"Días"}
                    disabled={disabled}
                  />
                </Form.Item>
              </Col>
            );
          }
          if (initValue[i]["name"].slice(0, 6) === "drugId") {
            render.push(
              <Col span={24}>
                <Form.Item
                  name={initValue[i]["name"]}
                  //   wrapperCol={wrapper}
                  label={"Droga"}
                  tooltip={{
                    title: "Droga del tratamiento",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <Select
                    disabled={disabled}
                    className="appDataFieldStep"
                    placeholder={"Seleccione droga"}
                  >
                    {/* Martina */}
                    {renderDrugs()}
                  </Select>
                </Form.Item>
              </Col>
            );
          }
        }
      }
      //   console.log(render);
    }
    return render;
  }

  const [medic, setMedic] = useState(false);
  //trigger cuando carga tratamiento tipo medico

  // const handleChange = (value) => {
  //   value === 1 ? setMedic(true) : setMedic(false);
  // };

  const onTreatmentTypeChange = (treatmentTypeId) => {
    setSelectedTreatmentTypeId(treatmentTypeId)
    setSelectedTreatmentOptionId(null);
    if (treatmentTypeId === 1) {
      setMedic(true);
    } else {
      setMedic(false);
    }
  };

  const onTreatmentOptionChange = (treatmentOptionId) => {
    setSelectedTreatmentOptionId(treatmentOptionId)
  }; 
  

  //carga de datos en las variables
  const changeForm = (e) => {
    // no esta andando como deberia
    let test = input.diagnosisItem.map((i) => {
      return { ...i, [e.target.name]: e.target.value };
    });
    setInput({
      ...input,
      diagnosisItem: [{ [e.target.name]: e.target.value }],
    });
    console.log(test);
    console.log(input);
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
            Diagnóstico Final
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
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
                name="diagnosisResult"
                label="Diagnóstico"
                tooltip={{
                  title: "Diagnóstico directo final",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  name="diagnosisResult"
                  disabled={disabled}
                  keyboard="false"
                  className="appDataFieldStep"
                  placeholder="Ingrese el diagnóstico"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={"observation"}
                label={"Observación"}
                tooltip={{
                  title: "Observación sobre el diagnóstico",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  disabled={disabled}
                  name="observation"
                  rows={3}
                  allowClear
                  placeholder="Ingrese observación"
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Divider>Tratamiento</Divider>
            </Col>
            {disabled ? (
              <RenderT />
            ) : (
              <Form.List name="diagnosisItemsTreatments">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            name={[name, "treatmentTypeId"]}
                            label={"Tipo Tratamiento"}
                            tooltip={{
                              title: "Tipo de tratamiento",
                              icon: <InfoCircleOutlined />,
                            }}
                          >
                            {/* Martina */}
                            {/* cargar servicio que trae del back */}
                            <Select
                              placeholder={"Seleccione tipo de tratamiento"}
                              disabled={disabled}
                              name="treatmentTypeId"
                              onChange={onTreatmentTypeChange}
                            >
                              {renderTreatmentTypes()}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            name={[name, "treatmentOptionId"]}
                            label={"Tratamiento"}
                          >
                            {/* Martina */}
                            <Select
                              onChange={onTreatmentOptionChange}
                              placeholder={"Tratamiento"}
                              disabled={disabled}
                              allowClear
                            >
                              {renderTreatmentOptions()}
                            </Select>
                          </Form.Item>
                        </Col>
                        {medic ? (
                          <>
                            <Col>
                              <Form.Item
                                name={"frecuencyInterval"}
                                label={"Intervalo"}
                                //   wrapperCol={wrapper}
                                tooltip={{
                                  title: "Intervalo en horas del tratamiento",
                                  icon: <InfoCircleOutlined />,
                                }}
                              >
                                <InputNumber
                                  min={0}
                                  max={24}
                                  placeholder={"Ingrese intervalo"}
                                  className="appDataFieldStep"
                                  addonAfter={"Horas"}
                                  disabled={disabled}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                name={"frecuencyDuration"}
                                label={"Duración"}
                                tooltip={{
                                  title: "Duración en días del tratamiento",
                                  icon: <InfoCircleOutlined />,
                                }}
                              >
                                <InputNumber
                                  min={0}
                                  placeholder="Ingrese duración"
                                  className="appDataFieldStep"
                                  addonAfter={"Días"}
                                  disabled={disabled}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                name={'drugId'}
                                label={"Droga"}
                                tooltip={{
                                  title: "Droga del tratamiento",
                                  icon: <InfoCircleOutlined />,
                                }}
                              >
                                <Select
                                  disabled={disabled}
                                  className="appDataFieldStep"
                                  placeholder={"Seleccione droga"}
                                >
                                  {/* Martina */}
                                  {renderDrugs()}
                                </Select>
                              </Form.Item>
                            </Col>
                          </>
                        ) : (
                          null
                        )}
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
                      <Form.Item wrapperCol={{ xs:{ span:24},sm:{span: 20, offset: 2} }}>
                        <Button
                          type="dashed"
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
        </Col>
      </Row>
    </>
  );
}
