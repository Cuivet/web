import React from "react";
import {Card, Avatar} from 'antd';
import Meta from "antd/lib/card/Meta";
import { EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

import './CardPet.scss'
import AvatarUser from "../AvatarUser/AvatarUser";

export default function CardPet(props){
    const {img, title, description, avatar} = props

    // console.log(avatar);

    function AvatarGroup(){
        const group =[]
        if(Array.isArray(avatar)){
            
            // if(avatar.length >1){
                for(let i=0; i < avatar.length;i++){
                    console.log(avatar[i])
                    group.push(
                        <AvatarUser key={i} icon={avatar[i]} preview={false} className="card-pet__avatar" />
                    );
                };
                
            // }
        }
        else{            
            group.push(
                <AvatarUser key={1} icon={avatar}  preview={false} className="card-pet__avatar" />
            );
        };
        return group;
    };
    //agregar tooltip o alguna forma de mostrar texto sobre la accion
    return(
        <Card            
            className='card-pet'
            hoverable
            cover={<img src={img}></img>}
            actions={[
            <EyeOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
            ]}
        >
            <Meta className='card-pet__meta'
            avatar={<Avatar.Group><AvatarGroup></AvatarGroup></Avatar.Group>}
            title={title}
            description={description}
            />
        </Card>
    )
}