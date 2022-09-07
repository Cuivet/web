import React, {useState} from "react";
import { Layout, Tabs } from "antd";
import Logo from '../../assets/img/png/logo2.png'
import RegisterForm from "../../components/RegisterForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import { getProfile } from '../../services/user.service';
import './LogIn.scss';
import { Navigate } from "react-router-dom";

export default function LogIn(){
    const [isLogged, setLogStatus] = useState(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
    const [activeTab, changeActiveTab] = useState(undefined);
    const {Content} = Layout;
    const {TabPane} = Tabs;

    const logIn = () => {
        getProfile()
            .then(res => {
                sessionStorage.setItem('profile',JSON.stringify(res.data));
                setLogStatus(true);
            })
            .catch(e => {
                console.error(e)
            });
    };

    const successRegister = () => {
        changeActiveTab("1");
    }

    function CheckIfIsLogged(){
        return isLogged ? <Navigate to="/menu" /> : null;
    }

    function changeTabKey(){
        activeTab === undefined ? changeActiveTab("2") : activeTab === "1" ? changeActiveTab("2") : changeActiveTab("1");
    }

    return (
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={ Logo } alt="CUIVET" />
                </h1>

                <div className="sign-in__content-tabs">
                    <Tabs type="card" centered activeKey={activeTab} onChange={changeTabKey}>
                        <TabPane tab={<span>Iniciar Sesión</span>} key="1">
                            <SignInForm logIn={logIn} />
                        </TabPane>
                        <TabPane tab={<span>Registrarse</span>} key="2">
                            <RegisterForm successRegister={successRegister} />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
            <CheckIfIsLogged></CheckIfIsLogged>
        </Layout>
    )
    
    
}