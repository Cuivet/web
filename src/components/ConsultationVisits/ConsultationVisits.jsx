import React, { useEffect, useState } from "react";
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
  console.log(date);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // funcion para registrar el cambio en el textarea
  const handleControlChange = (e) => {
    setControl(e.target.value);
    // console.log(control);
  };
  const [visit, setVisit] = useState(
    JSON.parse(sessionStorage.getItem("visits")) || visits
  );
  useEffect(() => {
    sessionStorage.setItem("visits", JSON.stringify(visit));
  }, [visit]);
  const handleControl = (e) => {
    //funcion para guardar el control en la visita
    // const newControl = {
    //   id: null,
    //   clinicalRecordId: visits[0].clinicalRecordId,
    //   control: control,
    //   date: currentDate.toISOString(),
    // };
    // console.log(e);
    setVisit((prevVisit) => [
      ...prevVisit,
      {
        id: null,
        clinicalRecordId: null,
        control: control,
        date: currentDate.toISOString(),
      },
    ]);
    props.sendDataControl(visit);
    // message.loading("Guardando..", 0.5, () => {
    //   sessionStorage.setItem("newVisit", JSON.stringify(newVisit));
    // });
    // message.success("Guardado con exito!");
    setIsModalOpen(false);
    setShowControl(true); //para bloquear la edicion
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
        title={`Visita N° ${visits.length}`}
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
                  <Typography.Text strong>
                    {moment(item.date).format("DD/MM/YYYY")}{" "}
                  </Typography.Text>
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
