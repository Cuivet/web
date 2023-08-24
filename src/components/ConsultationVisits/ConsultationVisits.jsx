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
  message,
  List,
  Typography,
} from "antd";
import {
  SaveOutlined,
  ContainerOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export default function ConsultationVisits(props) {
  const { id, date, steps, visits } = props;
  const [showControl, setShowControl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [control, setControl] = useState("");
  const moment = require("moment");
  const currentDate = moment();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleControlChange = (e) => {
    setControl(e.target.value);
    // console.log(control);
  };
  const handleControl = (e) => {
    //funcion para guardar el control en la visita
    const newControl = {
      id: id,
      clinicalRecordId: 1,
      control: control,
      date: currentDate.format("DD/MM/YYYY"),
    };
    console.log(newControl);
    props.sendDataControl(newControl);
    // message.loading("Guardando..", 0.5, () => {
    //   sessionStorage.setItem("newVisit", JSON.stringify(newVisit));
    // });
    // message.success("Guardado con exito!");
    setIsModalOpen(false);
    setShowControl(true);
  };

  const renderSteps = () => {
    let render = [];
    steps.forEach((i) => {
      render.push(<Tag color="geekblue">{i}</Tag>);
    });
    render.shift();
    return render;
  };

  return (
    <>
      <PageHeader
        title={`Visita N° ${id}`}
        subTitle={date}
        style={{ marginTop: "2%" }}
        ghost={false}
        tags={renderSteps()}
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
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text strong>{item.date} </Typography.Text>
                  {item.control}
                </List.Item>
              )}
              footer={
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
                      onChange={handleControlChange}
                      autoSize={{ minRows: 4, maxRows: 5 }}
                    />
                  </Form.Item>
                </Form>
              }
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
