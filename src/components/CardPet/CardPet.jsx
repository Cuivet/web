import React from "react";
import { Card, Avatar, Popconfirm, message } from 'antd';
import Meta from "antd/lib/card/Meta";
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { deletePet } from "../../services/pet.service";
import './CardPet.scss';
import AvatarUser from "../AvatarUser/AvatarUser";

export default function CardPet(props){
    const {img, title, description, avatar, item} = props;

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
    // evento para borrar la mascota
    const confirm = (e) => {
        // console.log(e);
        message.success('Mascota '+ title + ' borrada exitosamente.' );
        deletePet(item);
      };
      //evento para cancelar borrado de la mascota
    const cancel = (e) => {
        // console.log(e);
        message.error('Click on No');
      };
    

    //agregar tooltip o alguna forma de mostrar texto sobre la accion
    return(
        <Card  
            className='card-pet'
            hoverable
            cover={<img alt='required text' src={img}></img>}
            actions={[
            <EyeOutlined key="edit" />,
            <Popconfirm
                        title="¿Está seguro que desea borrar la mascota?"  
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Si"
                        cancelText="No"
                        placement="top"
                        arrowPointAtCenter 
                        icon={<ExclamationCircleOutlined fontSize="small" style={{
                            color: 'red',
                          }} />}
                    ><DeleteOutlined key="delete" /></Popconfirm>,
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