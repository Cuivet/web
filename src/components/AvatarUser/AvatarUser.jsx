import React from "react";
import {UserOutlined} from  "@ant-design/icons";
import { Avatar, Image } from "antd";

import './AvatarUser.scss'

export default function AvatarUser(props){
    let flag1, flag2 = null;
    const {icon, preview} = props;

    if(icon == null){
        flag1 = <UserOutlined />;
    }else{
        flag2 = <Image src={icon} preview={preview} className="avatar-img"></Image>;
    }
    
    return (
        <Avatar className="avatar" 
        size={{
            xs: 30,
            sm: 35,
            md: 45,
            lg: 45,
            xl: 55,
            xxl: 65,
          }}
        icon={flag1} 
        src={flag2} />
    )
}
