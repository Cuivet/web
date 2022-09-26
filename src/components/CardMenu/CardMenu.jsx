import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import './CardMenu.scss';
import { Link } from "react-router-dom";


export default function CardMenu(props){
    const {img, text, description, disabled, route} = props;
    return (
        <Link to={route} style={{cursor: 'pointer'}}>
            <Card hoverable
                cover={<img alt='required field' 
                src={img} ></img>} 
                loading={disabled} 
                className='card-menu'>
                <Meta title={text} description={description} className='card-menu__meta'></Meta>
            </Card>
        </Link>
    )
}