import React, {useState} from "react";
import { Row, Col, Typography, Button, Tooltip,  Divider, message } from "antd";
import { DeleteOutlined, SaveOutlined, LockOutlined } from "@ant-design/icons";
import { emailValidation, minLengthValidation, numberValidation } from '../../../utils/formValidation';
import { personService } from "../../../services/person.service";
import './UserSettings.scss'
import ShowUser from "../../../components/ShowUser";
 
const {Title} = Typography;
 
export default function UserSettings(){
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
 
    var veterinary = false;

    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if(profile.veterinary != null){
        veterinary = true;
    };
 
    const [formData, setFormData] = useState({
        id: profile.person.id,
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        dni: profile.person.dni,
        address: profile.person.address,
        email: sessionStorage.getItem('email'),
        mp: veterinary ? profile.veterinary.mp : null,
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
 
    const changeForm = fd => {
        setFormData({
            ...formData,
            [fd.target.name]: fd.target.value
        });
    };
 
    function updatePerson(){
        personService.update(formData)
            .then(res => {
                let updatedProfile = JSON.parse(sessionStorage.getItem('profile'));
                updatedProfile.person = res;
                sessionStorage.setItem('profile',JSON.stringify(updatedProfile));
                message.success(`El cambio se ha realizado con éxito.`);
            });
    }
 
    return (
        <>
            <Row align="middle">
                <Col span={22}>
                    <Title className='appTitle'>Mi Cuenta</Title>
                </Col>
                <Col span={2}>
                    <Tooltip title="Eliminar mi cuenta" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<DeleteOutlined/>}/>
                    </Tooltip>
                </Col>
                <Col xs={{span: 24}}md={{span: 24}}>
                <Divider orientation="left">Información del Usuario</Divider>
                </Col>
            </Row>
            <ShowUser formData={formData} refreshUser={changeForm}></ShowUser>
            <Row align="middle">
                <Col xs={{span: 24}}md={{span: 24}}>
                    <Button shape="round" htmlType="submit" className="update-User-form__button" icon={<LockOutlined />}> Cambiar Contraseña </Button>
                    <Button shape="round" htmlType="submit" className="update-User-form__button" icon={<SaveOutlined />} onClick={updatePerson}> Guardar </Button>
                </Col>
            </Row>
        </>
   
    )
};
 
