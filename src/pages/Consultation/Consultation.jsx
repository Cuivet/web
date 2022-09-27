import { LeftCircleOutlined,RightCircleOutlined,CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Typography, message, Tag, Steps, Divider, Tooltip } from "antd";
import React, {useState} from "react";
// import User from '../../assets/img/png/tutorUsuario.png';

import './Consultation.scss'

const {Title} = Typography;

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
        title: 'Reseña',
        content: 'Componente Reseña',
    },
    {
        title: 'Anamnesis',
        content: 'Componente Anamnesis',
    },
    {
        title: 'Examen Fisico',
        content: 'Componente Examen Fisico',
    },
    {
        title: 'Diagnostico Presuntivo',
        content: 'Componente Diagnostico Presuntivo',
    },
    {
        title: 'Diagnostico',
        content: 'Componente Diagnostico',
    },
    {
        title: 'Tratamiento',
        content: 'Componente Tratamiento',
    },{
        title: 'Pronostico',
        content: 'Componente Pronostico',
    },
    ];
    const IconLink = ({ src, text }) => (
        <a href="www.estudio.com" className="example-link">
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
            avatar={{icon:'EF',style:{backgroundColor:'#f56a00'}}} >
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
        <Steps current={current} labelPlacement='vertical' percent={(current+1)*14.4}>
            {steps.map((item) => (
            <Step key={item.title} title={item.title} status={item.status} />
            ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
            {current > 0 && (
                <Tooltip title='Atras' placement="top">
                    <Button
                        style={{
                        margin: '0 8px',
                        }}
                        className="steps-action-back"
                        onClick={() => prev()}
                    >
                        <LeftCircleOutlined />
                    </Button>
                </Tooltip>          
            
            
            )}
            {current < steps.length - 1 && (
            <Tooltip title='Siguiente' >
                <Button type="primary" className="steps-action-next" onClick={() => next()}>
                    <RightCircleOutlined />
                </Button>
            </Tooltip>
            )}
            {current === steps.length - 1 && (
            <Tooltip title='Finalizar'>
                <Button type="primary" className="steps-action-finish" onClick={() => message.success('Consulta Finalizada!')}>
                    <CheckCircleOutlined />
                </Button>
            </Tooltip>
            )}
        
        </div>
        </Col>
    </Row>
    {/* <Divider></Divider> */}

    </>)
}