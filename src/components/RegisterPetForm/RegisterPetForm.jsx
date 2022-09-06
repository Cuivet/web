import React, {useState} from "react";
import { Form, message, Upload, Input, Button, notification, Select, Radio, DatePicker, Row, Col } from 'antd';
import ImgCrop from 'antd-img-crop';
import { numberValidation } from '../../utils/formValidation';
import { SaveOutlined, InboxOutlined } from '@ant-design/icons';
import moment  from "moment";


import './RegisterPetForm.scss';

export default function RegisterPetForm(){
    
     //saco los datos del tutor que está logueado
     const profile = JSON.parse(sessionStorage.getItem('profile'));
     const tutorId = profile.tutor.id;

    const {Dragger} = Upload;
    var petName;

    const props = {
        name: `pet-${petName}`, //le dejamos el nombre con el que lo sube ?
        multiple: false,
        maxCount:1,
        accept: 'image/png, image/jpeg',
        method: 'post',
        action: 'localhost', //creo es para llamar el endpoint... 
      
        onChange(info) {
          const { status } = info.file;
      
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
      
          if (status === 'done') {
            message.success(`${info.file.name} Imagen subida con exito.`);
            //aca iria lo del back para guardar la img
          } else if (status === 'error') {
            message.error(`${info.file.name} La imagen no se ha podido subir`);
          }
        },
      
        onDrop(e) {
          console.log('Archivo eliminado', e.dataTransfer.files);
        },
      };

    const [input, setInput]= useState({
        name:"",
        species:"Especie",
        raza:"Raza",
        birth:null,
        sex:null,
        size:"Tamaño",
    });

    const [formValid, setFormValid] = useState({
        name:false,
        species:false,
        raza:false,
        birth:false,
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
        const {type, name, value} = e.target;

        if(type ==="radio"){
            setFormValid({
                ...formValid,
                [name]:e.target.checked
            });
        };

        if(type === "text"){
            if(name === "name"){
                petName = value;
            }
            setFormValid({ ...formValid, [name]:(e.target)});
        };

        if (type === "number"){
            setFormValid({
                ...formValid,
                [name]:numberValidation(e.target)
            });
        };

        setInput({...input, tutorId: tutorId});
        
    };

    const register = e => {
        console.log(input);
        //console.log(formValid);
        //const {name, species, raza, dateBirth, sex, size} = formValid;
        const nameVal = input.name;
        const speciesVal = input.species;
        const razaVal = input.raza;
        const birthVal = input.birth;
        const sexVal = input.sex;
        const sizeVal = input.size;

        if(!nameVal || !speciesVal || !razaVal|| !birthVal|| !sexVal|| !sizeVal){
            notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrarse",
                placement: "top"
            })
        } else{
                //console.log(tutorId);
                // const res = registerPet(input);
                notification['success']({
                    message: "Mascota creada correctamente",
                    placement: "top"
                })
                resetForm();

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
                birth:null,
                sex:null,
                size:"Tamaño",
            });
            setFormValid({
                name:false,
                responsible:false,
                raza:false,
                birth:false,
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
        setInput({...input, birth: value});
        setFormValid({...formValid, birth: true});
    };
    const disabledDate =(current) =>{
        return current && current> moment().endOf('day');
    }


    return (        
        <Form className="register-pet-form"  onFinish={register} onChange={changeForm}>           
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item>
                        <Input type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-pet-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <DatePicker disabledDate={disabledDate} name="dateBirth" size="large" onChange={onDateBirthChange} placeholder="Fecha de nacimiento" className="register-pet-form__datepicker" format={'DD/MM/yyyy'} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="species" className="register-pet-form__select" value={input.species} onChange={onSpeciesChange} allowClear > 
                            <Select.Option value="1">Perro</Select.Option>
                            <Select.Option value="2">Gato</Select.Option>
                            <Select.Option value="3">Roedor</Select.Option>
                            <Select.Option value="4">Otro</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="raza"  className="register-pet-form__select" value={input.raza} onChange={onRazaChange} allowClear > 
                            <Select.Option value="1">Labrador</Select.Option>
                            <Select.Option value="2">Golden</Select.Option>
                            <Select.Option value="3">Caniche</Select.Option>
                            <Select.Option value="4">Sin Raza</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Radio.Group optionType="button" name="sex" size="large" className="register-pet-form__radio" onChange={inputValidation} value={input.sex}>
                            <Radio value="1" className="register-pet-form__radio-item">Macho</Radio>
                            <Radio value="2"  className="register-pet-form__radio-item">Hembra</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="size" className="register-pet-form__select" value={input.size} onChange={onSizeChange} allowClear > 
                            <Select.Option value="1">Chico</Select.Option>
                            <Select.Option value="2">Mediano</Select.Option>
                            <Select.Option value="3">Grande</Select.Option>
                        </Select>
                    </Form.Item>
                </Col> 
                <Col span={24}>
                    <Form.Item>
                        <ImgCrop rotate>
                            {/* <Upload
                                    action=""
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Cargar'}
                            </Upload> */}
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click aquí o arrastre la imagen a esta área</p>
                            </Dragger>
                        </ImgCrop>
                    </Form.Item>
                </Col>     
                <Col span={24}>
                    <Form.Item>
                        <Button htmlType="submit" className="register-pet-form__button" icon={<SaveOutlined />}> 
                           Guardar 
                        </Button>
                    </Form.Item>
                </Col>  
            </Row>
        </Form>
    );  
};