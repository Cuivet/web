import React from "react";
import {UserOutlined} from  "@ant-design/icons";
import { Avatar, Image } from "antd";

import './Avatar.scss'

export default function AvatarUser(props){
    let flag1, flag2 = null;
    const {icon} = props;
    console.log(icon);
    if(icon == null){
        flag1 = <UserOutlined />;
    }else{
        flag2 = <Image src={icon} className="avatar-img"></Image>;
    }
    

    return (
        <Avatar className="avatar" 
        size={"large"} 
        icon={flag1} 
        src={flag2} />
    )
}
