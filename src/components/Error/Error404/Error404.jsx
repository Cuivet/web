import React from "react";
import { Result, Button } from "antd";

export default function Error404(){
    return(
        <Result
    status="404"
    title="404"
    subTitle="Perdon la pagina que buscas no existe."
    extra={<Button type="primary">Volver al Inicio </Button>}
  />
    )
}