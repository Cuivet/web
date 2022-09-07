import React, {useState} from "react";
import { minLengthValidation, numberValidation } from '../../utils/formValidation';
import {Row, Col, Form, Button, Upload, notification, message, Input, DatePicker } from 'antd';
import ImgCrop from 'antd-img-crop';
import { SaveOutlined, InboxOutlined } from '@ant-design/icons';

export default function RegisterVetClinicForm(){
    const {Dragger} = Upload;

    var clinicName;

    const fields = {
        name: `clinic`, //le dejamos el nombre con el que lo sube ?
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
        name:null,
        matricula: null,
        address:null,
    });

    const [formValid, setFormValid] = useState({
        name:false,
        matricula: false,
        address:false,
    });
    //ver si va
    const changeForm = e =>{
        
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
                clinicName = value;
            }
            setFormValid({ ...formValid, [name]:(e.target)});
        };

        if (type === "number"){
            setFormValid({
                ...formValid,
                [name]:numberValidation(e.target)
            });
        };

        setInput({...input});
        
    };
    const register = e => {
        // console.log(input);
        const nameVal = input.name;
        const matriculaVal = input.matricula;
        const addressVal = input.address;

        if(!nameVal || !matriculaVal || !addressVal){
            notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrar una clinica",
                placement: "top"
            })
        } else{
                //console.log(tutorId);
                const res = //registerPet(input);
                notification['success']({
                    message: "Clinica creada correctamente",
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
                name:null,
                matricula: null,
                address:null,
            });
            setFormValid({
                name:false,
                matricula: false,
                address:false,
            })
        }
    };

    return(
        <Form className="register-pet-form"  onFinish={register} onChange={changeForm}>           
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item>
                        <Input type="text" name="name" onChange={inputValidation} value={input.name} placeholder="Nombre" className="register-pet-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        {/* <DatePicker  name="dateBirth" size="large" onChange={onDateBirthChange} placeholder="Fecha de nacimiento" className="register-pet-form__datepicker" format={'DD/MM/yyyy'} /> */}
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
                            <Dragger {...fields}>
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
    )
}