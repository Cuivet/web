import React,{useState} from 'react';
import DefaultAvatar from '../../assets/img/jpg/veterinaryAvatar.jpg';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card,Input, Popconfirm,Modal, message, Tag, Tooltip, Select } from 'antd';
import Icon,{ EyeOutlined, ExclamationCircleOutlined, NodeIndexOutlined } from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
const { Title } = Typography;

export default function VeterinariesAssociations(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirm = (e) => {
        message.success('Mascota borrada exitosamente.' );
      };

      const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Profesionales asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>}  onClick={showModal}/>
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
                                        <Icon><SyncDisabledOutlinedIcon key="delete" /></Icon>
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
                                        <Icon><SyncDisabledOutlinedIcon key="delete" /></Icon>
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
            <Modal  title="Ingresar código de asociacion con Veterinario"
                    visible={isModalOpen}
                    onCancel={hideModal}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,                        
                        <Button htmlType="submit" type="primary" onClick={hideModal} className="register-form_button-ok-modal" > 
                            Asociar
                        </Button>
                    ]}>               
                
                <>  
                    <Row>
                        <Typography.Title level={5}>Ingrese codigo del Veterinario a asociar:</Typography.Title>
                    </Row>
                    <Row>
                        <Input type="number" name="mp" placeholder="Codigo de asociacion"/>
                    </Row>
                    <Row>
                        <Typography.Title level={5}>Mascota a asociar:</Typography.Title>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Select placeholder='Mascotas' mode='multiple' showSearch allowClear style={{width:'100%',}}>
                                <Select.Option key={1} value='0'>Lima</Select.Option>
                                <Select.Option key={2} value='1'>Wendy</Select.Option>
                                <Select.Option key={3} value='2'>Paton</Select.Option>
                                <Select.Option key={4} value='3'>Roco</Select.Option>
                            </Select>
                        </Col>
                        
                    </Row>
                    
                </>
                
            </Modal>
            
        </>
    );
};

