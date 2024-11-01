import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Divider,
  Typography,
  DatePicker,
  Input,
  Select,
  Button,
  Tooltip,
} from "antd";
import RingChart from "../../components/RingChart";
import Top5Chart from '../../components/Top5Chart';
import LineChart from "../../components/LineChart";
import WeightEvolutionChart from "../../components/WeightEvolutionChart";
import VetVisitsKPI from "../../components/VetVisitsKPI";
import locale from "antd/lib/date-picker/locale/es_ES";
import moment from "moment";
import '../Settings/UserSettings/UserSettings.scss';

const { Title } = Typography;
const { Option } = Select;

function Reports() {

    const profile = JSON.parse(sessionStorage.getItem('profile'));

    const currentYear = new Date().getFullYear(); // Obtener el año actual

    const chartStyle = { height: '400px' }; // Establecer una altura fija

    const mascotasData = [
        { name: 'Perros', percentage: 50 },
        { name: 'Gatos', percentage: 30 },
        { name: 'Caballos', percentage: 20 },
        { name: 'Conejos', percentage: 5 },
        { name: 'Otros', percentage: 5 },
    ];

    const disabledDate = (current) => {
        return current && current > moment().endOf("day");
    };

    const Diagnosticos = [
        { name: 'Infección', count: 110 },
        { name: 'Alergia', count: 98 },
        { name: 'Parásitos', count: 85 },
        { name: 'Fractura', count: 65 },
        { name: 'Obesidad', count: 50 },
    ];

     const monthlyData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        values: [30, 45, 50, 58, 70, 80, 90, 120, 110, 89, 0, 0], // Datos para cada mes
    };

    const weightData = {
        labels: ['2023-01-01', '2023-09-21', '2024-03-01', '2024-05-12', '2024-06-01', '2024-10-31'],
        datasets: [
        {
            label: 'Olivia',
            data: [20, 23.2, 30], // Pesos en kg
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.1,
        },
        {
            label: 'Duki',
            data: [3.0, 4.5, 10, 8.2, 9.5, 10], // Pesos en kg
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.1,
        },
        ],
    };

  // Datos de visitas a la veterinaria por mascota
    const visitasData = [
        { mascota: 'Olivia', fecha: '2024-01-15' },
        { mascota: 'Olivia', fecha: '2024-03-22' },
        { mascota: 'Duki', fecha: '2024-02-10' },
        { mascota: 'Duki', fecha: '2024-04-05' },
        { mascota: 'Duki', fecha: '2024-06-18' },
        { mascota: 'Duki', fecha: '2024-09-30' },
    ];

  // Filtrar visitas del año actual y contar por mascota
    const visitasPorMascota = visitasData.reduce((acc, visita) => {
        const year = new Date(visita.fecha).getFullYear();
        if (year === currentYear) {
            if (!acc[visita.mascota]) {
                acc[visita.mascota] = 0;
             }
        acc[visita.mascota]++;
        }
     return acc;
    }, {});

    const Medicamentos = [
        { name: 'Para garrapata', count: 85 },
        { name: 'Bayaspirina', count: 30 },
        { name: 'Omeprazol', count: 5 },
    ];

    const renderFilters = () => {
        if (profile.veterinary) {
          return (
            <>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <Select
                  placeholder="Especie"
                  showSearch
                  mode="multiple"
                  className="select-before full-width"
                >
                  <Option value="1">Perro</Option>
                  <Option value="2">Gato</Option>
                  <Option value="3">Conejo</Option>
                  <Option value="4">Caballos</Option>
                </Select>
              </Col>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <DatePicker
                  locale={locale}
                  disabledDate={disabledDate}
                  name="date"
                  placeholder="Fecha desde"
                  className="appDatePicker"
                  format={"DD/MM/yyyy"}
                />
              </Col>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <DatePicker
                  locale={locale}
                  disabledDate={disabledDate}
                  name="date"
                  placeholder="Fecha hasta"
                  className="appDatePicker"
                  format={"DD/MM/yyyy"}
                />
              </Col>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <Input placeholder="Tutor" />
              </Col>
            </>
          );
        } else if (profile.tutor) {
          return (
            <>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <DatePicker
                  locale={locale}
                  disabledDate={disabledDate}
                  name="date"
                  placeholder="Fecha desde"
                  className="appDatePicker"
                  format={"DD/MM/yyyy"}
                />
              </Col>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <DatePicker
                  locale={locale}
                  disabledDate={disabledDate}
                  name="date"
                  placeholder="Fecha hasta"
                  className="appDatePicker"
                  format={"DD/MM/yyyy"}
                />
              </Col>
              <Col className="gutter-row" xs={{ span: 5 }} md={{ span: 5 }}>
                <Select
                  placeholder="Mascota"
                  showSearch
                  mode="multiple"
                  className="select-before full-width"
                >
                  <Option value="Olivia">Olivia</Option>
                  <Option value="Duki">Duki</Option>
                  {/* Agrega más opciones según tus datos */}
                </Select>
              </Col>
            </>
          );
        }
        // Puedes agregar más condiciones para otros perfiles aquí
      };

      const renderContent = () => {
        if (profile.veterinary) {
          return (
            <>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}> Porcentaje total de mascotas atendidas
                </h1>
                <div style={chartStyle}>
                  <RingChart data={mascotasData} />
                </div>
              </Col>
    
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}> Top 5 diagnósticos
                </h1>
                <div style={chartStyle}>
                  <Top5Chart data={Diagnosticos} />
                </div>
              </Col>
    
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <div style={{ height: '600px' }}> {/* Ajusta la altura aquí */}
                  <LineChart data={monthlyData} title={`Visitas Mensuales en el Año ${currentYear}`} />
                </div>
              </Col>
            </>
          );
        } else if (profile.tutor) {
          return (
            <>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <div style={{ height: '600px' }}>
                  <WeightEvolutionChart data={weightData} title="Evolución del Peso de las Mascotas (en KG)" />
                </div>
              </Col>
    
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <div style={{ height: '200px' }}>
                  <VetVisitsKPI visits={visitasPorMascota} />
                </div>
              </Col>
    
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}> Medicamentos Administrados
                </h1>
                <div style={chartStyle}>
                <Top5Chart data={Medicamentos} />
                </div>
              </Col>
            </>
          );
        }
        // Puedes agregar más condiciones para otros perfiles aquí
      };
    
      return (
        <>
          <Row align="middle">
            <Col span={24}>
              <Title className="appTitle">Reportes</Title>
            </Col>
          </Row>
    
          <Divider orientation="left">Filtros</Divider>
        
          <Row gutter={[16, 16]}>
            {renderFilters()}
            <Col className='buttom'>
              <Tooltip title="Filtrar">
                <Button
                  shape="circle"
                  //onClick={aca deberia ir una funcion de aplicar los filtros}
                  key={2}
                  type="primary"
                >
                  <CheckCircleOutlined />
                </Button>
              </Tooltip>
            </Col>
            <Col className='buttom'>
              <Tooltip title="Quitar filtros">
                <Button
                  shape="circle"
                  //onClick={aca deberia ir una funcion de borrar los filtros}
                  key={2}
                  type="primary"
                >
                  <CloseCircleOutlined />
                </Button>
              </Tooltip>
            </Col>
          </Row>
          <Divider orientation="left"></Divider>
    
          <Row gutter={[16, 16]}>
            {renderContent()}
          </Row>
        </>
      );
    }
    
    export default Reports;






