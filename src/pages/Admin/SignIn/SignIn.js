import React, {useState} from "react";
import { Layout, Tabs } from "antd";
import Logo from '../../../assets/img/png/logo2.png'
import RegisterForm from "../../../components/Admin/RegisterForm";
import SignInForm from "../../../components/Admin/SignInForm/SignInForm";

import './SignIn.scss';

export default function SignIn(){
    const [input, setInput]= useState({
        isLogged : sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null
    });
    const {Content} = Layout;
    const {TabPane} = Tabs;

    const logOut = e =>{
        setInput({...input,['isLogged']: false});
        sessionStorage.clear();
    };

    const logIn = () => {
        setInput({...input,['isLogged']: true});
    };
     
    if(!input.isLogged){
        return (
            <Layout className="sign-in">
                <Content className="sign-in__content">
                    <h1 className="sign-in__content-logo">
                        <img src={ Logo } alt="Juanfra" />
                    </h1>
    
                    <div className="sign-in__content-tabs">
                        <Tabs type="card">
                            <TabPane tab={<span>Entrar</span>} key="1">
                                <SignInForm logIn={logIn} />
                            </TabPane>
                            <TabPane tab={<span>Nuevo usuario</span>} key="2">
                                <RegisterForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>        
        )
    } else{
        return (
            <div>
                <span>Atroden del sistema!</span><br/>
                <button onClick={logOut}> 
                    Salir del sistema
                </button>
            </div>
            
        )
    }
    
}