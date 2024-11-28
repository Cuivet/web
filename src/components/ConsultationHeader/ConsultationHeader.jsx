import React, { useEffect, useState } from "react";
import { Row, Typography, List, Input } from "antd";
import { FormOutlined, LinkOutlined } from "@ant-design/icons";
import { encodeId } from "../../utils/idEncoder";

const { Paragraph } = Typography;

export default function ConsultationHeader(props) {
  const { id, tutorName, reasonConsultation, cStudies } = props;
  const [studies, setStudies] = useState(false);
  const [complementaryStudies, setComplementaryStudies] = useState(
    JSON.parse(sessionStorage.getItem("complementaryStudies")) || cStudies || []
  );
  const [urls, setUrls] = useState([]);

  const updateComplementaryStudies = () => {
    const storedStudies = JSON.parse(sessionStorage.getItem("complementaryStudies"));
    setComplementaryStudies(storedStudies || []);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "complementaryStudies") {
        updateComplementaryStudies();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Check for changes in the same tab using setInterval
    const intervalId = setInterval(() => {
      updateComplementaryStudies();
    }, 1000); // Check every second

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const [flag, setFlag] = useState(
    { reasonConsultation: reasonConsultation } || ""
  );
  const [responses, setResponses] = useState(
    JSON.parse(sessionStorage.getItem("reasonConsultation")) || flag
  );

  const handleTextResponseChange = (name, value) => {
    setResponses({
      [name]: value,
    });
  };

  useEffect(() => {
    sessionStorage.setItem("reasonConsultation", JSON.stringify(responses));

    if (complementaryStudies.length > 0) {
      // Crear las URLs dinámicamente usando el id de cada estudio
      const updatedUrls = complementaryStudies.map((item) =>
        `${window.location.origin}/study/${encodeId(item.id)}`  // Asumiendo que el campo `id` existe en cada estudio
      );
      setUrls(updatedUrls);
      setStudies(true);
    } else {
      setStudies(false);
    }
  }, [responses, complementaryStudies]);

  return (
    <>
      <Row>
        <Typography.Text type="secondary">Ficha Nro: {id}</Typography.Text>
      </Row>
      <Row>
        <Typography.Text strong>Tutor: {tutorName}</Typography.Text>
      </Row>
      <Row>
        <Input
          className="motive"
          suffix={<FormOutlined />}
          size="large"
          allowClear
          style={{ width: "35%" }}
          value={responses.reasonConsultation || ""}
          placeholder={"Motivo de consulta"}
          onChange={(e) =>
            handleTextResponseChange("reasonConsultation", e.target.value)
          }
        />
      </Row>
      {studies && urls.length > 0 ? (
        <Paragraph>
          <pre>
            <List
              size="small"
              style={{ fontFamily: "Poppins, sans-serif" }}
              header={"Estudios Complementarios:"}
              grid={{ gutter: 16, column: 1 }}
              dataSource={urls}
              renderItem={(item) => (
                <List.Item>
                  {item ? (
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      <LinkOutlined />
                      {` ${item}`}
                    </a>
                  ) : (
                    <Typography.Text type="danger">No encontrado</Typography.Text>
                  )}
                </List.Item>
              )}
            />
          </pre>
        </Paragraph>
      ) : (
        <Typography.Text type="secondary">No hay estudios complementarios.</Typography.Text>
      )}
    </>
  );
}
