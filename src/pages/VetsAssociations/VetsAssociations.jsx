import React from 'react';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Button, Tooltip, Typography, Divider, Card, Tag, message, Popconfirm } from 'antd';
import Icon,{SyncOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import vet from '../../assets/img/jpg/vet.jpg';

const { Title } = Typography;
export default function VetsAssociations(){
    const confirm = (e) => {
        message.success('Mascota borrada exitosamente.' );
      };

    return (
        <>   
           <Row align="middle">
            <Col span={23}>
                <Title className='appTitle'>Asociacion con Clinicas Veterinarias</Title>
            </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Clinica" placement='right'>
                        <Button type='link' className="appButton" size='large'  icon={<SyncOutlined />}/>
                    </Tooltip>
                </Col>         
        </Row>
        <Divider></Divider>
        <Row>
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={vet}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar el veterinario?"  
                                            onConfirm={confirm}
                                            okText="Si"
                                            cancelText="No"
                                            placement="top"
                                            arrowPointAtCenter 
                                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red',}} />}>
                                        <Icon><SyncDisabledOutlinedIcon key="delete" /></Icon>
                                    </Popconfirm>,
                                ]}>
                    <Meta   className=''
                            title={'Clinica Boderau'}
                            description={'Av. Boderau 1231'}/>
                    <br></br>
                    <Tag color="purple">Eugenia</Tag>
                    <Tag color="purple">Pepe</Tag>
                    <Tag color="purple">Jose</Tag>
                </Card>
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={vet}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar el veterinario?"  
                                            onConfirm={confirm}
                                            okText="Si"
                                            cancelText="No"
                                            placement="top"
                                            arrowPointAtCenter 
                                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red',}} />}>
                                        <Icon><SyncDisabledOutlinedIcon key="delete" /></Icon>
                                    </Popconfirm>,
                                ]}>
                    <Meta   className=''
                            title={'Veterinaria Recta Martinolli'}
                            description={'Recta Martinolli 4212'}/>
                    <br></br>
                    <Tag color="purple">Eugenia</Tag>
                    <Tag color="purple">Valentina</Tag>
                </Card>
            </Row>
        </>
    );
};

