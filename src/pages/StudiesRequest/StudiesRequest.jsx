import { Result, List, Divider, Row, Typography, Upload, message, Col } from "antd";
import React from "react";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import Icon, { InboxOutlined, LineOutlined } from "@ant-design/icons";

export default function StudiesRequest(props) {
  const { id, observation, url } = props;
  const data = ['Radiografia de Torax', 'Analisis de sangre completo', 'Ecografia de pecho']
  const test = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <Row align="center">
        <Col span={24}>
          <Result
            status={"success"}
            icon={
              <Icon style={{ fontSize: "141px", color: "#523c89" }}>
                <BiotechOutlinedIcon />
              </Icon>
            }
            title={"Pedido de Estudios Complementarios"}
            subTitle={`Nro de Estudio: 12123 `}
            extra={[
              <Col span={10} offset={7}><List
              size=""
              header={<Divider>Estudios</Divider>}
              grid={{gutter:10, column:1}}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Title style={{textAlign:'left'}} level={5}><LineOutlined /> {item}</Typography.Title>
                </List.Item>
              )}
            /></Col>,
              <Col span={10} offset={7}>
                <Upload.Dragger {...test}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click o arrastra un archivo desde aqui
                  </p>
                  <p className="ant-upload-hint">
                    Soporta la carga de multiples archivos de forma simultanea.
                  </p>
                </Upload.Dragger>
              </Col>,
            ]}
          />
        </Col>
      </Row>
    </>
  );
}
