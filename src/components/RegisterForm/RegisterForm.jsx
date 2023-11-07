import React, {useState} from "react";
import { Form, Input, Button, Select, notification, Spin, Modal, Upload, Col } from 'antd';
import { emailValidation, minLengthValidation,numberValidation } from '../../utils/formValidation';
import { signUpApi, confirmSignUp } from "../../services/user.service";
import './RegisterForm.scss';
import ImgCrop from 'antd-img-crop';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined } from "@ant-design/icons";
import Terms from "../Terms/Terms";

export default function RegisterForm(props){
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
        privacyPolicy:false,
        address: "",
    });
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
        privacyPolicy:false,
        address: false
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [registeredUser, setRegisteredUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState(null);
    const [catchReason, setCatchReason] = useState(null);
    const [vet, setVet] =  useState(false);
    const [fileList, setFileList] = useState([]);

    const changeForm = e =>{
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

    const goToLogin = () => {
        resetForm();
        props.successRegister();
    }

    const checkFields = () => {
        const person = {
            name: input.name,
            lastName: input.lastName,
            dni: input.dni,
            phone: input.phone,
            address: input.address
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
                completeProfile = {person, user, veterinary: {mp:input.mp}}
                break;
            case 'vetOwner':
                completeProfile = {person, user, vetOwner: {}}
                break;
            default:
              break;
          }

        if(!input.email || !input.password || !input.repeatPassword || !input.name || !input.lastName || !input.phone|| !input.dni || !input.profile || !input.address){
            return notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrarse",
                placement: "top"
            })
        } else if (vet){
            if (!input.mp) {
                return notification['error']({
                        message: "La matrícula profesional es obligatoria",
                        description: "Debe ingresar su matrícula profesional para poder registrarse",
                        placement: "top"
                    })
            }
        }
        if(input.password !== input.repeatPassword){
            return notification['error']({
                message: "Las constraseñas deben ser iguales",
                description: "Compruebe que las contraseñas ingresadas coincidan",
                placement: "top"
            })
        } else {
            return completeProfile;
        }
    }

    const register = async (e) => {
        setIsRegistering(true);
        const completeProfile = checkFields();
        let file = null; 
        if (fileList && fileList[0] && fileList[0].originFileObj) {
            file = fileList[0].originFileObj;
        } else {
            console.error('No se encontró un archivo válido en fileList.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = () => {
            completeProfile.photo = reader.result;
            signUpApi(completeProfile)
            .then((res) => {
                setIsRegistering(false);
                setRegisteredUser(res.data);
            })
            .catch((error) => {
                setCatchReason(error.response.data);
                setIsRegistering(false);
            });
        };
    };

    const confirmRegister = e => {
        setIsRegistering(true);
        setCatchReason(null);
        const data = {email: registeredUser.user.email, code: confirmationCode}; 
        confirmSignUp(data)
            .then(res => {
                setIsRegistering(false);
                var registeredUser = res.data;
                registeredUser.confirmated = true;
                setRegisteredUser(res.data);
            })
            .catch(error => {
                setCatchReason(error.response.data);
                setIsRegistering(false);
            });
           
    };

    const resetForm = () =>{
        const inputs = document.getElementsByTagName('input');
        setIsRegistering(false);
        setRegisteredUser(null);
        setIsModalVisible(false);
        setVet(false);
        setCatchReason(null);
        setConfirmationCode(null);
        setFileList([]);

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
                privacyPolicy:false,
                address: "",
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
                privacyPolicy:false,
                address:false,
            })
        }
    }

    const returnFromError = () =>{
        setIsModalVisible(false);
        setIsRegistering(false);
        setCatchReason(null);
    }
    
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

    const showModal = () => {
        checkFields()
        .then(
            setIsModalVisible(true)
        )
    };

    const hideModal = () =>{
        setIsModalVisible(false);
        if (registeredUser) {
            resetForm();
        }
    }

    const updateConfirmationCode = e => {
        var code = Number(e.target.value);
        code = code > 9999 ? confirmationCode : code;
        setConfirmationCode(code);
    }

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    
    return (        
        <Form className="register-form"  onChange={changeForm}>            
            <Form.Item rules={[{required: true, message: 'Ingrese su email'}]}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="email" onChange={inputValidation} value={input.email} placeholder="Correo electrónico" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" onChange={inputValidation} value={input.password} placeholder="Contraseña" className="register-form__input" onSelect={inputValidation} minlength="8"/>
            </Form.Item>
            <Form.Item>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="repeatPassword" onChange={inputValidation} value={input.repeatPassword} placeholder="Repetir Contraseña" className="register-form__input" onSelect={inputValidation} minlength="8" />
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="lastName" onChange={inputValidation} value={input.lastName} placeholder="Apellido" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" name="dni" value={input.dni} placeholder="DNI" className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item>
            <Form.Item>
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="number" name="phone" value={input.phone} placeholder="Teléfono" className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item>
            <Form.Item>
                <Input prefix={<HomeOutlined className="site-form-item-icon" />} type="text" name="address" onChange={inputValidation} value={input.address} placeholder="Dirección" className="register-form__input" onSelect={inputValidation}/>
            </Form.Item>
            <Form.Item>
                <Select name="profile" placeholder="Seleccione su perfil" className="register-form__select" value={input.profile} onChange={onProfileChange} allowClear > 
                    <Select.Option value="tutor" >Tutor</Select.Option>
                    <Select.Option value="veterinary">Veterinario</Select.Option>
                    <Select.Option value="vetOwner">Propietario de Veterinaria</Select.Option>
                </Select>
            </Form.Item>
                <Col>
                    Ingrese una foto de la parte frontal de su DNI
                    <Form.Item>
                        <ImgCrop rotate>
                            <Upload customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}>
                                    {fileList.length < 1 && '+ Subir'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Col>
            
            {
            vet ? 
                <div> 
                    <Form.Item id="matricula">
                        <Input  prefix={ <IdcardOutlined className="site-form-item-icon"/> } 
                                type="number" 
                                name="mp" 
                                onChange={inputValidation} 
                                value={input.mp} 
                                placeholder="Número de Matrícula" 
                                className="register-form__input"
                                onSelect={inputValidation}/>
                    </Form.Item>
                </div>
                : 
                null
            }          
            <Form.Item>
                <Button type="submit" htmlType="submit" className="register-form__button" onClick={showModal} > 
                  Registrarme
                </Button>
                <Modal title={ isRegistering || catchReason || registeredUser ? "Registro de usuario" : "Términos y Condiciones"}
                    visible={isModalVisible}
                    onCancel={hideModal}
                    footer={[
                        registeredUser ?
                        null
                        :
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        catchReason ? 
                            (
                            registeredUser ?
                            <Button htmlType="submit" type="primary" onClick={confirmRegister} className="register-form_button-ok-modal" >
                                    {
                                        isRegistering ?
                                        <Spin></Spin>
                                        :
                                        <>Reintentar confirmacion</>
                                    }
                                </Button>
                            :
                            <Button htmlType="submit" type="primary" onClick={returnFromError} className="register-form_button-ok-modal">
                                Revisar datos
                            </Button>
                            )
                        :
                        registeredUser ? 
                            (
                            registeredUser.confirmated ? 
                                <Button htmlType="submit" type="primary" onClick={goToLogin} className="register-form_button-ok-modal" >
                                    Ir al login
                                </Button>
                                :
                                <Button htmlType="submit" type="primary" onClick={confirmRegister} className="register-form_button-ok-modal" >
                                    {
                                        isRegistering ?
                                        <Spin></Spin>
                                        :
                                        <>Confirmar registro</>
                                    }
                                </Button>
                            )
                        :
                        <Button htmlType="submit" type="primary" onClick={register} className="register-form_button-ok-modal" >
                            {
                                isRegistering ?
                                <Spin></Spin>
                                :
                                <>Aceptar y registrar</>
                            }
                        </Button>
                        
                    ]}>
                        {
                            isRegistering ? 
                            <>
                                Registrando usuario, este proceso hace algunas validaciones de tus datos y por lo tanto puede demorar unos segundos
                            </>
                            :
                            registeredUser ?
                            (
                                registeredUser.confirmated ? 
                                <>
                                    Registro completado exitosamente!
                                </>
                                :
                                <>
                                    {
                                    catchReason ?
                                        <> 
                                            {catchReason},
                                        </>
                                        :
                                        <>
                                            Datos validados correctamente! Se ha enviado un codigo a tu correo electronico, ingresalo a continuación para completar 
                                            el registro o bien 
                                        </>
                                    }
                                    <a href='www.google.com'> reenvía el codigo</a> si no lo has recibido.
                                    <div style={{justifyContent: 'center', alignContent:'center', display: 'flex', flexDirection:'row', paddingTop: '20px'}}>
                                            <Input  type="number" 
                                                    onChange={updateConfirmationCode} 
                                                    style={{width: '160px', textAlign: 'center'}} 
                                                    placeholder="Código de registro" 
                                                    size="large"
                                                    value={confirmationCode}/>
                                    </div>
                                </>
                            )
                            :
                            catchReason ? 
                            <>
                                Ups! Hubo un error: {catchReason}
                            </>
                            :
                            <Terms></Terms>
                        }
                    </Modal>
            </Form.Item>
        </Form>
    );  
    
        
};
