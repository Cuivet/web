import React from "react";
import {Layout,Tabs } from "antd";
import RegisterPetForm from "../../components/RegisterPetForm";



import './RegisterPet.scss'

export default function RegisterPet(){
    const {Content} = Layout;
    const {TabPane} = Tabs;


    return (
        // <Layout className="register-pet">
        //     <Content className="register-pet__content">
        //         <RegisterPetForm/>
        //     </Content>
        // </Layout>        
        <Layout className="register-pet">
        <Content className="register-pet__content">
            <div className="register-pet__content-tabs">
            
                <Tabs type="card" centered>
                    <TabPane tab={<span>Mis Mascotas</span>} key="1" >
                        <h1>Mis mascotas registradas</h1>
                    </TabPane>
                    <TabPane tab={<span>Registrar Mascota</span>} key="2">
                        <RegisterPetForm />
                    </TabPane>
                </Tabs>
            </div>
        </Content>
    </Layout>     
    )
};