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
  MinusCircleOutlined,
  PlusOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { treatmentTypeService } from "../../services/treatment_type.service";
import { treatmentOptionService } from "../../services/treatment_option.service";
import { drugService } from "../../services/drug.service";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";

export default function Diagnosis(props) {
  const [treatmentTypes, setTreatmentTypes] = useState([]);
  const [selectedTreatmentTypeId, setSelectedTreatmentTypeId] = useState(null);
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const { disabled, toggleEdit } = useEditContext();

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };
  //fetch data for selects
  useEffect(() => {
    const fetchData = async () => {
      await treatmentOptionService.findAll().then((response) => {
        setTreatmentOptions(response);
      });
      await treatmentTypeService.findAll().then((response) => {
        setTreatmentTypes(response);
      });
      await drugService.findAll().then((response) => {
        setDrugs(response);
      });
    };
    fetchData();
  }, []);

  function renderTreatmentTypes(treatmentTypeId) {
    let list = [];
    treatmentTypes.forEach((treatmentType) => {
      if (treatmentType.id === treatmentTypeId) {
        list.push(
          <Select.Option value={treatmentTypeId}>
            {treatmentType.name}
          </Select.Option>
        );
      } else {
        list.push(
          <Select.Option value={treatmentType.id}>
            {treatmentType.name}
          </Select.Option>
        );
      }
    });
    return list;
  };

  function renderTreatmentOptions(treatmentTypeId,treatmentOptionId) {
    let list = [];
    if (selectedTreatmentTypeId !== null || treatmentTypeId !== null) {
      treatmentOptions.forEach((treatmentOption) => {
        //renderizado de opciones cuando selecciona el tipo de tratamiento
        if (treatmentOption.treatmentTypeId === selectedTreatmentTypeId) {
          list.push(
            <Select.Option value={treatmentOption.id}>
              {treatmentOption.name}
            </Select.Option>
          );
        }
        //renderizado de opciones cuando viene cargado
        if (treatmentOption.treatmentTypeId === treatmentTypeId && treatmentOptionId === treatmentOption.id) {
          list.push(
            <Select.Option value={treatmentOption.id}>
              {treatmentOption.name}
            </Select.Option>
          );
        }
      });
    }
    return list;
  };

  function renderDrugs() {
    let list = [];
    drugs.forEach((drug) => {
      list.push(<Select.Option value={drug.id}>{drug.name}</Select.Option>);
    });
    return list;
  };
  const onTreatmentTypeChange = (treatmentTypeId) => {
    setSelectedTreatmentTypeId(treatmentTypeId);
  };

  const [showMore, setShowMore] = useState(false);
  const flag = props.diagnosisItems || {
    id: null, //va a haber solo uno SIEMPRE!!!
    diagnosisId: null, //id del diagnóstico al que pertenece
    // diagnosisTypeId: null, // campo no definido, por ahora
    diagnosisItemTreatments: [],
  };

  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("diagnosisItems")) || flag
  );

  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem("diagnosisItems", JSON.stringify(responses));
    if (Object.keys(responses?.diagnosisItemTreatments).length > 1) {
      setShowMore(true);
    }
  }, [responses]);

  const handleItemTreatmentChange = (field, value, id) => {
    setResponses((prevState) => {
      const treatmentIndex = prevState.diagnosisItemTreatments.findIndex(
        (item) => item.id === id + 1
      );

      if (field === "treatmentTypeId") {
        // console.log(value);
        onTreatmentTypeChange(value);
      } 

      if (treatmentIndex !== -1) {
        // Si el tratamiento existe, lo modificamos
        const updatedTreatments = [...prevState.diagnosisItemTreatments];
        updatedTreatments[treatmentIndex][field] = value;

        return {
          ...prevState,
          diagnosisItemTreatments: updatedTreatments,
        };
      } else {
        // Si no existe, creamos uno nuevo
        const newTreatment = {
          id: id + 1, // Ajusta según tu necesidad
          diagnosisItemId: null,          
          [field]: value, // El campo que cambió
        };

        return {
          ...prevState,
          diagnosisItemTreatments: [
            ...prevState.diagnosisItemTreatments,
            newTreatment,
          ],
        };
      }
    });
  };

  const handleTextResponseChange = (name, value) => {
    setResponses({
      ...responses,
      [name]: value,
    });
    return;
  };

  const handleRemoveTreatmentItem = (id) => {
    setResponses((prevState) => {
      const updatedTreatments = prevState.diagnosisItemTreatments.filter(
        (item) => item.id !== id + 1
      );
      return {
        ...prevState,
        diagnosisItemTreatments: updatedTreatments,
      };
    });
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
            autoComplete="off"
            labelCol={{ sm: { span: 10 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            className="stepForm"
          >
            <Col>
              <Form.Item
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
                  value={responses?.diagnosisResult || undefined}
                  onChange={(e) =>
                    handleTextResponseChange("diagnosisResult", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                // name={"observation"}
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
                  value={responses?.observation || undefined}
                  onChange={(e) =>
                    handleTextResponseChange("observation", e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col>
              <Divider>Tratamiento</Divider>
            </Col>
              <Form.List name="diagnosisItemTreatments">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, i) => (
                      //key=contador de campos generados
                      //i=indice de campos en pantalla
                      <div key={key}>
                        {/* {console.log(key, i)} */}
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            key={i}
                            // name={[name, "treatmentTypeId"]}
                            label={"Tipo Tratamiento"}
                            tooltip={{
                              title: "Tipo de tratamiento",
                              icon: <InfoCircleOutlined />,
                            }}
                          >
                            <Select
                              placeholder={"Seleccione tipo de tratamiento"}
                              disabled={disabled}
                              name="treatmentTypeId"
                              defaultValue={responses.diagnosisItemTreatments[i]?.treatmentTypeId || undefined}                              
                              onChange={(value) =>
                                handleItemTreatmentChange(
                                  "treatmentTypeId",
                                  value,
                                  key
                                )
                              }
                            >
                              {renderTreatmentTypes()}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            //name={[name, "treatmentOptionId"]}
                            label={"Tratamiento"}
                          >
                            <Select
                              name="treatmentOptionId"
                              defaultValue={responses.diagnosisItemTreatments[i]?.treatmentOptionId || undefined}
                              onChange={(value) =>
                                handleItemTreatmentChange(
                                  "treatmentOptionId",
                                  value,
                                  key
                                )
                              }
                              placeholder={"Tratamiento"}
                              disabled={disabled}
                              allowClear
                              
                            >
                              {renderTreatmentOptions(responses.diagnosisItemTreatments[i]?.treatmentTypeId || undefined, responses.diagnosisItemTreatments[i]?.treatmentOptionId || undefined)}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            label={"Droga"}
                            tooltip={{
                              title: "Fármaco del tratamiento",
                              icon: <InfoCircleOutlined />,
                            }}
                          >
                            <Select
                              disabled={disabled}
                              name="drugId"
                              placeholder={"Seleccione el fármaco"}
                              defaultValue={responses.diagnosisItemTreatments[i]?.drugId || undefined}
                              allowClear
                              onChange={(value) =>
                                handleItemTreatmentChange("drugId", value, key)
                              }
                            >
                              {renderDrugs()}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            {...restField}
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
                              style={{ width: "100%" }}
                              name="frecuencyInterval"
                              addonAfter={"Horas"}
                              value={responses.diagnosisItemTreatments[i]?.frecuencyInterval || undefined}
                              disabled={disabled}
                              onChange={(value) =>
                                handleItemTreatmentChange(
                                  "frecuencyInterval",
                                  value,
                                  key
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            label={"Duración"}
                            tooltip={{
                              title: "Duración en días del tratamiento",
                              icon: <InfoCircleOutlined />,
                            }}
                          >
                            <InputNumber
                              min={0}
                              placeholder="Ingrese duración"
                              style={{ width: "100%" }}
                              name="frecuencyDuration"
                              addonAfter={"Días"}
                              value={responses.diagnosisItemTreatments[i]?.frecuencyDuration || undefined}
                              disabled={disabled}
                              onChange={(value) =>
                                handleItemTreatmentChange(
                                  "frecuencyDuration",
                                  value,
                                  key
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col style={{ marginBottom: "6%" }}>
                          <Tooltip title={"Borrar tratamiento"} align="left">
                            <Button
                              type="primary"
                              shape="circle"
                              onClick={() => {
                                remove(name);
                                handleRemoveTreatmentItem(key);
                              }}
                            >
                              <MinusCircleOutlined />
                            </Button>
                          </Tooltip>
                        </Col>
                      </div>
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
                        >{showMore ? "Ver mas tratamientos" : "Agregar tratamientos"}
                        </Button>
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Form.List>
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
