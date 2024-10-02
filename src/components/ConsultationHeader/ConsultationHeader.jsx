import React, { useEffect, useState } from "react";
import { Row,  Typography, List, Input } from "antd";
import { FormOutlined, LinkOutlined } from "@ant-design/icons";

const {  Paragraph } = Typography;

export default function ConsultationHeader(props) {
  const { id, tutorName, reasonConsultation, cStudies } = props;
  const [studies, setStudies] = useState(false);

  const study = cStudies || "";
  const [complementaryStudies, setComplementaryStudies] = useState(
    JSON.parse(sessionStorage.getItem("complementaryStudies")) || study
  );
  const [urls, setUrls] = useState([]);

  const updateComplementaryStudies = () => {
    setComplementaryStudies(
      JSON.parse(sessionStorage.getItem("complementaryStudies")) || null
    );
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
    if (complementaryStudies !== null) {
      if (complementaryStudies.length > 0) {
        const updatedUrls = complementaryStudies.map((item) =>
          item.url ? item.url : "404: not-found"
        );
        console.log(updatedUrls);
        setUrls(updatedUrls);
        setStudies(true);
      }
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
      {studies ? (
        <Paragraph>
          <pre>
        <List
          size="small"
          style={{fontFamily: "Poppins, sans-serif"}}
          header={"Estudios Complementarios:"}
          grid={{ gutter: 16, column: 1 }}
          dataSource={urls}
          renderItem={(item) => (
            <List.Item>
              {item ? (
                <a href={item}>
                  <LinkOutlined />
                  {` ${item}`}
                </a>
              ) : null}
            </List.Item>
          )}
        />
        </pre>
        </Paragraph>
      ) : null}
    </>
  );
}
