import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";

import './CardMenu.scss';


export default function CardMenu(props){
    const {img, text, description, disabled, route} = props;
    return (
        <Link to={route} style={{cursor: 'pointer'}}>
            <Card hoverable
                cover={<img alt='required field' src={img}></img>}
                // style={{ height: 300 }}
                size="small"
                loading={disabled}
                className='card-menu'>
                <Meta title={text} description={description} className='card-menu__meta'></Meta>
            </Card>
        </Link>
    )
}