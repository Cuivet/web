import React, { useState } from 'react';
import DefaultAvatar from '../../assets/img/jpg/veterinaryAvatar.jpg';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tag, Tooltip, Modal, Input, Select } from 'antd';
import Icon,{ EyeOutlined, SyncOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
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
    const [groupedAssociations, setGroupedAssociations] = useState([]);
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
                getPetsByTutorId(profile.tutor.id)
                    .then(pets => {
                        setCompleteTemporalAssociation(temporalAsociation);
                        setPetOptions(generatePetOptions(pets));
                    });
            })
            .catch(error => {
                message.error(error.response.data);
            });
    };


    const createAssociation = () => {
        const petAssociations = [];
        selectedPetIds.forEach( petId => {
            petAssociations.push({petId: Number(petId), veterinaryId: completeTemporalAssociation.veterinaryData.veterinary.id})
        });
        register(petAssociations)
            .then(response => {
                message.success('Asociación establecida exitosamente');
                refreshComponent();
            });
    }

    function refreshComponent() {
        getAllByTutorId(profile.tutor.id)
            .then(associations => {
                let groupedAssociations = [];
                associations.forEach(association => {
                    const associationsFilterByEachTandV = associations.filter( as => as.tutorData.tutor.id === association.tutorData.tutor.id && as.veterinaryData.veterinary.id === association.veterinaryData.veterinary.id);
                    const petList = associationsFilterByEachTandV.map(as => as.pet);
                    if(!groupedAssociations.find(as => as.tutorData.tutor.id === association.tutorData.tutor.id && as.veterinaryData.veterinary.id === association.veterinaryData.veterinary.id)){
                        groupedAssociations.push({veterinaryData: association.veterinaryData, tutorData: association.tutorData, pets: petList});
                    }
                })
                setGroupedAssociations(groupedAssociations);
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
        groupedAssociations.forEach(association => {
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
                                        <Icon><SyncDisabledOutlinedIcon key="delete" /></Icon>
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
                    <Title className='appTitle'>Veterinarios Asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<SyncOutlined/>} onClick={showModal}/>
                    </Tooltip>
                </Col>
            </Row>           

            <Divider></Divider>

            <Row>
                {
                groupedAssociations.length ? 
                returnAssociationCards()
                :
                <>Aún no existen veterinarios asociados</>
                }
            </Row>

            <Modal  title="Asociarse con un veterinario"
                    visible={isModalOpen}
                    onCancel={hideModal}
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
                            <Row>
                                <Typography.Title level={5}>Seleccione que mascotas quiere asociar con el siguiente veterinario:</Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Title level={6}>Profesional: {completeTemporalAssociation.veterinaryData.person.name + ' ' + completeTemporalAssociation.veterinaryData.person.lastName}</Typography.Title>   

                             </Row>
                              <Row>
                                <Typography.Title level={6}>Clínica: -</Typography.Title>   

                             </Row>
                            <Row>
                                <Col span={24}>
                                    <Select
                                      mode="multiple"
                                      allowClear
                                      style={{ width: '100%' }}
                                      placeholder="Seleccione las mascotas a asociar"
                                      onChange={refreshSelectedPets}
                                      >
                                      {petOptions}
                                  </Select>
                                </Col>
                                
                            </Row>
                        </>
                        :
                        <>  
                            <Row>
                                <Typography.Title level={5}>Ingrese código de asociacion brindado por el veterinario:</Typography.Title>
                            </Row>
                            <Row>
                                <Input type="number" name="phone" placeholder="Código de asociacion"  onChange={refreshCode}/>
                            </Row>    
                        </>
                }
            </Modal>
            
        </>
    );
};

