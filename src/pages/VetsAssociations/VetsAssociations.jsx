import React, { useState } from 'react';
import Meta from "antd/lib/card/Meta";
import { Col, Row, Typography, Button, Divider, Card, Popconfirm, message, Tooltip, Modal, Input } from 'antd';
import Icon,{SyncOutlined, EyeOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import vett from '../../assets/img/jpg/vet.jpg';
import {getTemporalAssociationByCode, registerRegentOnVet, getAllByRegentId} from '../../services/vet.service';

const { Title } = Typography;
export default function VetsAssociations(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);
    const [completeTemporalAssociation, setCompleteTemporalAssociation] = useState(null);
    const [associations, setAssociations] = useState([]);
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
        setGeneratedCode('R' + e.target.value);
    };

    const tryToAsociate = () => {
        getTemporalAssociationByCode(generatedCode)
            .then(temporalAsociation => {
                setCompleteTemporalAssociation(temporalAsociation);
            });
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

    function refreshComponent() {
        getAllByRegentId(profile.veterinary.id)
            .then(associations => {
                setAssociations(associations);
            }
        );
        setIsModalOpen(false);
        setGeneratedCode(false);
        setCompleteTemporalAssociation(null);
    }

    function returnAssociationCards(){
        var renderAssociationCards = [];
        associations.forEach(association => {
            renderAssociationCards.push(
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
        return renderAssociationCards;
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
            associations.length ? 
            returnAssociationCards()
            :
            <>Aún no existen clínicas asociadas</>
            }
            </Row>
            <Modal  title="Asociarse con una clínica veterinaria como Veterinario Regente"
                    visible={isModalOpen}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <>
                            {
                            completeTemporalAssociation ? 
                            <Button htmlType="submit" type="primary" onClick={createRegentAssociation} className="register-form_button-ok-modal" > 
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
                                <Typography.Title level={5}>Ingrese código de asociación brindado por el propietario de la clínica veterinaria:</Typography.Title>
                            </Row>
                            <Row>
                                <Input addonBefore="R" type="number" name="phone" placeholder="Código de asociación"  onChange={refreshCode}/>
                            </Row>    
                        </>
                }
            </Modal>
        </>
    );
};