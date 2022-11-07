import React from "react";
import {Link} from 'react-router-dom'
import { Result, Button } from "antd";

export default function Error404(){
    return(
        <Result
          status="404"
          title="404"
          subTitle="Perdón la página que buscas no existe."
          extra={
          <Link to={'/'}>  <Button type="primary">Volver al Inicio </Button></Link>
         }
        />
    )
}