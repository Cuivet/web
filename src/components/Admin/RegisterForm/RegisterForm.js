import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Select, notification} from 'antd'

import './RegisterForm.scss'
import { LoadingOutlined, LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined} from "@ant-design/icons";



//componente formulario del LogIn para nuevos usuarios
export default function RegisterForm(){
    const [input, setInput]= useState({
        email:"",
        password:"",
        repeatPassword:"",
        name:"",
        lastName:"",
        dni:null,
        phone:null,
        profile: 'Seleccione',
        mp: null,
        privacyPolicy:false

    });

    const changeForm = e =>{
        console.log(e.target.name);
        if(e.target.name === "privacyPolicy"){
            setInput({
                ...input,
                [e.target.name]: e.target.checked
            });
        }
        else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    };

    const register = e => {
        console.log(input)
    };

    //para mostrar/ocultar campo de matricula segun perfil 
    //setea el valor de profile en input
    const [vet, setVet] =  useState(false);
    
    const onProfileChange = (val) => {
        console.log(vet);
        if (val === '2'){
            setVet(true);
            setInput({profile: "2"});
        }
        else{
            setVet(false);
            setInput({profile:"1"});
        }
 
    }


    return (        
        <Form className="register-form"  onFinish={register} onChange={changeForm}>            
            <Form.Item>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="email" value={input.email} placeholder="Correo electronico" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" value={input.password} placeholder="Contrasenia" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="repeatPassword" value={input.repeatPassword} placeholder="Repetir Contrasenia" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="name" value={input.name} placeholder="Nombre" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="lastName" value={input.lastName} placeholder="Apellido" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" name="dni" value={input.dni} placeholder="D.N.I." className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="number" name="phone" value={input.phone} placeholder="Telefono" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Select name="profile" placeholder="Seleccione su perfil" className="register-form__select" value={input.profile} onChange={onProfileChange} allowClear > 
                    <Select.Option value="1" >Tutor</Select.Option>
                    <Select.Option value="2">Veterinario</Select.Option>
                </Select>
            </Form.Item>  
            {vet ? <div> <Form.Item id="matricula">
                <Input prefix={<IdcardOutlined  className="site-form-item-icon" />} type="number" name="mp" value={input.mp} placeholder="Numero de Matricula" className="register-form__input"/>
            </Form.Item></div>
            : null}
            
            
            <Form.Item>
                <Checkbox name="privacyPolicy" checked={input.privacyPolicy}>
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button"> 
                    Registrarme
                </Button>
            </Form.Item>
        </Form>
    );
   
    
        
};
