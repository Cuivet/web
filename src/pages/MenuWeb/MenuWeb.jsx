import React from "react";
import {Layout, Row, Col, Descriptions } from "antd";
import CardMenu from "../../components/CardMenu";
import clipboard from "../../assets/img/jpg/clipboard.jpg";
import { getProfile } from "../../services/user.service";

import './MenuWeb.scss'

export default function MenuWeb(){

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;
    // await getProfile()
    // .then(res => {
    //     return res.data;
    // })
    // .catch(e => {
    //     return console.error(e)
    // });

    // const tutor_id = profile.tutor.id;
    // const vet_id = profile.veterinary.id;
    // const vetOwner_id = profile.vetOwner.id;
    // const vector = [tutor_id, vet_id, vetOwner_id]

    const vet = ['Consulta','Calendario','Ficha Clinica'];
    const tutor = ['Mascotas','Calendario','Valorar','Historial Clinico'];
    const vetOwner = ['Veterinaria','Calendario'];
    const test = "Hola";

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
        img:[<img alt="consulta" src={clipboard}></img>],
    }

    //fijo 4 modulos por fila 
    function Mod(){
        const mod = [];
        for(let i = 0; i < cantMod()[0].length; i++ ){
            console.log(modules.text[i]);
            mod.push(            
                <Col span={6}>
                    <CardMenu key={i} text={cantMod()[0][i]} description={modules.description[0]} disabled={modules.disabled[0]} img={modules.img[0]} ></CardMenu>
                </Col>
            );      
        
        };               
        return mod;
    };

    return (
        <Row>
            <Mod></Mod>
        </Row> 
        
        
    )
};