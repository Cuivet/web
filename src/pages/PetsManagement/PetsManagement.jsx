import React, {useState} from 'react';
import { Table, Button, Col, Row, Divider, Input, Select, Typography, Tooltip, Modal, Spin } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
import { registerTemporalAssociation, getAllByVeterinaryId } from '../../services/pet_association.service';
const { Option } = Select;
const { Title } = Typography;

export default function PetsManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);
    const [tutorDni, setTutorDni] = useState(null);
    const [completeTemporalAssociation, setCompleteTemporalAssociation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isInit, setIsInit] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if(!isInit){
        refreshComponent();
        setIsInit(true);
    }

    function refreshComponent() {
        getAllByVeterinaryId(profile.veterinary.id)
            .then(associations => {
                generateData(associations);
            }
        );
        setIsModalOpen(false);
        setGeneratedCode(false);
        setTutorDni(null);
        setCompleteTemporalAssociation(null);
        setIsLoading(false);
    }
    
    function generateData(associations){
        var finalData = [];
        associations.forEach(association => {
            finalData.push(
                {
                    key: association.pet.id,
                    id: association.pet.id,
                    name: association.pet.name,
                    tutorName: association.tutorData.person.lastName + ' ' + association.tutorData.person.name,
                    dni: association.tutorData.person.dni,
                    especie: 'Perro',
                    raza: 'Sin raza especificada',
                }
            )
        })
        setData(finalData);
    }

    const columns = [
        {
            title: 'ID Mascota',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Nombre Mascota',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Tutor',
            dataIndex: 'tutorName',
            sorter: (a, b) => a.tutorName.length - b.tutorName.length,
            responsive: ['sm']
        },
        {
            title: 'DNI Tutor',
            dataIndex: 'dni',
            sorter: (a, b) => a.address.length - b.address.length,
            responsive: ['sm']
        },
        {
            title: 'Especie',
            dataIndex: 'especie',
            sorter: (a, b) => a.tutorName.length - b.tutorName.length,
            responsive: ['md']
        },
        {
            title: 'Raza',
            dataIndex: 'raza',
            sorter: (a, b) => a.tutorName.length - b.tutorName.length,
            responsive: ['md']
        }
        ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const generateCode = () => {
        setIsLoading(true);
        registerTemporalAssociation({tutorDni: tutorDni, veterinaryId: JSON.parse(sessionStorage.getItem('profile')).veterinary.id})
            .then(response => {
                setCompleteTemporalAssociation(response);
                setIsLoading(false);
                setGeneratedCode(true);
            });
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setGeneratedCode(false);
    };

    const refreshDni = e =>{
        setTutorDni(e.target.value);
    };

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Mis pacientes asociados</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar nueva mascota" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModal}/>
                    </Tooltip>
                </Col>
            </Row>

            <Divider orientation="left">Filtros</Divider>
            
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="ID de la mascota..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Nombre de la mascota..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Nombre del Tutor..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Dni del Tutor..." />
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Select defaultValue="http://" className="select-before full-width">
                        <Option value="http://">Animal</Option>
                        <Option value="http:///">Perro</Option>
                        <Option value="https://">Gato</Option>
                    </Select>
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Select defaultValue="http://" className="select-before full-width">
                        <Option value="http://">Raza</Option>
                        <Option value="http:///">Perro</Option>
                        <Option value="https://">Gato</Option>
                    </Select>
                </Col>
            </Row>
            
            <Divider orientation="left"></Divider>
            <Table columns={columns} dataSource={data} onChange={onChange} />

            <Modal  title="Generar código de asociacion con mascota"
                    visible={isModalOpen}
                    onCancel={hideModal}
                    footer={[
                        <Button type="default" onClick={hideModal} className="register-form__button-cancel-modal" > 
                            Cancelar
                        </Button>,
                        <>
                            {
                            generatedCode ? 
                            <Button htmlType="submit" type="primary" onClick={hideModal} className="register-form_button-ok-modal" > 
                                Aceptar
                            </Button>
                            :
                            <Button htmlType="submit" type="primary" onClick={generateCode} className="register-form_button-ok-modal" disabled={isLoading}> 
                                Generar
                            </Button>
                            }
                        </>
                    ]}>
                {
                generatedCode ?
                    <>
                        <div>
                            El código generado para el tutor {completeTemporalAssociation.tutorData.person.name + ' ' +
                            completeTemporalAssociation.tutorData.person.lastName} es {completeTemporalAssociation.code}.
                        </div>
                        <div>
                            El mismo, expirará en 10 minutos
                        </div>
                    </>
                :
                <>
                    {
                    isLoading ?
                    <Spin/>
                    :
                    <>
                        <div>Ingrese el DNI del tutor con mascota/s a asociar</div>
                        <Input type="number" name="phone" placeholder="DNI del tutor" onChange={refreshDni} />
                    </>
                    }
                </>
                }
            </Modal>
        </>
    );
};

