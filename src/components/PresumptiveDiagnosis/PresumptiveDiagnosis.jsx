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
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import { useEditContext } from "../../context/ClinicalRecordContext/ClinicalRecordContext";
import ComplementaryStudiesModal from "../ComplementaryStudiesModal/ComplementaryStudiesModal";
import './PresumptiveDiagnosis.scss';


export default function PresumptiveDiagnosis(props) {
  const { disabled, toggleEdit } = useEditContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blocked, setBlocked] = useState(true);
  

  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [showMore, setShowMore] = useState(false);
  const flag = props.presumptiveDiagnosisItems || "";
  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("presumptiveDiagnosisItems")) || flag
  );
  
  const study =  props.complementaryStudies || "";
  const [complementaryStudies, setComplementaryStudies] = useState(
    JSON.parse(sessionStorage.getItem("complementaryStudies")) || study
  );

  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem(
      "presumptiveDiagnosisItems",
      JSON.stringify(responses)
    );
    sessionStorage.setItem(
      "complementaryStudies",
      JSON.stringify(complementaryStudies)
    );
    if (responses[0]?.observation.length > 0 ){
       setBlocked(false)
      };

    // if (complementaryStudies.length > 0) {
    //   const updatedUrls = complementaryStudies.map((item) =>
    //     item.url ? item.url : "404: not-found"
    //   );
    //   console.log(updatedUrls);
    //   setUrls(updatedUrls);
    // }
    if (Object.keys(responses).length > 1) {
      setShowMore(true);
    }
  }, [responses, complementaryStudies]);

  const handleTextResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: {
        ...responses[id],
        id: null,
        presumptiveDiagnosisId: null, //es el mismo para todos
        diagnosisTypeId: null, //fijo, definir valor que tendra
        observation: value,
      },
    });
  };


  const handleAddItem = (item) => {
    setComplementaryStudies([...complementaryStudies, item]);
  };
  const handleRemovePresumptiveDiagnosisItem = (id) => {
    setResponses((prevState) => {
      const updatedPresumptiveDiagnosis = { ...prevState };
      delete updatedPresumptiveDiagnosis[id];
      return updatedPresumptiveDiagnosis;
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
                type="primary"
                className="studiesButton"
                shape="circle"
                size="small"
                icon={<BiotechOutlinedIcon />}
                onClick={showModal}
              />
            </Tooltip>
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          
          <Form
            // onFinish={register}
            autoComplete="off"
            layout="horizontal"
            className="stepForm"
            labelCol={{ sm: { span: 10 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
          >
            <>
              <Col>
                <Form.Item
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
                            label={"Diagnóstico"}
                            tooltip={{
                              title: "diagnóstico diferencial",
                              icon: <InfoCircleOutlined />,
                            }}
                          >
                            <Input
                              disabled={disabled}
                              name={key + 1}
                              placeholder="Ingrese el diagnóstico"
                              value={responses[key + 1]?.observation || undefined}
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
                              onClick={() =>{ remove(name);
                                handleRemovePresumptiveDiagnosisItem(key + 1);}}
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
                        >
                          {showMore
                            ? "Ver mas diagnósticos"
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
          {/* Estudios complementarios modal*/}
          <ComplementaryStudiesModal
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            onAddStudy={handleAddItem}
            presumptiveDiagnosisId={responses[0]?.presumptiveDiagnosisId}
          />
        </Col>
      </Row>
    </>
  );
}
