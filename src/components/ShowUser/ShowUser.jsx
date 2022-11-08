import React from "react";
import { Typography, Input, Form } from "antd";
import './ShowUser.scss';

const { Title } =Typography;
 
export default function ShowUser(props){
    const {formData} = props;
    var veterinary = false;
    const profile = JSON.parse(sessionStorage.getItem('profile')) ;

    if(profile.veterinary != null){
        veterinary = true;
    };

    const changeForm = e =>{
        props.refreshUser(e);
    };
 
    return(
        <Form className="register-form" onChange={changeForm}>
            <Title level={5}>Nombre:
                <Form.Item>
                    <Input  type="name"
                            name="name"
                            placeholder="Nombre"
                            className="register-form__input"
                            value={formData.name}
                            disabled={veterinary}/>
                </Form.Item>
            </Title>
            <Title level={5}>Apellido:
                <Form.Item>
                    <Input  type="lastName"
                            name="lastName"
                            placeholder="Apellido"
                            className="register-form__input"
                            value={formData.lastName}
                            disabled={veterinary}/>
                </Form.Item>
            </Title>
            <Title level={5}>Teléfono:
                <Form.Item>
                    <Input  type="phone"
                            name="phone"
                            placeholder="Teléfono"
                            className="register-form__input"
                            value={formData.phone}/>
                </Form.Item>
            </Title>
            <Title level={5}>Dirección:
                <Form.Item>
                    <Input  type="address"
                            name="address"
                            placeholder="Dirección"
                            className="register-form__input"
                            value={formData.address}/>
                </Form.Item>
            </Title>
            <Title level={5}>DNI:
                <Form.Item>
                    <Input  type="dni"
                            name="dni"
                            placeholder="DNI"
                            className="register-form__input"
                            value={formData.dni}/>
                </Form.Item>
            </Title>
            { veterinary ?
            <>
                <Title level={5}>Matrícula Profesional:
                    <Form.Item>
                        <Input  type="mp"
                                name="mp"
                                placeholder="MP"
                                className="register-form__input"
                                value={formData.mp}
                                disabled/>
                    </Form.Item>
                </Title>
            </>
            : null }
            <Title level={5}>Email:
                <Form.Item>
                    <Input  type="email"
                            name="email"
                            placeholder="Email"
                            className="register-form__input"
                            value={formData.email}/>
                </Form.Item>
            </Title>
        </Form>
    )
}