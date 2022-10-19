import { Form, Row, Col, InputNumber, Typography } from "antd";
import {InfoCircleOutlined} from  "@ant-design/icons";
import React, {useState, useEffect} from "react";

export default function Review(props){
    const {weight, temperature} = props;
    const [disabled, setIsDisabled] = useState(false);
    const [initValue, setInitValue]= useState([{name: ["weight"], value: weight}, {name: ["temperature"], value:temperature}])

    
    //debemos diferenciar el valor que queda vacio por eleccion
    //del que aun no ha se ha cargado.
    //si id == null no tiene nada cargado
    useEffect(() =>{
        //caso1: trae TODOS los datos cargados
        if(props.id !== null){
            setIsDisabled(true);  
        }else{
            //caso2: carga los datos en los campos
            //habilita campo
            setIsDisabled(false);
            //deja campo vacio
            for (let i in props){
                setInitValue([{name: toString(i), value:null}]);                             
            };           
        }
    },[props,initValue]);

    return(<>
        <Row justify="center" gutter={24}>
            <Col span={24}>
                <Typography.Title className="" level={4}> Reseña</Typography.Title>
            </Col>
            <Form layout="horizontal" labelCol={{span:6}} fields={initValue} >
                <Col span={24}>
                    <Form.Item  name="weight" label='Peso' tooltip={{
                        title: 'peso en Kilogramos',
                        icon: <InfoCircleOutlined />,
                        }}>
                            <InputNumber min={1} disabled={disabled} keyboard='false' style={{width: 300}} placeholder="Ingrese el peso de la Mascota"  />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="temperature" label='Temperatura' tooltip={{
                        title: 'temperatura en °C',
                        icon: <InfoCircleOutlined />,
                        }}>
                            <InputNumber disabled={disabled} min={30} max={50} keyboard='false' style={{width: 300}} placeholder="Ingrese la temperatura de la Mascota" />
                    </Form.Item>
                </Col>

            </Form>
        </Row>
    </>)
}