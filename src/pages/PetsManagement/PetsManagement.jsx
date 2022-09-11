import React, {useState} from 'react';
import { Table, Button, Col, Row, Divider, Input, Select, Typography, Tooltip, Modal } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Title } = Typography;

export default function PetsManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(false);

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
                    <div>Ingrese el ID de la mascota a asociar</div>
                    <Input type="number" name="phone" placeholder="ID de Mascóta"/>
                </>
                }
            </Modal>
        </>
    );
};

