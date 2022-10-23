//MARTINA
import React, { useState } from 'react';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tooltip, Modal, Input } from 'antd';
import Icon,{SyncOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import vett from '../../assets/img/jpg/vet.jpg';
import {getTemporalAssociationByCode, registerRegentOnVet, getAllByRegentId} from '../../services/vet.service';
import {veterinaryAssociationService} from '../../services/veterinary_association.service'
const { Title } = Typography;
export default function VetsAssociations(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);
    const [completeTemporalAssociation, setCompleteTemporalAssociation] = useState(null);
    const [regentAssociations, setRegentAssociations] = useState([]);
    const [veterinaryAssociations, setVeterinaryAssociations] = useState([]);
    const [isInit, setIsInit] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));


    if(!isInit){
        refreshComponent();
        setIsInit(true);
    }

    const confirm = (e) => {
        message.success('Clínica desasociada exitosamente.' );
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setGeneratedCode(null);
        setCompleteTemporalAssociation(null);
    };

    const refreshCode = e =>{
        setGeneratedCode(e.target.value);
    };

    const tryToAsociate = () => {
        if (generatedCode[0]==="V") {
            //TO DO: asociación de veterinario y veterinaria
            veterinaryAssociationService.getTemporalAssociationByCode(generatedCode)
            .then(temporalAsociation => {
                setCompleteTemporalAssociation(temporalAsociation);
            })
            .catch(error => {
                message.error(error.response.data);
            });
        } else{
            getTemporalAssociationByCode(generatedCode)
            .then(temporalAsociation => {
                setCompleteTemporalAssociation(temporalAsociation);
            })
            .catch(error => {
                message.error(error.response.data);
            });
        }
    };

    const createAssociation = () => {
        if (generatedCode[0]==="R") {
            createRegentAssociation();
        } else {
            createVeterinaryAssociation();
        }
    };
    
    const createRegentAssociation = () => {
        const regentAssociation = {
            id: completeTemporalAssociation.vetData.vet.id,
            name: completeTemporalAssociation.vetData.vet.name,
            phone: completeTemporalAssociation.vetData.vet.phone,
            address: completeTemporalAssociation.vetData.vet.address,
            vetOwnerId: completeTemporalAssociation.vetData.vet.vetOwnerId,
            veterinaryId: profile.veterinary.id,
        };
        registerRegentOnVet(regentAssociation)
        .then(response =>{
            message.success('Asociación establecida exitosamente');
            refreshComponent();
        });
    }
    
    const createVeterinaryAssociation = () => {
        const veterinaryAssociations = [];
        const veterinaryAssociation = {
            vetId: completeTemporalAssociation.vetData.vet.id,
            veterinaryId: completeTemporalAssociation.veterinaryData.veterinary.id
        }
        veterinaryAssociations.push(veterinaryAssociation);
        veterinaryAssociationService.register(veterinaryAssociations)
            .then(response => {
                message.success('Asociacion establecida exitosamente');
                refreshComponent();
            });
    }

    function refreshComponent() {
        getAllByRegentId(profile.veterinary.id)
        .then(associations => {
            setRegentAssociations(associations);
        });
        // veterinaryAssociationService.getAllByVeterinaryId(profile.veterinary.id)
        // .then(associations => {
        //     setVeterinaryAssociations(associations)
        // });
        setIsModalOpen(false);
        setGeneratedCode(false);
        setCompleteTemporalAssociation(null);
    }

    function returnRegentAssociationCards(){
        var renderRegentAssociationCards = [];
        regentAssociations.forEach(association => {
            renderRegentAssociationCards.push(
                <Card   className='appCard'
                        hoverable
                        style={{width: 300}}
                        cover={<img alt='required text' src={vett}></img>}
                        actions={[  <EyeOutlined key="edit" />,
                                    <Popconfirm title="¿Está seguro que desea desasociar clínica veterinaria?"  
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
                            title={ association.name }
                            description={'Regente: ' +  profile.person.name + ' ' +  profile.person.lastName + '. MP: ' + profile.veterinary.mp }/>
                    <br></br>
                </Card>
            )
        });
        return renderRegentAssociationCards;
    };


    return (
        <>   
           <Row align="middle">
            <Col span={23}>
                <Title className='appTitle'>Asociación con Clínicas Veterinarias</Title>
            </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Clínica" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<SyncOutlined />} onClick={showModal}/>
                    </Tooltip>
                </Col>         
        </Row>

        <Divider></Divider>

        <Row>
            {
            regentAssociations.length ? 
            returnRegentAssociationCards()
            :
            <>Aún no existen clínicas asociadas</>
            }            
            </Row>
            <Modal  title="Asociarse con una clínica veterinaria"
                    visible={isModalOpen}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <>
                            {
                            completeTemporalAssociation ? 
                            <Button htmlType="submit" type="primary" onClick={createAssociation} className="register-form_button-ok-modal" > 
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
                                <Typography.Title level={6}>Clínica Veterinaria: {completeTemporalAssociation.vetData.vet.name} </Typography.Title>   

                             </Row>
                              <Row>
                                <Typography.Title level={6}>Dirección: {completeTemporalAssociation.vetData.vet.address}</Typography.Title>   

                             </Row>
                        </>
                        :
                        <>  
                            <Row>
                                <Typography.Title level={5}>Ingrese código de asociación:</Typography.Title>
                            </Row>
                            <Row>
                                <Input name="phone" placeholder="Código de asociación"  onChange={refreshCode}/>
                            </Row>    
                        </>
                }
            </Modal>
        </>
    );
};