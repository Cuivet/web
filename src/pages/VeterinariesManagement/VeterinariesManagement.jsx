import React, {useState} from 'react';
import { Table, Button, Col, Row, Divider, Input, Select, Typography, Tooltip, Modal } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
import SyncDisabledOutlinedIcon from '@mui/icons-material/SyncDisabledOutlined';
const { Option } = Select;
const { Title } = Typography;

export default function VeterinariesManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);

    const regent=['Si', 'No'];
    const columns = [
        {
            title: 'Matrícula Profesional',
            dataIndex: 'mp',
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
            title: 'Clínica Veterinaria',
            dataIndex: 'veterinary',
            sorter: (a, b) => a.veterinary.length - b.veterinary.length,
            responsive: ['md']
        },
        {
            title: 'Regente',
            dataIndex: 'regent',
            sorter: (a, b) => a.regent.length - b.regent.length,
            responsive: ['md']
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
    const data = [
        {
            key: '1',
            mp: '3029',
            name: 'Eugenia',
            lastName: 'Frattin',
            phone: 3513026921,
            veterinary: 'NeoZoo',
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
            veterinary: 'Pecos',
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
            veterinary: 'NeoZoo',
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
            veterinary: 'Alem',
            regent: regent[1],
            actions: (regent[1] === 'Si') ? (<Tooltip placement='top' title="Desvincular"><Button type='link' className='appTableButton' icon={<SyncDisabledOutlinedIcon></SyncDisabledOutlinedIcon>}></Button></Tooltip>) : null,
            address: 'Bv. Los Granaderos 2075',
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const generateCode = () => {
        setGeneratedCode(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
        setGeneratedCode(false);
    };

    return (
        <>   
            <Row align="middle">
                <Col xs={{span:24}} md={{span:23}}>
                    <Title className='appTitle'>Mis Veterinarios en Clinicas</Title>
                </Col>
                <Col xs={{span:24}} md={{span:1}}>
                    <Tooltip title="Asociar Veterinario Regente" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>} onClick={showModal}/>
                    </Tooltip>
                </Col>
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
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Select placeholder="Regente" showSearch className="select-before full-width">
                        <Option value="Si">Si</Option>
                        <Option value="No">No</Option>
                    </Select>
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Input placeholder='Telefono' />
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:8}}>
                    <Input placeholder='Dirección' />
                </Col>
            </Row>
            
            <Divider orientation="left"></Divider>
            <Table columns={columns} dataSource={data} scroll={{x:500,}} onChange={onChange} />
            <Modal  title="Generar código de asociacion con Veterinario Regente"
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
                            <Button htmlType="submit" type="primary" onClick={generateCode} className="register-form_button-ok-modal" > 
                                Generar
                            </Button>
                            }
                        </>
                    ]}>
                {
                generatedCode ?
                <div>El código generado es '20202461'. El mismo expirará en 10 minutos</div>
                :
                <>
                    <div>Ingrese la matricula del Veterinario a asociar</div>
                    <Input type="number" name="mp" placeholder="M.P. Veterinario"/>
                </>
                }
            </Modal>
        </>
    );
};

