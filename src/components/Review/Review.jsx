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

export default function Review(props) {
  const { pet } = props;
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([
    { name: ["name"], value: pet.name },
    { name: ["birth"], value: pet.birth.slice(0, 10) },
    { name: ["isMale"], value: pet.isMale },
    { name: ["raceId"], value: pet.raceId },
    { name: ["specieId"], value: pet.specieId },
    { name: ["castrationDate"], value: pet.castrationDate },
    { name: ["haveChip"], value: pet.haveChip },
    { name: ["aspects"], value: pet.aspects },
    { name: ["hairColorId"], value: pet.hairColorId },
    { name: ["hairLengthId"], value: pet.hairLengthId },
    { name: ["petSizeId"], value: pet.petSizeId },
  ]);
  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };

  //debemos diferenciar el valor que queda vacio por eleccion
  //del que aun no ha se ha cargado.
  //si id == null no tiene nada cargado
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
    } else {
      //caso2: carga los datos en los campos
      //habilita campo
      setIsDisabled(false);
      //deja campo vacio
      setInitValue([{ name: "empty", value: null }]);
    }
  }, [props]);

  return (
    <>
      <Row justify="center" gutter={24}>
        <Col span={24}>
          <Typography.Title className="" level={4}>
            Reseña
          </Typography.Title>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Form
            layout="horizontal"
            labelCol={{ sm: { span: 8 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
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
                <Input
                  disabled={disabled}
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
                label="Raza"
                tooltip={{
                  title: "raza del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione la raza"
                  value={pet.raceId}
                  disabled={disabled}
                  allowClear
                >
                  <Select.Option value={1}>Golden Retriever</Select.Option>
                  {/* {renderRaces()} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="castratioDate"
                label="Castracion"
                tooltip={{
                  title: "fecha de castracion del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  disabled={disabled}
                  placeholder="Ingrese fecha castracion"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="haveChip"
                label="CHIP"
                tooltip={{
                  title: "posee chip identificador",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Radio.Group
                  disabled={disabled}
                  optionType="button"
                  className="register-pet-form__radio"
                >
                  <Radio style={{ width: "50%" }} value={true}>
                    Si
                  </Radio>
                  <Radio style={{ width: "50%" }} value={false}>
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="aspects"
                label="Aspecto"
                tooltip={{
                  title: "rasgos distintivos del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input.TextArea
                  disabled={disabled}
                  name="aspects"
                  placeholder={"Ingrese aspecto de la mascote"}
                  rows={2}
                  allowClear
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="hairColorId"
                label="Color pelaje"
                tooltip={{
                  title: "color del pelaje del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione el color"
                  value={pet.hairColorId}
                  disabled={disabled}
                  allowClear
                >
                  <Select.Option value={1}>Palido</Select.Option>
                  {/*Martina */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="hairLengthId"
                label="Largo pelaje"
                tooltip={{
                  title: "largo del pelaje del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione el largo"
                  value={pet.hairLengthId}
                  disabled={disabled}
                  allowClear
                >
                  <Select.Option value={3}>Corto</Select.Option>
                  {/* {renderRaces()} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="petSizeId"
                label="Tamaño"
                tooltip={{
                  title: "tamaño del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione el tamaño"
                  value={pet.petSizeId}
                  disabled={disabled}
                  allowClear
                >
                  <Select.Option value={2}>Mediano</Select.Option>
                  {/* {renderRaces()} */}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item wrapperCol={{ span: 24 }}>
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
        </Col>
      </Row>
    </>
  );
}
