import React, {useState, useEffect} from "react";
import { Form, message, Upload, Input, Button, notification, Select, Radio, DatePicker, Row, Col, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import { SaveOutlined, InboxOutlined } from '@ant-design/icons';
import moment  from "moment";
import { registerPet } from "../../services/pet.service";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";
import { petSizeService } from "../../services/pet_size.service";
import { hairColorService } from "../../services/hair_color.service";
import { hairLengthService } from "../../services/hair_length.service";
import './RegisterPetForm.scss';

export default function RegisterPetForm(props){
    const [isInitData, setIsInitData]= useState(false);
    const [isFetchData, setIsFetchData]= useState(false);
    const [pet, setPet]= useState(null);
    const [races, setRaces]= useState([]);
    const [species, setSpecies]= useState([]);
    const [petSizes, setPetSizes]= useState([]);
    const [hairColors, sethairColors]= useState([]);
    const [hairLenghts, sethairLenghts]= useState([]);
    const [formValid, setFormValid] = useState(initFormValid());
    const {Dragger} = Upload;

    if(!isInitData && isFetchData){
        initPet();
        setIsInitData(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            await raceService.findAll()
            .then(response => {
                setRaces(response);
            });
            await petSizeService.findAll()
            .then(response => {
                setPetSizes(response);
            });
            await hairColorService.findAll()
            .then(response => {
                sethairColors(response);
            });
            await hairLengthService.findAll()
            .then(response => {
                sethairLenghts(response);
            });
            await specieService.findAll()
            .then(response => {
                setSpecies(response);
            });
            setIsFetchData(true);
        };
        fetchData();
    }, []);

    function initPet() {
        const pet = props.pet;
        setPet({
            id: pet? pet.id : null,
            name: pet ? pet.name : null,
            raceId: pet ? pet.raceId : null,
            specieId: pet ? pet.raceId ? species.find(specie => specie.id === (races.find(race => race.id === pet.raceId).specieId)).id : null : null,
            birth: pet ? moment(pet.birth.slice(0, 10), 'YYYY-MM-DD') : null,
            isMale: pet ? pet.isMale ? '1' : '0' : null,
            petSizeId: pet ? pet.petSizeId : null,
            tutorId: JSON.parse(sessionStorage.getItem('profile')).tutor.id, 
            hairColorId: pet ? pet.hairColorId : null,
            hairLengthId: pet ? pet.hairLengthId : null,
            castrationDate: pet ? pet.castrationDate ? moment(pet.castrationDate.slice(0, 10), 'YYYY-MM-DD') : null : null,
            haveChip: pet ? pet.haveChip ? '1' : '0' : null,
            aspects: pet ? pet.aspects : null
        });
    }

    function initFormValid() {
        return {
            name: false,
            raceId: false,
            birth: false,
            isMale: false,
            petSizeId: false, 
            hairColorId: false,
            hairLengthId: false,
            haveChip: false,
            aspects: false
        }
    }

    const draggerFields = {
        name: '',
        multiple: false,
        maxCount:1,
        accept: 'image/png, image/jpeg',
        method: 'post',
        action: 'localhost',
        onChange(info) {
          const { status } = info.file;

          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
      
          if (status === 'done') {
            message.success(`${info.file.name} Imagen subida con exito.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} La imagen no se ha podido subir`);
          }
        },
        onDrop(e) {
          console.log('Archivo eliminado', e.dataTransfer.files);
        },
    };

    const register = e => {
        if(!pet.name || !pet.specieId || !pet.raceId || !pet.birth || pet.isMale === null || !pet.petSizeId|| !pet.hairColorId|| !pet.hairLengthId || pet.haveChip === null){
            return notification['error']({
                message: "Todos los campos son obligatorios",
                description: "Debe completar todos los campos para poder registrarse",
                placement: "top"
            })
        }
        pet.isMale = pet.isMale === '1' ? true : false;
        registerPet(pet)
            .then( res => {
                resetForm();
                props.registeredPet();
                if(pet.id){
                     return notification['success']({
                        message: "Mascota actualizada correctamente",
                        placement: "top"
                    });
                }
                notification['success']({
                    message: "Mascota creada correctamente",
                    placement: "top"
                });
            });
    };

    const resetForm = () => {
        initPet(null);
        setFormValid(initFormValid);
    };

    const onSpeciesChange = (specieId) => {
        setPet({...pet, specieId: specieId, raceId: null});
        setFormValid({...formValid, specieId: true});
    };

    const onRazaChange = (raceId) => {
        setPet({...pet, raceId: raceId});
        setFormValid({...formValid, raceId: true});
    };

    const onPetSizeChange = (petSizeId) => {
        setPet({...pet, petSizeId: petSizeId});
        setFormValid({...formValid, petSizeId: true});
    }

    const onDateBirthChange = (date) => {
        setPet({...pet, birth: date});
        setFormValid({...formValid, birth: date});
    };

    const onCastrationDateChange = (date) => {
        setPet({...pet, castrationDate: date});
        setFormValid({...formValid, castrationDate: date});
    };

    const onSexChange = (isMale) => {
        setPet({...pet, isMale: isMale.target.value});
        setFormValid({...formValid, isMale: true});
    };

    const onHaveChipChange = (haveChip) => {
        setPet({...pet, haveChip: haveChip.target.value});
        setFormValid({...formValid, haveChip: true});
    };

    const onHairColorChange = (hairColorId) => {
        setPet({...pet, hairColorId: hairColorId});
        setFormValid({...formValid, hairColorId: true});
    };

    const onHairLengthChange = (hairLengthId) => {
        setPet({...pet, hairLengthId: hairLengthId});
        setFormValid({...formValid, hairLengthId: true});
    };

    const changeForm = e =>{
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });
    };

    const disabledDate = (current) =>{
        return current && current> moment().endOf('day');
    }

    function renderSpecies() {
        let list = [];
        species.forEach(specie => {
            list.push(<Select.Option value={specie.id}>{specie.name}</Select.Option>);
        })
        return list;
    }

    function renderRaces() {
        let list = [];
        races.forEach(race => {
            if(race.specieId === pet.specieId){
                list.push(<Select.Option value={race.id}>{race.name}</Select.Option>);
            }
        })
        return list;
    }

    function renderPetSize() {
        let list = [];
        petSizes.forEach(petSize => {
            list.push(<Select.Option value={petSize.id}>{petSize.name}</Select.Option>);
        })
        return list;
    }

    function renderHairColor() {
        let list = [];
        hairColors.forEach(hairColor => {
            list.push(<Select.Option value={hairColor.id}>{hairColor.name}</Select.Option>);
        })
        return list;
    }


    function renderHairLength() {
        let list = [];
        hairLenghts.forEach(hairLength => {
            list.push(<Select.Option value={hairLength.id}>{hairLength.name}</Select.Option>);
        })
        return list;
    }


    return (
        !isInitData ? 
        <Spin tip="Cargando..."></Spin>
        :
        <Form className="register-pet-form"  onFinish={register} onChange={changeForm}>           
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item>
                        <Input type="text" name="name" value={pet.name} placeholder="Nombre" className="register-pet-form__input"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <DatePicker disabledDate={disabledDate} name="dateBirth" value={pet.birth} size="large" onChange={onDateBirthChange} placeholder="Fecha de nacimiento" className="appDatePicker" format={'DD/MM/yyyy'} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="species" placeholder="Especie" className="register-pet-form__select" value={pet.specieId} onChange={onSpeciesChange} allowClear >
                            {renderSpecies()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select showSearch name="races" optionFilterProp="children" placeholder="Raza" className="register-pet-form__select" value={pet.raceId} onChange={onRazaChange} allowClear 
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}> 
                            {renderRaces()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Radio.Group optionType="button" name="isMale" size="large" className="register-pet-form__radio" onChange={onSexChange} value={pet.isMale}>
                            <Radio value='1' className="register-pet-form__radio-item">Macho</Radio>
                            <Radio value='0' className="register-pet-form__radio-item">Hembra</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <DatePicker disabledDate={disabledDate} name="castrationDate" value={pet.castrationDate} size="large" onChange={onCastrationDateChange} placeholder="Fecha de castración" className="appDatePicker" format={'DD/MM/yyyy'} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Radio.Group optionType="button" name="haveChip" size="large" className="register-pet-form__radio" onChange={onHaveChipChange} value={pet.haveChip}>
                            <Radio value='1' className="register-pet-form__radio-item">Tiene chip</Radio>
                            <Radio value='0' className="register-pet-form__radio-item">No tiene chip</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="petSize" placeholder="Tamaño" className="register-pet-form__select" value={pet.petSizeId} onChange={onPetSizeChange} allowClear >
                            {renderPetSize()}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item>
                        <Select name="hairColor" placeholder="Color de Pelaje" className="register-pet-form__select" value={pet.hairColorId} onChange={onHairColorChange} allowClear >
                            {renderHairColor()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Select name="petSize" placeholder="Largo de pelaje" className="register-pet-form__select" value={pet.hairLengthId} onChange={onHairLengthChange} allowClear >
                            {renderHairLength()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Input type="text" name="aspects" value={pet.aspects} placeholder="Otras características físicas" className="register-pet-form__input"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <ImgCrop rotate>
                            <Dragger {...draggerFields}>
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