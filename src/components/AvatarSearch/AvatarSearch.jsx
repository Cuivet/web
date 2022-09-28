import { Avatar, Image, Typography } from "antd";
import React from "react";

export default function AvatarSearch(props){
    const {name, lastName, icon} = props
    const styleBig = {
        display: 'flex',
        justifyContent: 'normal',
        alignItems: 'center'
    }
    const styleText = {
        marginBottom: '0',
        marginLeft: '1%'
    }
    if(icon != null){
        var flag = <Image src={icon} preview={false} />
    }else{
        flag = name[0] + lastName[0];
    }
    const styleAvatar= {
        backgroundColor: '#E9C4F2',
        color: '#5B2569'
    }
    return(<>
        <div style={styleBig}>
            <Avatar icon={flag} style={styleAvatar}></Avatar>
            <Typography.Title level={5} style={styleText} >{name + ' ' +lastName}</Typography.Title>
        </div>
    </>)
}