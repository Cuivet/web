import React, { useState } from "react";
import {
  PageHeader,
  Form,
  Input,
  Modal,
  Tag,
  Tooltip,
  Button,
  Row,
  Col,
} from "antd";
import {
  SaveOutlined,
  ContainerOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export default function ConsultationVisits(props) {
  const { id, date, steps } = props;
  const [showControl, setShowControl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleControl = () => {
    //funcion para guardar el control en la visita
    setIsModalOpen(false);
    setShowControl(true);
  };

  const renderSteps= () =>{
    let render = [];
    steps.forEach(i => {
        render.push(<Tag color="geekblue">{i}</Tag>);
    });
    return render;
  }

  return (
    <>
      <PageHeader
        title={`Visita N° ${id}`}
        subTitle={date}
        style={{ marginTop: "2%" }}
        ghost={false}
        tags={
            renderSteps()
        //     [
        //   <Tag color="geekblue">RESEÑA</Tag>,
        //   <Tag color="geekblue">ANAMNESIS</Tag>,
        // ]
    }
        extra={[
          <Tooltip title={showControl ? "Ver control" : "Ingresar control"}>
            <Button shape="round" type="default" onClick={showModal}>
              {showControl ? <EyeOutlined /> : <ContainerOutlined />}
            </Button>
          </Tooltip>,
          <Tooltip title={"Guardar visita"}>
            <Button
              type="dashed"
              style={{ borderColor: "#57266a" }}
              shape="round"
            >
              <SaveOutlined />
            </Button>
          </Tooltip>,
        ]}
      >
        <Row>
          <Col span={24}>
            {showControl ? (
              <Tag color="green">Control</Tag>
            ) : (
              <Tag color="red">Sin Control</Tag>
            )}
          </Col>
        </Row>
      </PageHeader>
      <Modal
        title="Control"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button type="default" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            type="primary"
            className="primaryDisabled"
            disabled={showControl}
            onClick={handleControl}
          >
            Guardar
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <Form>
              <Form.Item>
                <Input.TextArea
                  disabled={showControl}
                  name="control"
                  rows={4}
                  allowClear
                  placeholder="Ingrese el control..."
                  maxLength={500}
                  showCount
                  autoSize={{ minRows: 4, maxRows: 5 }}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
