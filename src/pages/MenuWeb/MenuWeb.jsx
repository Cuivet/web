import React from "react";
import {Layout, Row, Col } from "antd";
import CardMenu from "../../components/CardMenu";
import clipboard from "../../assets/img/jpg/clipboard.jpg";

import './MenuWeb.scss'

export default function MenuWeb(){
    const {Content} = Layout;

    //completar con datos traidos de la base
    const modules = {
        text:['Consulta', 'Mapa', 'Mascotas','Calendario', 'Valoracion', 'Historial'],
        description:['Este es un modulo del sistema'],
        disabled:[false,true],
        img:[<img alt="consulta" src={clipboard}></img>],
    }

    //fijo 4 por fila-
    const cantMod = 7;

    function Mod(){
        console.clear();        
       // const row = [];
        const mod = [];
     //   for (let j = 0 ; j<rows;j++){
            for(let i = 0; i < cantMod; i++ ){
                console.log(modules.text[i]);
                mod.push(            
                    <Col span={6}>
                        <CardMenu text={modules.text[i]} description={modules.description[0]} disabled={modules.disabled[0]} img={modules.img[0]} ></CardMenu>
                    </Col>
                );      
            
            };
        //     row.push(
        //         <Row>{mod}</Row>
        //     )
        // }   
                
        return mod;
    };

    return (
        <Row>
            <Mod></Mod>
        </Row>       
        
        
    )
};