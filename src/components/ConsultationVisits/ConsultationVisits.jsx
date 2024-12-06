import React, { useRef, useState } from "react";
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
  List,
  Typography,
} from "antd";
import {
  ContainerOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./ConsultationVisits.scss";

export default function ConsultationVisits(props) {
  const { date, steps, visits } = props;
  const [showControl, setShowControl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [control, setControl] = useState("");
  const moment = require("moment");
  const nroVisits = useRef(visits.length + 1);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleControl = () => {
    props.sendDataControl(control.currentTarget.value);
    setIsModalOpen(false);
    setShowControl(true); //para bloquear la edicion
  };

  const renderSteps = () => {
    // cambiar los nombres para que esten en espaniol
    let render = [];
    console.log(steps);
    steps.forEach((i) => {
      render.push(<Tag color="geekblue">{i}</Tag>);
    });
    render.shift();
    return render;
  };

  return (
    <>
      <PageHeader
        title={`Visita N° ${nroVisits.current}`}
        subTitle={
          date === "Sin visitas previas"
            ? "Sin visitas previas"
            : moment(date).format("DD/MM/YYYY")
        }
        style={{ marginTop: "2%" }}
        ghost={false}
        tags={renderSteps()}
        extra={[
          <Tooltip title={showControl ? "Ver control" : "Ingresar control"}>
            <Button shape="round" type="default" onClick={showModal}>
              {showControl ? <EyeOutlined /> : <ContainerOutlined />}
            </Button>
          </Tooltip>          
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
            htmlType="submit"
            onClick={handleControl}
          >
            Guardar
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <List
              size="small"
              dataSource={visits}
              // loading={showControl}
              className="visits-list"
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text strong>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                    {" -> "}
                  </Typography.Text>
                  {item.control}
                </List.Item>
              )}
              // footer={

              // }
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form onFinish={handleControl}>
              <Form.Item>
                <Input.TextArea
                  disabled={showControl}
                  name="control"
                  rows={4}
                  allowClear
                  placeholder="Ingrese nuevo control..."
                  maxLength={500}
                  showCount
                  onChange={(value) => setControl(value)}
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
