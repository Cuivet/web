import React from "react";
import {Form, Input, Button, Checkbox, notification} from 'antd'

import './RegisterForm.scss'
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

export default function RegisterForm(){
    return (
        <Form className="register-form">
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" name="email" placeholder="Correo electronico" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" placeholder="Contrasenia" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="repeatPassword" placeholder="Repetir Contrasenia" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy">
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form_button"> 
                    Registrarme
                </Button>
            </Form.Item>
        </Form>
    )
        
}