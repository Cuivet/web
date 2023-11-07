import React, {useState} from "react";
import { Row, Typography } from "antd";

const { Title } = Typography;

export default function ConsultationHeader(props) {
  const { id, tutorName, studies} = props;
  const [reasonConsultation, setReasonConsultation] = useState(
    "Motivo de consulta.."
  );
  const IconLink = ({ src, text }) => (
    <a href="www.estudio.com" className="example-link">
      <img className="example-link-icon" src={src} alt={text} />
      {text}
    </a>
  );

  return (
    <>
      <Row>
        <Typography.Text type="secondary">
          Ficha Nro: {id}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text strong>
          Tutor:{" "}
          {tutorName}
        </Typography.Text>
      </Row>
      <Row>
        <Title
          level={5}
          className="motive"
          editable={{
            tooltip: "click to edit text",
            onChange: setReasonConsultation,
            triggerType: "text",
          }}
        >
          {reasonConsultation}
        </Title>
      </Row>
      {studies ? (
        <div>
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            text="Estudio complementario"
          />
        </div>
      ) : null}
    </>
  );
}
