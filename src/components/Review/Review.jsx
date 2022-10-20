import {
  Form,
  Row,
  Col,
  InputNumber,
  Select,
  Typography,
  DatePicker,
  Input,
  Radio,
  Button,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
// import moment  from "moment";
import { raceService } from "../../services/race.service";
import { specieService } from "../../services/specie.service";

export default function Review(props) {
  const { pet } = props;
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([
    { name: ["name"], value: pet.name },
    { name: ["birth"], value: pet.birth.slice(0, 10) },
    { name: ["isMale"], value: pet.isMale },
    { name: ["raceId"], value: pet.raceId },
    { name: ["specieId"], value: pet.specieId },
  ]);
  const [isFetchData, setIsFetchData] = useState(false);
  const [races, setRaces] = useState([]);
  const [species, setSpecies] = useState([]);

  //debemos diferenciar el valor que queda vacio por eleccion
  //del que aun no ha se ha cargado.
  //si id == null no tiene nada cargado
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
      //   const fetchData = async () => {
      //     await raceService.findAll().then((response) => {
      //       setRaces(response);
      //     });
      //     await specieService.findAll().then((response) => {
      //       setSpecies(response);
      //     });
      //     setIsFetchData(true);
      //   };
      //   fetchData();
    } else {
      //caso2: carga los datos en los campos
      //habilita campo
      setIsDisabled(false);
      //deja campo vacio
      setInitValue([{ name: "empty", value: null }]);
    }
  }, [props]);

  //   function renderSpecies() {
  //     let list = [];
  //     species.forEach((specie) => {
  //       list.push(<Select.Option value={specie.id}>{specie.name}</Select.Option>);
  //     });
  //     return list;
  //   }

  //   function renderRaces() {
  //     let list = [];
  //     races.forEach((race) => {
  //       if (race.specieId === pet.specieId) {
  //         list.push(<Select.Option value={race.id}>{race.name}</Select.Option>);
  //       }
  //     });
  //     return list;
  //   }

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            
            Reseña
          </Typography.Title>
        </Col>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelAlign="right"
          labelWrap
          fields={initValue}
        >
          <Col span={24}>
            <Form.Item
              name="name"
              label="Paciente"
              tooltip={{
                title: "nombre del paciente",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input
                disabled={disabled}
                keyboard="false"
                style={{ width: 300 }}
                placeholder="Ingrese el nombre del paciente"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="birth"
              label="Fecha de Nacimiento"
              tooltip={{
                title: "fecha en la que nacio el paciente",
                icon: <InfoCircleOutlined />,
              }}
            >
              {/* <DatePicker
                disabled={disabled}
                placeholder={"Ingrese fecha de naciemiento"}
                style={{ width: 300 }}
                value={'2018-07-09'}
              /> */}
              <Input
                disabled={disabled}
                style={{ width: 300 }}
                placeholder="Ingrese la fecha de naciemiento"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="isMale"
              label="Sexo"
              tooltip={{
                title: "sexo del paciente",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Radio.Group
                optionType="button"
                disabled={disabled}
                style={{ width: 300 }}
                className="register-pet-form__radio"
              >
                <Radio style={{ width: "50%" }} value={true}>
                  Macho
                </Radio>
                <Radio style={{ width: "50%" }} value={false}>
                  Hembra
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="specieId"
              label="Especie"
              tooltip={{
                title: "especie a la que pertenece el paciente",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                name="speciesId"
                placeholder="Seleccione la especie"
                style={{ width: 300 }}
                value={pet.specieId}
                disabled={disabled}
                allowClear
              >
                <Select.Option value={2}>Canino</Select.Option>
                {/* {renderSpecies()} */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="raceId"
              label="Sexo"
              tooltip={{
                title: "sexo del paciente",
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select
                placeholder="Seleccione la raza"
                value={pet.raceId}
                style={{ width: 300 }}
                disabled={disabled}
                allowClear
              >
                <Select.Option value={1}>Golden Retriever</Select.Option>
                {/* {renderRaces()} */}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Tooltip title={"Guardar"}>
                <Button
                  htmlType="submit"
                  shape="round"
                  className="stepSave"
                  disabled={disabled}
                  type="primary"
                >
                  <CheckOutlined />
                </Button>
              </Tooltip>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </>
  );
}
