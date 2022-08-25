import React, {useState} from 'react';
import { Button, Form, Input, Checkbox, Typography, Space } from 'antd';
import { LockOutlined, MailOutlined} from "@ant-design/icons";
import { auth } from '../../services/auth.service';
import {emailValidation, minLengthValidation} from '../../utils/formValidation';
import { Alert } from 'antd';
import { Spin } from 'antd';

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
                <Link to={'/menu'}>
                    <Button htmlType="submit" className="register-form__button"> 
                        <LogginMessage></LogginMessage>
                    </Button>
                </Link>
            </Form.Item>
        
            <Form.Item>
                <Space align='center'>
                    <Link className="register-form__link">¿Recuperar contraseña?</Link>
                </Space>
            </Form.Item>

        </Form>
  );
};