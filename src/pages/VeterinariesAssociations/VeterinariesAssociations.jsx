import React from 'react';
import DefaultAvatar from '../../assets/img/jpg/veterinaryAvatar.jpg';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tag, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined, NodeIndexOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function VeterinariesAssociations(){

    const confirm = (e) => {
        message.success('Mascota borrada exitosamente.' );
      };

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Profesionales asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>

            <Row>
                <Divider></Divider>
            </Row>

            <Row>
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={DefaultAvatar}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar el veterinario?"  
                                            onConfirm={confirm}
                                            okText="Si"
                                            cancelText="No"
                                            placement="top"
                                            arrowPointAtCenter 
                                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red',}} />}>
                                        <DeleteOutlined key="delete" />
                                    </Popconfirm>,
                                ]}>
                    <Meta   className=''
                            title={'Dr. García Nicolás'}
                            description={'Veterinaria Patitas del Cielo'}/>
                    <br></br>
                    <Tag color="purple">Lima</Tag>
                    <Tag color="purple">Wendy</Tag>
                    <Tag color="purple">Roco</Tag>
                </Card>
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={DefaultAvatar}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar el veterinario?"  
                                            onConfirm={confirm}
                                            okText="Si"
                                            cancelText="No"
                                            placement="top"
                                            arrowPointAtCenter 
                                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red',}} />}>
                                        <DeleteOutlined key="delete" />
                                    </Popconfirm>,
                                ]}>
                    <Meta   className=''
                            title={'Dr. Argento Pepe'}
                            description={'Veterinaria Recta Martinolli'}/>
                    <br></br>
                    <Tag color="purple">Patón</Tag>
                    <Tag color="purple">Roco</Tag>
                </Card>
            </Row>
            
        </>
    );
};

