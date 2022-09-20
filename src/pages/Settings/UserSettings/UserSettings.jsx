import React, {useState} from "react";
import { Row, Col, Typography, Button, Tooltip,  Divider } from "antd";
import { DeleteOutlined, SaveOutlined, LockOutlined } from "@ant-design/icons";
import { emailValidation, minLengthValidation, numberValidation } from '../../../utils/formValidation';

import './UserSettings.scss'
import ShowUser from "../../../components/ShowUser";

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

    const [formData, setFormData] = useState({
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        dni: profile.person.dni,
        address: profile.person.address,
        email: sessionStorage.getItem('email')
    });

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
            <Row align="middle">
                <Col xs={{span: 24}}md={{span: 23}}>
                    <Title className='appTitle'>Mi Cuenta</Title>
                </Col>
                <Col xs={{span: 24}}md={{span: 1}}>
                    <Tooltip title="Eliminar mi cuenta" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<DeleteOutlined/>}/>
                    </Tooltip>
                </Col>
                <Col xs={{span: 24}}md={{span: 24}}>
                <Divider orientation="left">Información del Usuario</Divider>
                </Col>
            </Row>
            <ShowUser name={formData.name} lastName={formData.lastName}phone={formData.phone}dni={formData.dni}address={formData.address} email={formData.email}></ShowUser>
            <Row align="middle">
                <Col xs={{span: 24}}md={{span: 24}}>
                    <Button htmlType="submit" className="update-User-form__button" icon={<LockOutlined />}> Cambiar Contraseña </Button>
                    <Button htmlType="submit" className="update-User-form__button" icon={<SaveOutlined />}> Guardar </Button>
                </Col>
            </Row>
        </>
    
    )
};
