import React from "react";
import {Layout, Row, Col, Descriptions, Typography } from "antd";
import CardMenu from "../../components/CardMenu";
import clipboard from "../../assets/img/jpg/clipboard.jpg";
import '../Settings/UserSettings/UserSettings.scss';

const {Title} = Typography;

export default function MenuWeb(){

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;
    // console.log(profile);
    
    const vet = ['Consulta','Calendario','Ficha Clinica'];
    const tutor = ['Mascotas','Calendario','Valorar','Historial Clinico'];
    const vetOwner = ['Veterinaria','Calendario'];
    // const test = "Hola";

    function cantMod(){
        //definir modulos comunes en todos los perfiles
        let mod_text = [];
        // let flag = false;
        if(profile.tutor != null){
            mod_text.push(tutor);
        }
        if(profile.veterinary != null){
            mod_text.push(vet);
        }
        if(profile.vetOwner!= null){
            mod_text.push(vetOwner);
        }
        // console.log(mod_text); 
        return mod_text;
    }

    //completar con datos traidos de la base
    const modules = {
        text:['Consulta', 'Mapa', 'Mascotas','Calendario', 'Valoracion', 'Historial'],
        description:['Este es un modulo del sistema'],
        disabled:[false,true],
        img:[clipboard],
    }

    //fijo 4 modulos por fila 
    function Mod(){
        const mod = [];
        for(let i = 0; i < cantMod()[0].length; i++ ){
            console.log(modules.text[i]);
            mod.push(            
                <Col xs={{ span: 24}} lg={{ span: 6 }}>
                    <CardMenu key={i} text={cantMod()[0][i]} description={modules.description[0]} disabled={modules.disabled[0]} img={modules.img[0]} ></CardMenu>
                </Col>
            );      
        
        };               
        return mod;
    };

    return (
        <Row>
            <Col xs={{ span: 24}} lg={{ span:12 ,offset:6 }}>
                <Title className="description-item__title">Inicio</Title>
            </Col>
            <Col  xs={{ span: 0}} lg={{ span:6 }}></Col>
            <Mod></Mod>
        </Row> 
        
        
    )
};