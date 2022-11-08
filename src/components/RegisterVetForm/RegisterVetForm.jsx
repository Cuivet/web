import React, {useState} from "react";
import { numberValidation } from '../../utils/formValidation';
import {Row, Col, Form, Button, Upload, notification, message, Input } from 'antd';
import ImgCrop from 'antd-img-crop';
import { SaveOutlined, InboxOutlined } from '@ant-design/icons';
import { registerVet } from '../../services/vet.service';

export default function RegisterVetForm(props){
    const {Dragger} = Upload;

    var vetName;
    const fields = {
        name: `vet`, //le dejamos el nombre con el que lo sube ?
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
            message.success(`${info.file.name} Imágen subida con éxito.`);
            //aca iria lo del back para guardar la img
          } else if (status === 'error') {
            message.error(`${info.file.name} La imágen no se ha podido subir`);
          }
        },
      
        onDrop(e) {
          console.log('Archivo eliminado', e.dataTransfer.files);
        },
      };
    
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    const [input, setInput]= useState({
        name:null,
        mp: null,
        phone: null,
        address:null,
    });

    const [formValid, setFormValid] = useState({
        name:false,
        mp: false,
        phone: false,
        address:false,
    });
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
                vetName = value;
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
        const newVet = {
            name: input.name,
            mp: null,
            address:input.address,
            phone: input.phone,
            vetOwnerId: profile.vetOwner.id,
        }
        const nameVal = input.name;
        const addressVal = input.address;
        const phoneVal = input.phone;
        

        if(!nameVal || !addressVal || !phoneVal){
            notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrar una Clínica",
                placement: "top"
            })
        } else{
                registerVet(newVet)
                    .then( res => {
                        resetForm();
                        notification['success']({
                            message: "Clínica creada correctamente",
                            placement: "top"
                        });
                    });
                    window.location.replace('');        

            }
    };
    const resetForm = () =>{
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i< inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");

            setInput({
                name:null,
                mp: null,
                address:null,
            });
            setFormValid({
                name:false,
                mp: false,
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
                    <Input type="number" name="phone" onChange={inputValidation} value={input.phone} placeholder="Teléfono" className="register-pet-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Input type="text" name="address" onChange={inputValidation} value={input.address} placeholder="Dirección " className="register-pet-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                </Col>
                {/* <Col span={24}>
                    <Form.Item>
                    <Input type="number" name="mp" onChange={inputValidation} value={input.mp} placeholder="Matricula MVR" className="register-pet-form__input" onSelect={inputValidation}/>
                    </Form.Item>
                </Col> */}
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
                                <p className="ant-upload-text">Click aquí o arrastre la imágen a esta área</p>
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
}