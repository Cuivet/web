import React, {useState} from 'react';
import { Table, Button, Col, Row, Divider, Input, Select, Typography, Tooltip, Modal, Spin } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
import {getVetsByVetOwnerId, registerTemporalAssociation} from '../../services/vet.service';
const { Option } = Select;
const { Title } = Typography;


export default function VeterinariesManagement(){
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    const [isInit, setIsInit] = useState(false);
    const [isModalVetOwner, setisModalVetOwner] = useState(false);
    const [isModalRegent, setIsModalRegent]= useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);
    const [isRegent, setIsRegent] = useState(false);
    const [vetOptions, setVetOptions] = useState(null);
    const [selectedVetId, setSelectedVetId] = useState([]);
    const [mp, setMP] = useState(null);
    const [completeTemporalAssociation, setCompleteTemporalAssociation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    if(!isInit){
        refreshComponent();
        setIsInit(true);
    }

    function generateVetOptions(vets) {
        var renderVetOptions = [];
        vets.forEach(function eachVet(vet){
            renderVetOptions.push(<Option key={vet.vet.id}>{vet.vet.name}</Option>)
        });
        return renderVetOptions;
    }

    function refreshComponent() {
        getVetsByVetOwnerId(profile.vetOwner.id)
            .then(vets => {
                setVetOptions(generateVetOptions(vets));
                generateData(vets);
            }
        );
        setVetOptions(null);
        setSelectedVetId([]);
        setIsModalOpen(false);
        setGeneratedCode(false);
        setMP(null);
        setCompleteTemporalAssociation(null);
        setIsLoading(false);
    }

    function generateData(vets){
        var finalData = [];
        vets.forEach(vet => {
            if (vet.veterinaryData === null) {
                return
            }
            finalData.push(
                {
                    key: vet.vet.id,
                    matricula: vet.veterinaryData.veterinary.mp,
                    name: vet.veterinaryData.person.name,
                    lastName: vet.veterinaryData.person.lastName,
                    phone:vet.veterinaryData.person.phone,
                    vet: vet.vet.name,
                    regent: regent[0],
                    actions: (regent[0] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,            
                    id: vet.vet.id,
                    address: vet.vet.address,
                }
            )
        })
        setData(finalData);
    }

    const refreshSelectedVets = (value) => {
        setSelectedVetId(value);
    };
    useEffect(() =>{
        if(profile.veterinary != null){
            setIsRegent(true);
        }
    },[profile.veterinary]);

    const regent=['Si', 'No'];

    const columns = [
        {
            title: 'Matrícula Profesional',
            dataIndex: 'matricula',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.mp - b.mp,
            
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Apellido',
            dataIndex: 'lastName',
            sorter: (a, b) => a.lastName.length - b.lastName.length,
            responsive: ['sm']
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            //sorter: (a, b) => a.phone.age - b.phone.age,
            responsive: ['sm']
        },        
        {
            title: 'Dirección',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            responsive: ['md']
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            responsive: ['md'],
            
        }
    ];
      
    if(!isRegent){
        columns.splice(4,0, {
            title: 'Regente',
            dataIndex: 'regent',
            sorter: (a, b) => a.regent - b.regent,
            responsive: ['md']
        },
        {
            title: 'Clínica Veterinaria',
            dataIndex: 'vet',
            sorter: (a, b) => a.vet.length - b.vet.length,
            responsive: ['md']
        });
    };
    

    const data = [
        {
            key: '1',
            mp: '3029',
            name: 'Eugenia',
            lastName: 'Frattin',
            phone: 3513026921,
            vet: 'NeoZoo',
            regent: regent[0],
            //en la condicion deberia ir lo que trae el back
            actions: (regent[0] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,            
            address: 'Rodríguez del Busto 4086',
        },
        {
            key: '2',
            mp: '2041',
            name: 'Jorge Ignacio',
            lastName: 'Barbará',
            phone: 3513020874,
            vet: 'Pecos',
            regent: regent[1],
            address: 'Arturo M. Bas 345',
            actions: (regent[1] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,
        },
        {
            key: '3',
            mp: '1098',
            name: 'Juan',
            lastName: 'Barella',
            phone: 351739744,
            vet: 'NeoZoo',
            regent: regent[0],
            actions: (regent[0] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,
            address: 'Av. Rafael Núñez 4126',
        },
        {
            key: '4',
            mp: '2270',
            name: 'Martina',
            lastName: 'Aresu',
            phone: 3515521098,
            vet: 'Alem',
            regent: regent[1],
            actions: (regent[1] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,
            address: 'Bv. Los Granaderos 2075',
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const showModalOwner = () => {
        setisModalVetOwner(true);
    };
    const showModalRegent = () => {
        setIsModalRegent(true);
    }
    
    const generateCode = () => {
        setIsLoading(true);
        registerTemporalAssociation({mp: mp, vetId: selectedVetId})
            .then(response => {
                setCompleteTemporalAssociation(response);
                setIsLoading(false);
                setGeneratedCode(true);
            });
    }; 

    const hideModal = () => {
        setisModalVetOwner(false);
        setGeneratedCode(false);
        setIsModalRegent(false);
    };

    const refreshMP = e =>{
        setMP(e.target.value);
    };

    return (
        <>   
            <Row align="middle">
                {
                    isRegent ?
                    <>
                        <Col xs={{span:24}} md={{span:23}}>
                            <Title className='appTitle'>Gestion de Veterinarios</Title>
                        </Col>
                        <Col xs={{span:24}} md={{span:1}}>
                            <Tooltip title="Asociar Co-Veterinarios" placement='right'>
                                <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModalRegent}/>
                            </Tooltip>
                        </Col>
                    </>
                    :
                    <>
                        <Col xs={{span:24}} md={{span:23}}>
                            <Title className='appTitle'>Gestion de Veterinarios en Clinicas</Title>
                        </Col>
                        <Col xs={{span:24}} md={{span:1}}>
                            <Tooltip title="Asociar Veterinario Regente" placement='right'>
                                <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModalOwner}/>
                            </Tooltip>
                        </Col>
                    </>
                }    
            </Row>
            <Divider orientation="left">Filtros</Divider>
            
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="M.P. del veterinario" />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Nombre" />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Apellido" />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Select placeholder="Clinica Veterinaria" showSearch className="select-before full-width">
                        <Option value="NeoZoo">NeoZoo</Option>
                        <Option value="Chocos">Chocos</Option>
                        <Option value="Pecos">Pecos</Option>
                    </Select>
                </Col>
                {
                    isRegent ?
                    <>
                        <Col className="gutter-row" xs={{span:12}} md={{span:8}}>
                            <Input placeholder='Telefono' />
                        </Col>
                    </>
                    :
                    <>
                        <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                            <Select placeholder="Regente" showSearch className="select-before full-width">
                                <Option value="Si">Si</Option>
                                <Option value="No">No</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                            <Input placeholder='Telefono' />
                        </Col>
                    </>
                }
                
                <Col className="gutter-row" xs={{span:12}} md={{span:8}}>
                    <Input placeholder='Dirección' />
                </Col>
            </Row>
            
            <Divider orientation="left"></Divider>
            <Table columns={columns} dataSource={data} onChange={onChange} />
            <Modal  title="Generar código de asociacion con Veterinario Regente"
                    visible={isModalVetOwner}
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
                            <Button htmlType="submit" type="primary" onClick={generateCode} className="register-form_button-ok-modal" > 
                                Generar
                            </Button>
                            }
                        </>
                    ]}>
                {
                generatedCode ?
                <><Row>
                        <Col span={24}>
                            <Typography.Title level={4}>
                                El código generado es:
                            </Typography.Title>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Typography.Title style={{display:'flex', justifyContent:'center'}} copyable={{tooltips:['click para copiar', 'codigo copiado']}}>20202461</Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>El mismo expirará en 10 minutos</>
                :
                <>
                    <div>Ingrese la matricula del Veterinario a asociar</div>
                    <Input type="number" name="mp" placeholder="M.P. Veterinario"/>
                </>
                }
            </Modal>
            <Modal  title="Generar código de asociacion con el Co-Veterinario"
                    visible={isModalRegent}
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
                            <Button htmlType="submit" type="primary" onClick={generateCode} className="register-form_button-ok-modal"  disabled={isLoading} > 
                                Generar
                            </Button>
                            }
                        </>
                    ]}>
                {
                generatedCode ?

                <><Row>
                        <Col span={24}>
                            <Typography.Title level={4}>
                                El código generado para {completeTemporalAssociation.veterinaryData.person.name} {completeTemporalAssociation.veterinaryData.person.lastName} MP: {completeTemporalAssociation.veterinaryData.veterinary.mp} es:
                            </Typography.Title>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Typography.Title style={{display:'flex', justifyContent:'center'}} copyable={{tooltips:['Click para copiar código', 'Código copiado']}}>
                            {completeTemporalAssociation.code}
                            </Typography.Title>                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>El mismo expirará en 10 minutos</>

                :
                <>  
                    {
                    isLoading ?
                    <Spin />
                    :
                    <>  
                        <Row>
                            <Col span={24}>
                                <div>Ingrese la MP del Veterinario Regente a asociar</div>
                                <Input type="number" name="mp" placeholder="M.P. Veterinario" onChange={refreshMP}/>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={24}>
                                <div>Seleccione con que clínica veterinaria desea asociarlo</div>
                                <Select
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Clínicas Veteriarias"
                                    onChange={refreshSelectedVets}
                                    >
                                    {vetOptions}
                                </Select>
                            </Col>
                        </Row>
                    </>
                    }
                </>
                }
            </Modal>
        </>
    );
};

