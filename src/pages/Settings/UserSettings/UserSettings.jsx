import React, {useState} from "react";
import { Row, message, Popconfirm, Col, Descriptions,Typography, Button, Tooltip, Form, Input  } from "antd";
import { DeleteOutlined,ExclamationCircleOutlined,EditOutlined, LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, SaveOutlined} from "@ant-design/icons";
import {emailValidation, minLengthValidation,numberValidation} from '../../../utils/formValidation';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

import './UserSettings.scss'

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

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;

    const user = {
        
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        dni: "24356789",
        address: profile.person.address,
        email: profile.person.email,
    };
    const label = ['Nombre','Apellido','Telefono','DNI','Direccion','Email','Perfil'];

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

    function Items(){
        console.clear();   
        console.log(user)     
        const item = [];
        let sum = 0;
        for(var i of Object.keys(user)){
           
            console.log(i + " : "+ user[i]);
            // console.log(Object.keys(user));
            item.push(                        
                <Descriptions bordered>
                    <Descriptions.Item key={sum} label={label[sum]} span={3} className="description-item">{user[i]}</Descriptions.Item>
                </Descriptions>
                
            );  
            sum = sum + 1;            
        };              
        return item;
    };

    function Edit(){
        console.log("Hola")
        setEditable(true);
        
    }
    function Save(){
        setEditable(false);
    }
    //evento para borrar el usuario
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      //evento para cancelar borrado del usuario
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };
    function Delete(){
        
    }

    return (
        <>
        <Row>
            <Col span={18} offset={3}>
                <Title className="description-item__title">Información del Usuario 
                    {!editable ? <><Tooltip title='Editar usuario' placement="right" color={'#5B2569'}><Button type="link" className="description-item__button" icon={<EditOutlined /> } onClick={Edit}/>
                </Tooltip></>: <><Popconfirm
                        title="Esta seguro que desea borrar el usuario?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Si"
                        cancelText="No"
                        placement="bottom"
                        arrowPointAtCenter 
                        icon={<ExclamationCircleOutlined fontSize="small" style={{
                            color: 'red',
                          }} />}
                    ><Tooltip title='Borrar usuario' placement="right" color={'#5B2569'}><Button type="link" className="description-item__button" icon={<DeleteOutlined /> } onClick={Delete}/>
                </Tooltip> </Popconfirm> </>   }
                
                </Title>
                
            </Col>
        </Row>
        <Row>
            <Col  xs={{ span: 24}} lg={{ span:18 ,offset:3 }} >    
                {!editable ? <Items></Items> : <>
                <Form className="register-form" layout="vertical"  onFinish={""} onChange={""}>            
                    <Form.Item rules={[{required: true, message: 'Ingrese su email'}]} label="Email">
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="email" onChange={"inputValidation"} value={null} placeholder={user.email} className="register-form__input" onSelect={"inputValidation"}/>
                    </Form.Item>
                    <Form.Item label="Contraseña">
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" onChange={inputValidation} value={null} placeholder={user.password} className="register-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                    <Form.Item label="Nombre">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="name" onChange={inputValidation} value={user.null} placeholder={user.name} className="register-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                    <Form.Item label="Apellido">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="lastName" onChange={inputValidation} value={user.null} placeholder={user.lastName} className="register-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                    <Form.Item label="DNI">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" name="dni" value={user.null} placeholder={user.dni} className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
                    </Form.Item>
                    <Form.Item label="Telefono">
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="number" name="phone" value={user.null} placeholder={user.phone} className="register-form__input" onChange={inputValidation}  onSelect={inputValidation} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="register-form__button" icon={<SaveOutlined />} onClick={Save}> 
                            
                        </Button>
                    </Form.Item>
                </Form>
                </>}            
                    
                    
                    {/* <RegisterForm ></RegisterForm> */}
            </Col>
        </Row>
        </>
        
    )
};
