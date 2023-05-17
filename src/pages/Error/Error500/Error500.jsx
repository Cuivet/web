import React from "react";
import {Result, Button} from 'antd';

export default function Error500() {
    return(
        <Result
    status="500"
    title="500"
    subTitle="Lo sentimos, al parecer algo no salio bien."
    extra={<Button type="primary">Volver</Button>}
  />
    )
}