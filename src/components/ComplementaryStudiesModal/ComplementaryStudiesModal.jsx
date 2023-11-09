import React, { useState } from "react";
import { Modal, Row, Col, Form, Input, Select, Typography } from "antd";
// import { Link } from "react-router-dom";

const { Title } = Typography;

export default function ComplementaryStudiesModal(prop) {
  const { isModalOpen, handleCancel, onAddStudy, presumptiveDiagnosisId } =
    prop;
  const studies = [
    {
      id: 1,
      name: "Ecografía",
    },
    {
      id: 2,
      name: "Rayos X",
    },
    {
      id: 3,
      name: "Tomografía",
    },
    {
      id: 4,
      name: "Resonancia Magnetica",
    },
    {
      id: 5,
      name: "Analisis de Sangre",
    },
    {
      id: 6,
      name: "ADN",
    },
    {
      id: 7,
      name: "Electrocardiograma",
    },
    {
      id: 8,
      name: "Sonda",
    },
    {
      id: 9,
      name: "Patología",
    },
    {
      id: 10,
      name: "Higiene Veterinaria",
    },
    {
      id: 11,
      name: "Cirugía Especializada",
    },
    {
      id: 12,
      name: "Medicamentos Oncologicos",
    },
  ];
  const setOptions = (studies) => {
    let options = [];
    for (let study of studies) {
      options.push({ value: study.id, label: study.name });
    }
    return options;
  };

  const [complementaryStudyTypeId, setComplementaryStudyTypeId] = useState("");
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();

  const handleAddStudy = () => {
    if (complementaryStudyTypeId) {
      onAddStudy({
        complementaryStudyTypeId,
        observation,
        presumptiveDiagnosisId: presumptiveDiagnosisId,
        id: count,
        url: "www.cuivet.com/studies-request" + complementaryStudyTypeId,
      });
      setCount(count + 1);
      setComplementaryStudyTypeId("");
      setObservation("");
      handleCancel();
    }
  };

  return (
    <Modal
      title="Pedido de Estudios Complementarios"
      visible={isModalOpen}
      onOk={() => {
        form.validateFields().then(() => {
          form.resetFields();
          handleAddStudy();
        });
      }}
      okText="Generar"
      onCancel={handleCancel}
    >
      <Row>
        <Title level={5}>Tipo de Estudio Complementario:</Title>
      </Row>
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              name="study"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione un estudio",
                },
              ]}
            >
              <Select
                placeholder={"Estudios"}
                allowClear
                // mode="multiple"
                // labelInValue
                showSearch
                name={"complementaryStudyTypeId"}
                className="select-before full-width"
                style={{ width: "100%" }}
                // value={null}
                onChange={(value) => setComplementaryStudyTypeId(value)}
                options={setOptions(studies)}
                // maxTagCount={'responsive'}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Title level={5}>Observaciones:</Title>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Input.TextArea
                showCount
                allowClear
                maxLength={500}
                defaultValue={""}
                value={observation}
                placeholder="Ingrese observacion..."
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                onChange={(e) => setObservation(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
