import React, { useState } from 'react';
import DefaultAvatar from '../../assets/img/jpg/veterinaryAvatar.jpg';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tag, Tooltip, Modal, Input } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined, NodeIndexOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function VeterinariesAssociations(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setTryToAsociateWithCode] = useState(false);

    const confirm = (e) => {
        message.success('Mascota borrada exitosamente.' );
      };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const tryToAsociate = () => {
        setTryToAsociateWithCode(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setTryToAsociateWithCode(false);
    };

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Profesionales asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModal}/>
                    </Tooltip>
                </Col>
            </Row>

            <Divider></Divider>

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

            <Modal  title="Asociarse con un profesional"
                    visible={isModalOpen}
                    onCancel={hideModal}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <>
                            {
                            generatedCode ? 
                            <Button htmlType="submit" type="primary" onClick={hideModal} className="register-form_button-ok-modal" > 
                                Aceptar
                            </Button>
                            :
                            <Button htmlType="submit" type="primary" onClick={tryToAsociate} className="register-form_button-ok-modal" > 
                                Asociar
                            </Button>
                            }
                        </>
                    ]}>
                {
                generatedCode ?
                <>
                    <div>¿Quiere generar esta asociacion?</div>
                    <div>Profesional: Marcos Rivero</div>
                    <div>Mascota: Lima (ID:2)</div>
                    <div>Clínica: Veterinaria la Recta</div>
                </>
                :
                <>
                    <div>Ingrese código de asociacion brindado por el veterinario</div>
                    <Input type="number" name="phone" placeholder="Código de asociacion"/>
                </>
                }
            </Modal>
            
        </>
    );
};

