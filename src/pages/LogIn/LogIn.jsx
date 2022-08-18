import React, {useState} from "react";
import { Layout, Tabs } from "antd";
import Logo from '../../assets/img/png/logo2.png'
import RegisterForm from "../../components/RegisterForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import { getProfile } from '../../services/user.service';
import './LogIn.scss';
import { Link, Route, Navigate, Routes,Redirect } from "react-router-dom";
import MenuWeb from "../MenuWeb/MenuWeb";

export default function LogIn(){
    const [input, setInput]= useState({
        isLogged : sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null
    });
    const {Content} = Layout;
    const {TabPane} = Tabs;
    //sacar de aca
    const logOut = e =>{
        setInput({...input,['isLogged']: false});
        sessionStorage.clear();
    };

    const logIn = () => {
        setInput({...input,['isLogged']: true});
        getProfile()
            .then(res => {
                sessionStorage.setItem('profile',JSON.stringify(res.data) );
            })
            .catch(e => {
                console.error(e)
            });
    };
    
    console.log(input.isLogged);
    if(!input.isLogged){
        return (
            <Layout className="sign-in">
                <Content className="sign-in__content">
                    <h1 className="sign-in__content-logo">
                        <img src={ Logo } alt="CUIVET" />
                    </h1>
    
                    <div className="sign-in__content-tabs">
                        <Tabs type="card" centered>
                            <TabPane tab={<span>Iniciar Sesión</span>} key="1" >
                                <SignInForm logIn={logIn} />
                            </TabPane>
                            <TabPane tab={<span>Registrarse</span>} key="2">
                                <RegisterForm />
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>        
        )
    } else{
        return (
            <>
                {/* <Routes>
                    <Route path="/home" component={<MenuWeb />}></Route>
                </Routes>
                 */}
                <Navigate to="/menu" />
            </>
           
            // <div>
            //     <span>Atroden del sistema!</span><br/>
            //     <button onClick={logOut}> 
            //         Salir del sistema
            //     </button>
            // </div>
            
        )
    }
    
}