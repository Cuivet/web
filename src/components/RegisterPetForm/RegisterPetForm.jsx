import React, {useState} from "react";
import {Form, Input, Button, notification, Select, Radio, DatePicker} from 'antd';
import { minLengthValidation, numberValidation, removeClassErrorSuccess } from '../../utils/formValidation';
import './RegisterPetForm.scss';
import { UserOutlined } from "@ant-design/icons";

export default function RegisterPetForm(){

    const [input, setInput]= useState({
        name:"",
        //responsible:null,
        raza:"Seleccione la raza",
        dateBirth:"",
        sex:null,
        size:"Seleccione el tamaño",
    });

    const [formValid, setFormValid] = useState({
        name:false,
        //responsible:false,
        raza:false,
        dateBirth:false,
        sex:false,
        size:false,
    });

    const changeForm = e =>{
        //console.log(e.target.name);
        // setInput({
        //     ...input,
        //     [e.target.name]: e.target.value
        // });

        if(e.target.name === "sex"){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    };
    
    const inputValidation = e =>{
        
        const {type, name} = e.target;

        if(type ==="radio"){
            setFormValid({
                ...formValid,
                [name]:e.target.checked
            });
        };

        if(type === "text"){
            setFormValid({ ...formValid, [name]:minLengthValidation(e.target, 2)});
        };

        if (type === "number" || type === "date"){
            setFormValid({
                ...formValid,
                [name]:numberValidation(e.target)
            });
        };

        
    };

    const register = e => {
        console.log(input);
        console.log(formValid);
        const {name, responsible, raza, dateBirth, sex, size} = formValid;
        const nameVal = input.name;
        //const responsibleVal = input.responsible;
        const razaVal = input.raza;
        const dateBirthVal = input.dateBirth;
        const sexVal = input.sex;
        const sizeVal = input.size;

        if(!nameVal ||!razaVal|| !dateBirthVal|| !sexVal|| !sizeVal){
            notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrarse",
                placement: "top"
            })
        } else{
                // const res = signUpApi(input);
                notification['success']({
                    message: "Mascota creada correctamente",
                    placement: "top"
                })
                resetForm();
                //removeClassErrorSuccess(input);
                //conectar con la api
            }
    };

    const resetForm = () =>{
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i< inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");

            setInput({
                name:"",
                responsible:null,
                raza:"Seleccione la raza",
                dateBirth:null,
                sex:null,
                size:"Seleccione el tamaño",
            });
            setFormValid({
                name:false,
                responsible:false,
                raza:false,
                dateBirth:false,
                sex:false,
                size:false,
            })
        }
    };

    const onRazaChange = (val) => {
        switch(val){
            case '1':
                setInput({...input, raza:"1"});
                setFormValid({...formValid, raza: true});
                break;
            case '2':
                setInput({...input, raza: "2"});
                setFormValid({...formValid, raza: true});
                break;
            case '3':
                setInput({...input, raza: "3"});
                setFormValid({...formValid, raza: true});
                break;
            default:
                break;
        }
    };

    const onSizeChange = (val) => {
        switch(val){
            case '1':
                setInput({...input, size:"1"});
                setFormValid({...formValid, size: true});
                break;
            case '2':
                setInput({...input, size: "2"});
                setFormValid({...formValid, size: true});
                break;
            case '3':
                setInput({...input, size: "3"});
                setFormValid({...formValid, size: true});
                break;
            default:
                break;
        }
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };



    return (        
        <Form className="register-pet-form"  onFinish={register} onChange={changeForm}>            
            <Form.Item>
                <Input type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-pet-form__input" onSelect={inputValidation}/>
            </Form.Item>
            {/* <Form.Item>
                <Input  type="number" name="responsible" value={input.responsible} placeholder="DNI Responsable" className="register-pet-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item> */}
            <Form.Item>
                <label>Fecha de nacimiento</label>
                <Input type="date" name="dateBirth" value={input.dateBirth} placeholder="Fecha de nacimiento" className="register-pet-form__input" onChange={inputValidation}  onSelect={inputValidation} />
            </Form.Item>
            {/* <Form.Item>
                <DatePicker onChange={onChange} name="dateBirth" value={input.dateBirth} placeholder="Fecha de nacimiento" className="register-pet-form__input" />
            </Form.Item> */}
            <Form.Item>
                <Select name="raza" placeholder="Seleccione raza" className="register-pet-form__select" value={input.raza} onChange={onRazaChange} allowClear > 
                    <Select.Option value="1">Labrador</Select.Option>
                    <Select.Option value="2">Golden</Select.Option>
                    <Select.Option value="3">Caniche</Select.Option>
                    <Select.Option value="4">None</Select.Option>

                </Select>
            </Form.Item> 
            <Form.Item>
                <Radio.Group name="sex" className="register-pet-form__radio" onChange={inputValidation} value={input.sex}>
                    <Radio value="1">Macho</Radio>
                    <Radio value="2">Hembra</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Select name="size" className="register-pet-form__select" value={input.size} onChange={onSizeChange} allowClear > 
                    <Select.Option value="1">Chico</Select.Option>
                    <Select.Option value="2">Mediano</Select.Option>
                    <Select.Option value="3">Grande</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-pet-form__button"> 
                    Registrar Mascota
                </Button>
            </Form.Item>
        </Form>
    );  
};