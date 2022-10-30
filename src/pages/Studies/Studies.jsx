import React, {useState} from "react";
import { Col, Row, Button, Tooltip,Modal, Typography, Divider, Table, Select,DatePicker, Input } from 'antd';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import {EyeOutlined, DownloadOutlined} from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;
const {Option} = Select;

export default function Studies(){
    var tutor = false;
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(profile.tutor != null){
        tutor= true;
    };

    
    const columns = [
        {
            title: 'Número',
            dataIndex: 'nro',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.nro - b.nro,
            
        },{
            title: 'Fecha',
            dataIndex: 'date',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.date - b.date,
            
        },
        {
            title: 'Mascota',
            dataIndex: 'pet',
            sorter: (a, b) => a.pet.length - b.pet.length
        },
        {
            title: 'Veterinario',
            dataIndex: 'veterinary',
            sorter: (a, b) => a.veterinary.length - b.veterinary.length,
            responsive: ['sm']
        },
        {
            title: 'Laboratorio',
            dataIndex: 'lab',
            sorter: (a, b) => a.lab.length - b.lab.length,
            responsive: ['sm']
        },
        {
            title: 'Estudio',
            dataIndex: 'study',
            sorter: (a, b) => a.study.length - b.study.length,
            responsive: ['sm']
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            responsive: ['md'],
            render: (_, record) => (
                <>
                <Tooltip placement='top' title="Ver"><Button type='link' className='appTableButton' icon={<EyeOutlined />}></Button></Tooltip>

                <Tooltip placement='top' title="Descargar"><Button type='link' className='appTableButton' icon={<DownloadOutlined />}></Button></Tooltip>
                </>),
            
        }
    ];
    const data = [
        {
            key: '1',
            nro: 1,
            date: '13/01/2020',
            pet: 'Malu',
            veterinary: 'Eugenia Frattin',
            lab: 'Lasse',
            study: 'Ecografía',
        },{
            key: '2',
            nro: 2,
            date: '24/11/2019',
            pet: 'Malu',
            veterinary: 'Eugenia Frattin',
            lab: 'Particular',
            study: 'Radiografía',
        },{
            key: '3',
            nro: 3,
            date: '11/05/2019',
            pet: 'Lola',
            veterinary: 'Eugenia Frattin',
            lab: 'Ernesto Casas',
            study: 'Hemoglobina',
        },{
            key: '4',
            nro: 4,
            date: '13/09/2009',
            pet: 'Lola',
            veterinary: 'Pepe Jose',
            lab: 'OultonPets',
            study: 'Rayos X',
        },
        

    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    
    const disabledDate =(current) =>{
        return current && current> moment().endOf('day');
    };

    const showStudies = () =>{
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        
        setIsModalOpen(false);
    };
    const algo= () =>{
        return 'Hola'
    };
    return (<>
        <Row align="middle">
            <Col span={23}>
                <Title className='appTitle'>Gestión de Estudios Complementarios</Title>
            </Col>
            {
                tutor ?
                null
                :
                <Col span={1}>
                    <Tooltip title="Agregar Estudio Complementario" placement='right'>
                        <Button type='link' className="appButton" size='large'  icon={<BiotechOutlinedIcon/>} onClick={showStudies}/>
                    </Tooltip>
                </Col>
            }                
        </Row>
        <Divider orientation="left">Filtros</Divider>
        <Row gutter={[16, 16]}>
            <Col className="gutter-row" xs={{span:24}} md={{span:4}}>
                <Input placeholder="Número de estudio" />
            </Col>
            <Col className="gutter-row" xs={{span:24}} md={{span:6}}>
            <DatePicker disabledDate={disabledDate} name="date" placeholder="Fecha de estudio" className="appDatePicker" format={'DD/MM/yyyy'} />
            </Col>
            <Col className="gutter-row" xs={{span:24}} md={{span:7}}>
                <Input placeholder="Mascota" />
            </Col>
            <Col className="gutter-row" xs={{span:24}} md={{span:7}}>
                <Input placeholder="Veterinario" />
            </Col>
            <Col className="gutter-row" xs={{span:12}} md={{span:12}}>
                <Input placeholder='Laboratorio' />
            </Col>
            <Col className="gutter-row" xs={{span:12}} md={{span:12}}>
                <Select placeholder="Estudios" showSearch mode="multiple" className="select-before full-width">
                    <Option value="1">Radiografía</Option>
                    <Option value="2">Rayos X</Option>
                    <Option value="3">Particular</Option>
                    <Option value="4">Ecografía</Option>
                </Select>
            </Col>
            
        </Row>
        <Divider orientation="left"></Divider>
        <Table columns={columns} dataSource={data} onChange={onChange} />
        <Modal title='Pedido de Estudios Complementarios'             
                visible={isModalOpen} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" >
                        Generar
                    </Button>,
                ]}>
                
            <Row>
                <Title level={5}>Ingrese DNI del tutor:</Title>
            </Row>
            <Row>
                <Col span={24}>
                    <Input.Search type="number" placeholder="DNI" allowClear onSearch={algo} />
                </Col>
            </Row><Row>
                <Title level={5}>Seleccione la mascota a la que desea generar el pedido:</Title>
            </Row>
            <Row>
                <Col span={24}>
                    <Select placeholder='Mascota'
                            allowClear
                            showSearch
                            className="select-before full-width"
                            style={{ width: '100%' }} > 
                    <Option value="1">Malu</Option>
                    <Option value="2">Lola</Option>
                    <Option value="3">Wendy</Option>
                    <Option value="4">Lima</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Title level={5}>Tipo de Estudio Complementario:</Title>
            </Row>
            <Row>
                <Col span={24}>
                    <Select placeholder='Estudios'
                            allowClear
                            showSearch
                            className="select-before full-width"
                            style={{ width: '100%' }} > 
                    <Option value="Radiografia">Radiografia</Option>
                    <Option value="Rayos">Rayos X</Option>
                    <Option value="Particular">Particular</Option>
                    <Option value="Ecografia">Ecografia</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Title level={5}>Observaciones:</Title>
            </Row>
            <Row>
                <Col span={24}>
                <Input.TextArea
                    showCount
                    allowClear
                    maxLength={500}
                    placeholder='Ingrese observacion...'
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    
                />
                </Col>
            </Row>

        </Modal>
        
        
    </>)
}