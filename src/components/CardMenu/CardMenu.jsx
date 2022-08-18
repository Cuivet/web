import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import './CardMenu.scss';


export default function CardMenu(props){
    const {img, text, description, disabled} = props;
    return (
        
        <Card hoverable cover={<img src={img} ></img>} loading={disabled} className='card-menu'>
            <Meta title={text} description={description} className='card-menu__meta'></Meta>
        </Card>
    )
}