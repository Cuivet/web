import React from 'react';
import { Table, Button, Col, Row, Divider, Input, Select, Typography, Tooltip } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title } = Typography;

export default function VeterinariesManagement(){

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
            title: 'Dirección',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            responsive: ['md']
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
            address: 'Rodríguez del Busto 4086',
        },
        {
            key: '2',
            mp: '2041',
            name: 'Jorge Ignacio',
            lastName: 'Barbará',
            phone: 3513020874,
            veterinary: 'Pecos',
            address: 'Arturo M. Bas 345',
        },
        {
            key: '3',
            mp: '1098',
            name: 'Juan',
            lastName: 'Barella',
            phone: 351739744,
            veterinary: 'NeoZoo',
            address: 'Av. Rafael Núñez 4126',
        },
        {
            key: '4',
            mp: '2270',
            name: 'Martina',
            lastName: 'Aresu',
            phone: 3515521098,
            veterinary: 'Alem',
            address: 'Bv. Los Granaderos 2075',
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>   
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Mis Veterinarios</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Nuevo Veterinario" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<NodeIndexOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>

            <Divider orientation="left">Filtros</Divider>
            
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="M.P. del veterinario..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Nombre..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Apellido..." />
                </Col>
                <Col className="gutter-row" xs={{span:24}} md={{span:8}}>
                    <Input placeholder="Clínica Veterinaria..." />
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Select defaultValue="http://" className="select-before full-width">
                        <Option value="http://">NeoZoo</Option>
                        <Option value="http://">Chocos</Option>
                        <Option value="https://">Pecos</Option>
                    </Select>
                </Col>
                <Col className="gutter-row" xs={{span:12}} md={{span:4}}>
                    <Select defaultValue="http://" className="select-before full-width">
                        <Option value="http://">Regente</Option>
                        <Option value="http://">No Regente</Option>
                        <Option value="https://">Gato</Option>
                    </Select>
                </Col>
            </Row>
            
            <Divider orientation="left"></Divider>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

