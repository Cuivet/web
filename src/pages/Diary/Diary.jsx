import React from "react";
import { Calendar, Badge, Row, Col, Typography,Divider, ConfigProvider } from 'antd';
// import moment from 'moment';
import 'moment/locale/es';
import esES from 'antd/es/locale/es_ES';

import './Diary.scss';

const {Title} = Typography;

export default function Diary(){

    const appointments = {
        start: ['30/8/2022','27/8/2022','2/9/2022','1/9/2022', '13/9/2022','31/9/2022','5/10/2022'],
        description: ['Primer recordatorio', 'Cirugia','Cita con Eugenia','Castracion','Control post-operacion','Castracion','Control post-operacion'],
        type: ['reminder', 'reminder','appointment', 'appointment','reminder', 'appointment','reminder']
    };

    const getListData = (value) => {
        let listData = [];
        //armo la fecha de todo el calendario
        var date = value.date()+'/'+value.month()+'/'+value.year();
        // console.log(date);
        //empiezo a recorrer los appointment que traigo de ese user
        for(let i in appointments.start){
            
            if(appointments.start[i] === date){
                // console.log(appointments.start[i]+ ' mi fecha');
                // console.log(date+ ' la que compara');
                listData = [{content: appointments.description[i], color: ( appointments.type[i] === 'reminder') ? 'lime' : 'purple'}];
                // listData.push({content: appointments.description[i], color: ( appointments.type[i] === 'reminder') ? 'lime' : 'purple'});
            };
        };
        // switch (value.date()) {
        //     case 1:
        //       listData = [
        //         {
        //           type: 'primary',
        //           content: 'Cita con Eugenia.',
        //           color: 'purple'
        //         },
        //         {
        //           type: 'default',
        //           content: 'Tomar medicamentos.',
        //         },
        //       ];
        //       break;
        //     case 8:
        //       listData = [
        //         {
        //           type: 'warning',
        //           content: 'This is warning event.',
        //         },
        //         {
        //           type: 'success',
        //           content: 'This is usual event.',
        //         },
        //       ];
        //       break;
        
        //     case 10:
        //       listData = [
        //         {
        //           type: 'warning',
        //           content: 'This is warning event.',
        //         },
        //         {
        //           type: 'success',
        //           content: 'This is usual event.',
        //         },
        //         {
        //           type: 'error',
        //           content: 'This is error event.',
        //         },
        //       ];
        //       break;
        
        //     case 15:
        //       listData = [
        //         {
        //           type: 'warning',
        //           content: 'This is warning event',
        //         },
        //         {
        //           type: 'success',
        //           content: 'This is very long usual event。。....',
        //         },
        //         {
        //           type: 'error',
        //           content: 'This is error event 1.',
        //         },
        //         {
        //           type: 'error',
        //           content: 'This is error event 2.',
        //         },
        //         {
        //           type: 'error',
        //           content: 'This is error event 3.',
        //         },
        //         {
        //           type: 'error',
        //           content: 'This is error event 4.',
        //         },
        //       ];
        //       break;
        
        //     default:
        //   }
        
        return listData || [];         
    
    }
// me esta tirando las fechas un mes despues, donde carajos le estoy errando
// harto de esta tesis y del grupo de mierda que me toco
// ojala me olvide de borrar esto ya alguno lo lea a esto

    const dateCellRender = (value) => {
        // console.log(value.year());
        // console.log(value.month());
        // console.log(moment().year().month().date())
        const listData = getListData(value);
        if( listData.length !== 0 ){
            console.log(listData);
        }        
        return (
          <ul className="events">
            {/* creo los items de acuerdo a los valores de mi array listData */}
            {listData.map((item) => (                
              <li key={item.content}>
                <Badge status={item.type} color={item.color} text={item.content} />
              </li>
            ))}
          </ul>
        );
      };
    return (<> 
    <ConfigProvider locale={esES}>

        <Row>
            <Col span={24}>
                <Title className='appTitle'>Calendario</Title>
            </Col>
        </Row>
        <Divider></Divider>
        <Row>
            <Col span={24}>
                <Calendar fullscreen={true}  dateCellRender={dateCellRender} className='diary'>
                
                </Calendar>
            </Col>
        </Row>
    </ConfigProvider>
    
    
    
    </>)
}