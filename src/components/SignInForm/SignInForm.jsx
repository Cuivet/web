import React, {useState} from 'react';
<<<<<<< HEAD
import { Button, Form, Input, Checkbox, Typography, Space, Modal } from 'antd';
import { LockOutlined, MailOutlined} from "@ant-design/icons";
=======
import { Button, Form, Input, Checkbox, Typography, Space } from 'antd';
import { InfoOutlined, LockOutlined, MailOutlined} from "@ant-design/icons";
>>>>>>> cf82474c64365f10814019b96387d928d37fa38f
import { auth } from '../../services/auth.service';
import {emailValidation, minLengthValidation} from '../../utils/formValidation';
import { Alert } from 'antd';
import { Spin } from 'antd';
import { Navigate } from "react-router-dom";

import '../RegisterForm/RegisterForm.scss'

const {Link} = Typography;

export default function SignInForm(props){
    const [input, setInput]= useState({});
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
    });
    const [warningAlert, setWarningAlert] = useState(null);
    const [isTryingToLogin, setIsLogging] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const changeForm = e =>{
        console.log(e.target.name);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const tryToLogIn = e => {
        setIsLogging(true);
        auth(input.email,input.password)
            .then(res => {
                if(res.data.success){
                    sessionStorage.setItem('token',res.data.success);
                    sessionStorage.setItem('email',input.email);
                    props.logIn();
                }
                if(res.data.error){
                    setWarningAlert(res.data.error);
                    setInput({});
                }
                
                setIsLogging(false);
            })
            .catch(e => {
                setWarningAlert("Servidor no accesible");
                setIsLogging(false);
            });
    };

    const inputValidation = e =>{
        const {type, name}=e.target;
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
    }

    function AlertMessage() {
        return warningAlert ? <Form.Item> <Alert message={warningAlert} type="error" showIcon /> </Form.Item> : null;
    }

    function LogginMessage() {
        return isTryingToLogin ? <Spin size="middle"/> : <span>Ingresar</span>;
    }

  return (
    <Form className="register-form"  onFinish={tryToLogIn} onChange={changeForm}>

            <Form.Item>
                <Input  prefix={<MailOutlined className="site-form-item-icon" />} 
                        type="email" 
                        name="email" 
                        placeholder="Correo electrónico" 
                        className="register-form__input" 
                        onChange={inputValidation} 
                        value={input.email}/>
            </Form.Item>

            <Form.Item>
                <Input  prefix={<LockOutlined className="site-form-item-icon" />} 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        className="register-form__input" 
                        onChange={inputValidation}
                        value={input.password}/>
            </Form.Item>

            <Form.Item>
                <Checkbox name="session">
                    Mantener iniciada la sesión 
                </Checkbox>
            </Form.Item>

            <AlertMessage></AlertMessage>
            
            <Form.Item>
                <Button htmlType="submit" className="register-form__button"> 
                    <LogginMessage></LogginMessage>
                </Button>
            </Form.Item>
        
            <Form.Item>
                <Space align='center'>
                    <Link className="register-form__link" onClick={showModal}>¿Recuperar contraseña?</Link>
                    <Modal title="Recuperar Cuenta" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                    </Modal>
                </Space>
            </Form.Item>
        </Form>
  );
};