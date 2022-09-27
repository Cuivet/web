import { UserOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Typography, message, Tag, Steps, Divider } from "antd";
import React, {useState} from "react";
import User from '../../assets/img/png/tutorUsuario.png';

import './Consultation.scss'

const {Title, Paragraph} = Typography;

export default function Consultation(){
    const [editableStr, setEditableStr] = useState('Motivo de consulta...');
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };

    const { Step } = Steps;
    const steps = [
    {
        title: 'Resenia',
        content: 'First-content',
    },
    {
        title: 'Anamnesis',
        content: 'Second-content',
    },
    {
        title: 'Examen Fisico',
        content: 'Last-content',
    },
    {
        title: 'Diagnostico Presuntivo',
        content: 'Last-content',
    },
    {
        title: 'Diagnostico',
        content: 'Last-content',
    },
    {
        title: 'Tratamiento',
        content: 'Last-content',
    },{
        title: 'Pronostico',
        content: 'Last-content',
    },
    ];
    const IconLink = ({ src, text }) => (
        <a className="example-link">
          <img className="example-link-icon" src={src} alt={text} />
          {text}
        </a>
      );
    const content = (<>
        <Row>
            <Typography.Text type="secondary">Ficha Nro: 76531732</Typography.Text>
        </Row>        
        <Row>
            <Typography.Text strong>Tutor: Tomas Bardin</Typography.Text>
        </Row>
        <Row>
            <Title level={5} className='motive' editable={{tooltip: 'click to edit text',onChange: setEditableStr,triggerType: 'text',}}>
           {editableStr}</Title>
        </Row>
        
        
        <div>
        <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            text=" Estudio complementario"
        />
        </div>
    </>)
    return(<>
    <Row>
        <Col span={24}>
            <Title className='appTitle'>Consulta Medica</Title>
        </Col>
    </Row>
    <Divider></Divider>
    <Row>
        <Col span={24}>
            <PageHeader title='Eugenia Frattin' subTitle='Visita Nro: 1' 
            ghost={false}
            className="site-page-header"
            tags={<Tag color="purple">Malu</Tag>}
            extra={[<Button key={1} type='default'>Control</Button>,<Button key={2} type='primary'>Cerrar</Button>]}
            avatar={{icon:'EF', }} >
                <Row>
                    <Col span={24}>
                        {content}
                    </Col>
                </Row>
            </PageHeader>
        </Col>
    </Row>
    <Divider></Divider>
    <Row>
        <Col span={24}>
        <Steps current={current}>
            {steps.map((item) => (
            <Step key={item.title} title={item.title} />
            ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
            {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
                Next
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
            </Button>
            )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
         
          
        )}
        </div>
        </Col>
    </Row>
    {/* <Divider></Divider> */}

    </>)
}