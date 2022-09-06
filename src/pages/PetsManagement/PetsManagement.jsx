import React from 'react';
import './PetsManagement.scss';
import { Table } from 'antd';
import { Button } from 'antd';
import { Col, Row, Divider } from 'antd';
import { Input } from 'antd';
import { Select, Typography } from 'antd';
const { Option } = Select;
const { Title } = Typography;
export default function PetsManagement(){

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

    const data = [
        {
            key: '1',
            id: '1',
            name: 'Lima',
            tutorName: 'Tomás Bardin',
            dni: 40402461,
            especie: 'Perro',
            raza: 'Golden Retriever',
        },
        {
            key: '2',
            id: '2',
            name: 'Fufi',
            tutorName: 'Tomás Bardin',
            dni: 40402461,
            especie: 'Gato',
            raza: 'Sin raza',
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>   
            <Row align="middle">
                <Col xs={{span:24}} md={{span:14}}>
                    <Title className='pets__title'>Mis pacientes asociados</Title>
                </Col>
                <Col xs={{span:24}} md={{span:10}}>
                    <Button className='appButton' type="primary">Asociar nueva mascota</Button>
                </Col>
            </Row>

            <Row>
                <Divider orientation="left">Filtros</Divider>
            </Row>
            
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
        </>
    );
};

