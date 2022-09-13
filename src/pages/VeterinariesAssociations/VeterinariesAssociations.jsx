import React, { useState } from 'react';
import DefaultAvatar from '../../assets/img/jpg/veterinaryAvatar.jpg';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tag, Tooltip, Modal, Input, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { getTemporalAssociationByCode } from '../../services/pet_association.service';
import { register, getAllByTutorId } from '../../services/pet_association.service';
import { getPetsByTutorId } from '../../services/pet.service';
const { Option } = Select;
const { Title } = Typography;

export default function VeterinariesAssociations(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);
    const [completeTemporalAssociation, setCompleteTemporalAssociation] = useState(null);
    const [petOptions, setPetOptions] = useState(null);
    const [selectedPetIds, setSelectePetIds] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [isInit, setIsInit] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if(!isInit){
        refreshComponent();
        setIsInit(true);
    }


    const confirm = (e) => {
        message.success('Mascota borrada exitosamente.' );
      };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const tryToAsociate = () => {
        getTemporalAssociationByCode(generatedCode)
            .then(temporalAsociation => {
                getPetsByTutorId(profile.tutor.id).then(pets => {
                    setCompleteTemporalAssociation(temporalAsociation);
                    setPetOptions(generatePetOptions(pets));
                });
            });
    };

    const createAssociation = () => {
        const petAssociations = [];
        selectedPetIds.forEach( petId => {
            petAssociations.push({petId: Number(petId), veterinaryId: completeTemporalAssociation.veterinaryData.veterinary.id})
        });
        register(petAssociations)
            .then(response => {
                message.success('Asociacion establecida exitosamente');
                refreshComponent();
            });
    }

    function refreshComponent() {
        getAllByTutorId(profile.tutor.id)
            .then(associations => {
                setAssociations(associations);
            }
        );
        setIsModalOpen(false);
        setGeneratedCode(false);
        setCompleteTemporalAssociation(null);
        setPetOptions(null);
        setSelectePetIds([]);
    }

    function generatePetOptions(pets) {
        var renderPetOptions = [];
        pets.forEach(function eachPet(pet){
            renderPetOptions.push(<Option key={pet.id}>{pet.name}</Option>)
        });
        return renderPetOptions;
    }

    const hideModal = () => {
        setIsModalOpen(false);
        setGeneratedCode(null);
        setCompleteTemporalAssociation(null);
    };

    const refreshCode = e =>{
        setGeneratedCode(e.target.value);
    };

    const refreshSelectedPets = (value) => {
        setSelectePetIds(value);
    };

    function returnAssociationCards(){
        var renderAssociationCards = [];
        associations.forEach(association => {
            renderAssociationCards.push(
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={DefaultAvatar}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar el veterinario?"  
                                            onConfirm={confirm}
                                            okText="Si"
                                            cancelText="No"
                                            placement="top"
                                            arrowPointAtCenter 
                                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red',}} />}>
                                        <DeleteOutlined key="delete" />
                                    </Popconfirm>,
                                ]}>
                    <Meta   className=''
                            title={ association.veterinaryData.person.name + ' ' + association.veterinaryData.person.lastName }
                            description={'Veterinaria: -'}/>
                    <br></br>
                    {renderPetTags(association.pets)}
                </Card>
            )
        });
        return renderAssociationCards;
    };

    
    function renderPetTags(pets){
        const renderedPetTags = [];
        pets.forEach(pet => {
            renderedPetTags.push(
            <Tag color="purple">{pet.name}</Tag>
            );
        })
        return renderedPetTags;
    }

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Profesionales asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModal}/>
                    </Tooltip>
                </Col>
            </Row>

            <Divider></Divider>

            <Row>
                {
                associations.length ? 
                returnAssociationCards()
                :
                <>Aún no existen veterinarios asociados</>
                }
            </Row>

            <Modal  title="Asociarse con un profesional"
                    visible={isModalOpen}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <>
                            {
                            completeTemporalAssociation ? 
                            <Button htmlType="submit" type="primary" onClick={createAssociation} className="register-form_button-ok-modal" disabled={selectedPetIds.length===0} > 
                                Asociar
                            </Button>
                            :
                            <Button htmlType="submit" type="primary" onClick={tryToAsociate} className="register-form_button-ok-modal" > 
                                Buscar
                            </Button>
                            }
                        </>
                    ]}>
                {
                completeTemporalAssociation ?
                <>
                    <div>Seleccione que mascotas quiere asociar con el siguiente veterinario:</div>
                    <div>Profesional: {completeTemporalAssociation.veterinaryData.person.name + ' ' + completeTemporalAssociation.veterinaryData.person.lastName}</div>
                    <div>Clínica: -</div>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Seleccione las mascotas a asociar"
                        onChange={refreshSelectedPets}
                        >
                        {petOptions}
                    </Select>
                </>
                :
                <>
                    <div>Ingrese código de asociacion brindado por el veterinario</div>
                    <Input type="number" name="phone" placeholder="Código de asociacion" onChange={refreshCode} />
                </>
                }
            </Modal>
            
        </>
    );
};

