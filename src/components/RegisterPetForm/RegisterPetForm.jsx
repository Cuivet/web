import React, {useState} from "react";
import {Form, Input, Button, notification, Select, Radio, DatePicker, Descriptions } from 'antd';
import { minLengthValidation, numberValidation } from '../../utils/formValidation';
import './RegisterPetForm.scss';

export default function RegisterPetForm(){

    const [input, setInput]= useState({
        name:"",
        species:"Especie",
        raza:"Raza",
        dateBirth:null,
        sex:null,
        size:"Tamaño",
    });

    const [formValid, setFormValid] = useState({
        name:false,
        species:false,
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
        //console.log(e.target);
        const {type, name} = e.target;

        if(type ==="radio"){
            setFormValid({
                ...formValid,
                [name]:e.target.checked
            });
        };

        if(type === "text"){
            setFormValid({ ...formValid, [name]:(e.target)});
        };

        if (type === "number"){
            setFormValid({
                ...formValid,
                [name]:numberValidation(e.target)
            });
        };

        // if(type ==="datePicker"){
        //     setFormValid({
        //         ...formValid,
        //         [name]:e.target.checked
        //     });
        // };

        
    };

    const register = e => {
        console.log(input);
        console.log(formValid);
        //const {name, species, raza, dateBirth, sex, size} = formValid;
        const nameVal = input.name;
        const speciesVal = input.species;
        const razaVal = input.raza;
        const dateBirthVal = input.dateBirth;
        const sexVal = input.sex;
        const sizeVal = input.size;

        if(!nameVal || !speciesVal || !razaVal|| !dateBirthVal|| !sexVal|| !sizeVal){
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
                species:"Especie",
                raza:"Raza",
                dateBirth:null,
                sex:null,
                size:"Tamaño",
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

    const onSpeciesChange = (val) => {
        switch(val){
            case '1':
                setInput({...input, species:"1"});
                setFormValid({...formValid, species: true});
                break;
            case '2':
                setInput({...input, species: "2"});
                setFormValid({...formValid, species: true});
                break;
            case '3':
                setInput({...input, species: "3"});
                setFormValid({...formValid, species: true});
                break;
            case '4':
                setInput({...input, species: "4"});
                setFormValid({...formValid, species: true});
                break;
            default:
                break;
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
            case '4':
                setInput({...input, raza: "4"});
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

    const onDateBirthChange = (value, dateString) => {
        //'2022-08-02' -> dateString
        //console.log(value, dateString);
        setInput({...input, dateBirth: dateString});
        setFormValid({...formValid, dateBirth: true});
    };



    return (        
        <Form className="register-pet-form"  onFinish={register} onChange={changeForm}>           
            <Form.Item>
                <Input type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-pet-form__input" onSelect={inputValidation}/>
            </Form.Item>
                <Form.Item>
                    <DatePicker name="dateBirth" size="large" onChange={onDateBirthChange} placeholder="Fecha de nacimiento" className="register-pet-form__datepicker" />
                </Form.Item>
            <Form.Item>
            <Select name="species" className="register-pet-form__select" value={input.species} onChange={onSpeciesChange} allowClear > 
                <Select.Option value="1">Perro</Select.Option>
                <Select.Option value="2">Gato</Select.Option>
                <Select.Option value="3">Roedor</Select.Option>
                <Select.Option value="4">Otro</Select.Option>
            </Select>
        </Form.Item> 
            <Form.Item>
                <Select name="raza"  className="register-pet-form__select" value={input.raza} onChange={onRazaChange} allowClear > 
                    <Select.Option value="1">Labrador</Select.Option>
                    <Select.Option value="2">Golden</Select.Option>
                    <Select.Option value="3">Caniche</Select.Option>
                    <Select.Option value="4">Sin Raza</Select.Option>
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