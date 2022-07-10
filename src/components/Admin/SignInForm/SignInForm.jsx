import { Button, Form, Input } from 'antd';
import React, {useState} from 'react';
import { LockOutlined, MailOutlined} from "@ant-design/icons";
import { auth } from '../../../services/auth.service';

export default function SignInForm(props){
    const [input, setInput]= useState({});

    const changeForm = e =>{
        console.log(e.target.name);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const tryToLogIn = e => {
        auth(input.email,input.password)
            .then(res => {
                sessionStorage.setItem('token',res.data.success);
                props.logIn();
            })
            .catch(e => {
                console.error(e)
            });
    };

  return (
    <Form className="register-form"  onFinish={tryToLogIn} onChange={changeForm}>            
            <Form.Item>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="email" placeholder="Correo electronico" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" placeholder="Contraseña" className="register-form__input"/>
            </Form.Item>
            
        
            <Form.Item>
                <Button htmlType="submit" className="register-form__button"> 
                    Ingresar
                </Button>
            </Form.Item>
        </Form>
  );
};