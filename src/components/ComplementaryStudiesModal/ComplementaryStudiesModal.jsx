import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Input, Select, Typography, message } from "antd";
import { complementaryStudiyTypeService } from "../../services/complementary_study_type.service";
import { createComplementaryStudy } from "../../services/complementary_study.service";

const { Title } = Typography;

export default function ComplementaryStudiesModal(prop) {
  const { isModalOpen, handleCancel, onAddStudy, presumptiveDiagnosisId } = prop;
  const [studies, setStudies] = useState([]);
  const [complementaryStudyTypeId, setComplementaryStudyTypeId] = useState("");
  const [observation, setObservation] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await complementaryStudiyTypeService
        .findAll()
        .then((response) => {
          setStudies(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const setOptions = (studies) => {
    let options = [];
    for (let study of studies) {
      options.push({ value: study.id, label: study.name });
    }
    return options;
  };

  const handleAddStudy = async () => {
    if (complementaryStudyTypeId) {
      const newStudy = {
        complementaryStudyTypeId,
        observation,
        presumptiveDiagnosisId,
        url: null,
      };
  
      try {
        // Crear el estudio complementario en el backend
        const createdStudy = await createComplementaryStudy(newStudy);
  
        // Notificar éxito
        message.success("Estudio complementario creado exitosamente");
  
        // Enviar el registro creado al componente padre
        onAddStudy(createdStudy);
  
        // Limpiar campos y cerrar modal
        setComplementaryStudyTypeId("");
        setObservation("");
        form.resetFields();
        handleCancel();
      } catch (error) {
        console.error(error);
        message.error("Error al crear el estudio complementario");
      }
    } else {
      message.warning("Por favor seleccione un tipo de estudio");
    }
  };  

  return (
    <Modal
      title="Pedido de Estudios Complementarios"
      visible={isModalOpen}
      onOk={() => {
        form.validateFields().then(() => {
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
                showSearch
                name={"complementaryStudyTypeId"}
                className="select-before full-width"
                style={{ width: "100%" }}
                onChange={(value) => setComplementaryStudyTypeId(value)}
                options={setOptions(studies)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
                value={observation}
                placeholder="Ingrese observación..."
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
