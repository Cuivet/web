import React from "react";
import { Card, Avatar, Popconfirm, message } from 'antd';
import Meta from "antd/lib/card/Meta";
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { deletePet } from "../../services/pet.service";
import AvatarUser from "../AvatarUser/AvatarUser";

export default function CardPet(props){
    const { img, title, description, avatar, item, popTitle } = props;

    function AvatarGroup(){
        const group =[]
        if(Array.isArray(avatar)){
            for(let i=0; i < avatar.length;i++){
                console.log(avatar[i])
                group.push(<AvatarUser key={i} icon={avatar[i]} preview={false} className="card-pet__avatar" />);
            };
        }
        else{            
            group.push(<AvatarUser key={1} icon={avatar}  preview={false} className="card-pet__avatar" />);
        };
        return group;
    };

    const confirm = (e) => {
        message.success( title + ' borrada exitosamente.' );
        deletePet(item);
        window.location.replace('');
    };

    const displayPet = () => {
        props.showPet(item);
    }
    
    return(
        <Card   className='appCard'
                hoverable
                style={{width: 300}}
                cover={<img alt='required text' src={img}></img>}
                actions={[
                <EyeOutlined key="edit" onClick={displayPet} />,
                <Popconfirm title={popTitle} 
                            onConfirm={confirm}
                            okText="Si"
                            cancelText="No"
                            placement="top"
                            arrowPointAtCenter 
                            icon={<ExclamationCircleOutlined fontSize="small" style={{color: 'red'}} />}><DeleteOutlined key="delete" />
                </Popconfirm>]}>
            <Meta   className='card-pet__meta'
                    avatar={<Avatar.Group><AvatarGroup></AvatarGroup></Avatar.Group>}
                    title={title}
                    description={description}/>
        </Card>
    )
}