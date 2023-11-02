import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Input, Select, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

export default function ComplementaryStudiesModal(prop) {
  const { isModalOpen, handleCancel } = prop;
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
  const [flag, setFlag] = useState('');
  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("complementaryStudies")) || flag
  );
  useEffect(() => {
    // Store responses in sessionStorage whenever they change
    sessionStorage.setItem("complementaryStudies", JSON.stringify(responses));
  }, [responses]);
// definir funcionamiento despues de hablar con el negro 
  const handleSelectResponseChange = (value) =>{
    console.log(value);
    setResponses({
      ...responses,
      [value.key]: {
        ...responses[value.key],
        complementaryStudyTypeId: value.value
      },
    });
  }

  return (
    <Modal
      title="Pedido de Estudios Complementarios"
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="back" style={{ marginRight: 8 }} onClick={handleCancel}>
          Cancelar
        </Button>,
        <Link to={"/studies-request"}>
          <Button key="submit" type="primary">
            Generar
          </Button>
        </Link>,
      ]}
    >
      <Row>
        <Title level={5}>Tipo de Estudio Complementario:</Title>
      </Row>
      <Row>
        <Col span={24}>
          <Select
            placeholder="Estudios"
            allowClear
            mode="multiple"
            labelInValue
            showSearch
            name={"complementaryStudyTypeId"}
            className="select-before full-width"
            style={{ width: "100%" }}
            onChange={(value) =>
                handleSelectResponseChange(value)
              }
            options={setOptions(studies)}
            maxTagCount={'responsive'}
            optionFilterProp="children"
            
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              
          >
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
            placeholder="Ingrese observacion..."
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
}
