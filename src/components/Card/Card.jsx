import React from "react";
import { Card, Avatar, Popconfirm, message } from 'antd';
import Meta from "antd/lib/card/Meta";

export default function CardPet(props){
    const { title, description,  } = props;

    

    // const confirm = (e) => {
    //     message.success( title + ' borrada exitosamente.' );
    //     deletePet(item);
    //     window.location.replace('');
    // };

    // const displayPet = () => {
    //     props.showPet(item);
    // }
    
    return(
        <Card   className='appCard'
                hoverable
                style={{width: 600}}>

                <Meta   className='card__meta'
                    title={title}
                    description={description}/>
            
        </Card>
    )
}
