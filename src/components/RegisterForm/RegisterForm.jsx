import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Select, notification, Typography, Modal} from 'antd';
import {emailValidation, minLengthValidation,numberValidation} from '../../utils/formValidation';
import { signUpApi } from "../../services/user.service";

import './RegisterForm.scss';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined} from "@ant-design/icons";
import Terms from "../Terms/Terms";


const {Link} = Typography;
//componente formulario del LogIn para nuevos usuarios
export default function RegisterForm(props){ 
    //donde almacena los datos del formulario
    const [input, setInput]= useState({
        email:"",
        password:"",
        repeatPassword:"",
        name:"",
        lastName:"",
        dni:null,
        phone:null,
        profile: 'Seleccione su Perfil',
        mp: null,
        privacyPolicy:false
    });

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

    //setea los valores del form a la variable input
    const changeForm = e =>{
        // console.log(e.target.name);
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

    //validacion de datos en el formulario
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

    const register = e => {
        const person = {
            name: input.name,
            lastName: input.lastName,
            dni: input.dni,
            phone: input.phone
        };
        const user = {
            email: input.email,
            password: input.password
        }
        let completeProfile;
        switch (input.profile) {
            case 'tutor':
                completeProfile = {person, user, tutor: {}}
                break;
            case 'veterinary':
                completeProfile = {person, user, veterinary: {}}
                break;
            case 'vetOwner':
                completeProfile = {person, user, vetOwner: {}}
                break;
            default:
              break;
          }
        const emailVal = input.email;
        const passwordVal = input.password;
        const repeatPasswordVal = input.repeatPassword;
        const nameVal = input.name;
        const lastNameVal = input.lastName;
        const dniVal = input.dni;
        const phoneVal = input.phone;
        const profileVal = input.profile;
        // const privacyPolicyVal = input.privacyPolicy;

        if(!emailVal || !passwordVal ||!repeatPasswordVal|| !nameVal|| !lastNameVal|| !phoneVal|| !dniVal|| !profileVal){
            notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrarse",
                placement: "top"
            })
        } else{
            if(passwordVal !== repeatPasswordVal){
                notification['error']({
                    message: "Las constraseñas deben ser iguales",
                    description: "Compruebe que las contraseñas ingresadas coincidan",
                    placement: "top"
                })
            } else{
                signUpApi(completeProfile)
                    .then(res => {
                        notification['success']({
                            message: "Usuario creado correctamente",
                            placement: "top"
                        });
                        props.successRegister();
                    })
                    .catch(e => {
                        console.error(e)
                    });
                
                resetForm();
            }
            
        }
        setIsModalVisible(false);
    };

    const resetForm = () =>{
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i< inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");

            setInput({
                email:"",
                password:"",
                repeatPassword:"",
                name:"",
                lastName:"",
                dni:null,
                phone:null,
                profile: 'Seleccione su Perfil',
                mp: null,
                privacyPolicy:false
            });
            setFormValid({
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
            })
        }
    }

    //para mostrar/ocultar campo de matricula segun perfil 
    //setea el valor de profile en input
    const [vet, setVet] =  useState(false);
    
    const onProfileChange = (val) => {
        switch(val){
            case 'tutor':
                setVet(false);
                setInput({...input, profile:"tutor"});
                setFormValid({...formValid, profile: true});
                break;
            case 'veterinary':
                setVet(true);
                setInput({...input, profile: "veterinary"});
                setFormValid({...formValid, profile: true});
                break;
            case 'vetOwner':
                setVet(false);
                setInput({...input, profile: "vetOwner"});
                setFormValid({...formValid, profile: true});
                break;
            default:
                break;
        }
        
       
    }
    const [ isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const hideModal = () =>{
        setIsModalVisible(false);
    }
    
    return (        
        <Form className="register-form"  onChange={changeForm}>            
            <Form.Item rules={[{required: true, message: 'Ingrese su email'}]}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="email" onChange={inputValidation} value={input.email} placeholder="Correo electrónico" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" onChange={inputValidation} value={input.password} placeholder="Contraseña" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="repeatPassword" onChange={inputValidation} value={input.repeatPassword} placeholder="Repetir Contraseña" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="lastName" onChange={inputValidation} value={input.lastName} placeholder="Apellido" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" name="dni" value={input.dni} placeholder="D.N.I." className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item>
            <Form.Item>
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="number" name="phone" value={input.phone} placeholder="Teléfono" className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item>
            <Form.Item>
                <Select name="profile" placeholder="Seleccione su perfil" className="register-form__select" value={input.profile} onChange={onProfileChange} allowClear > 
                    <Select.Option value="tutor" >Tutor</Select.Option>
                    <Select.Option value="veterinary">Veterinario</Select.Option>
                    <Select.Option value="vetOwner">Propietario de Veterinaria</Select.Option>
                </Select>
            </Form.Item>  
            {vet ? <div> <Form.Item id="matricula">
                <Input prefix={<IdcardOutlined  className="site-form-item-icon" />} type="number" name="mp" onChange={inputValidation} value={input.mp} placeholder="Numero de Matricula" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item></div>
            : null}          
            
            {/* <Form.Item>
                <Checkbox name="privacyPolicy" onChange={inputValidation} checked={input.privacyPolicy}>
                    He leído y acepto los <Link >terminos y condiciones</Link>
                </Checkbox>
            </Form.Item> */}
            <Form.Item>
                <Button type="submit" htmlType="submit" className="register-form__button" onClick={showModal} > 
                  Registrarme
                </Button>
                {/* hacerlo de un tamanio fijo pero scrolleable */}
                <Modal title="Terminos y Condiciones"
                    visible={isModalVisible}
                    onCancel={hideModal}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <Button htmlType="submit" type="primary" onClick={register} className="register-form_button-ok-modal" > 
                            Aceptar
                        </Button>
                    ]}><Terms></Terms></Modal>
            </Form.Item>
        </Form>
    );  
    
        
};
