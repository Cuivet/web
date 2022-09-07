import React, {useState} from "react";
import { Row, Col, Typography, Button, Tooltip, Form, Input, Divider } from "antd";
import { EditOutlined, UserOutlined, PhoneOutlined, SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { emailValidation, minLengthValidation, numberValidation } from '../../../utils/formValidation';

import './UserSettings.scss';

const {Title} = Typography;

export default function UserSettings(){
    const [editable, setEditable] =useState(false);
    //validaciones en el formulario
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        name: false,
        lastName: false,
        dni:false,
        phone:false,
        profile: false,
        mp: false,
        privacyPolicy:false
    });

    const profile = JSON.parse(sessionStorage.getItem('profile'));

    const formData = {
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        dni: "24356789",
        address: profile.person.address,
        email: sessionStorage.getItem('email')
    };

    const inputValidation = e =>{
        
        const {type, name} = e.target;

        if(type === "email"){
            setFormValid({
                ...formValid,
                [name]:emailValidation(e.target)
            });
        };
        if(type ==="password"){
            setFormValid({
                ...formValid,
                [name]:minLengthValidation(e.target, 8)
            });
        };
        if(type === "text"){
            setFormValid({ ...formValid, [name]:minLengthValidation(e.target, 2)});
        };
        if(type ==="checkbox"){
            setFormValid({
                ...formValid,
                [name]:e.target.checked
            });
        };
        if (type === "number"){
            setFormValid({
                ...formValid,
                [name]:numberValidation(e.target)
            });
        }
        
    }

    function Edit(){
        setEditable(true);
    }

    function Save(){
        setEditable(false);
    }

    function closeEditable(){
        setEditable(false);
    }

    return (
        <>
            {formData ? 
                <>
                    <Row align="middle">
                        <Col span={23}>
                            <Title className="appTitle">Información del Usuario</Title>
                        </Col>
                        <Col span={1}>
                            {!editable ?
                                <>
                                    <Tooltip title="Editar usuario" placement='right'>
                                        <Button type='link' className="appButton" size='large' icon={<EditOutlined/>} onClick={Edit}/>
                                    </Tooltip>
                                </>
                                : 
                                <>
                                    <Tooltip title="Cancelar" placement='right'>
                                        <Button type='link' className="appButton" size='large' icon={<CloseCircleOutlined/>} onClick={closeEditable}/>
                                    </Tooltip>
                                </>   
                            }
                        </Col>
                    </Row>

                    <Divider></Divider>
                    
                    <Row>
                        <Col xs={{ span: 24}} lg={{ span:12 }}>
                            <Form className="register-form" layout="vertical"  onFinish={""} onChange={""}> 
                                <Divider orientation="left">Datos Personales</Divider>
                                
                                <Form.Item label="Nombre">
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled={!editable} type="text" name="name" onChange={inputValidation} defaultValue={formData.name} className="register-form__input" onSelect={inputValidation}/>
                                </Form.Item>

                                <Form.Item label="Apellido">
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled={!editable} type="text" name="lastName" onChange={inputValidation} defaultValue={formData.lastName} className="register-form__input" onSelect={inputValidation}/>
                                </Form.Item>
                            
                                <Form.Item label="DNI">
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled={!editable} type="number" name="dni" defaultValue={formData.dni} className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
                                </Form.Item>
                            
                                <Form.Item label="Telefono">
                                    <Input prefix={<PhoneOutlined className="site-form-item-icon" />} disabled={!editable} type="number" name="phone" vadefaultValuelue={formData.phone} className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
                                </Form.Item>
                            
                                <Form.Item label="Dirección">
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled={!editable} type="text" name="address" onChange={inputValidation} defaultValue={formData.address} className="register-form__input" onSelect={inputValidation}/>
                                </Form.Item>

                                <Divider orientation="left">Configuración de Cuenta</Divider>

                                <Form.Item rules={[{required: true, message: 'Ingrese su email'}]} label="Email">
                                    <Input type="email" name="email" onChange={"inputValidation"} value={formData.email} disabled className="register-form__input" onSelect={"inputValidation"}/>
                                </Form.Item>
                                    
                                {editable ? 
                                <Form.Item>
                                    <Button htmlType="submit" className="register-form__button" icon={<SaveOutlined />} onClick={Save}> 
                                        Guardar
                                    </Button>
                                </Form.Item> :
                                null
                                }
                            </Form>
                        </Col>
                    </Row>
                </>
            : null}
        </>
    )
};
