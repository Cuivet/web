import {
  Form,
  Row,
  Col,
  Select,
  Typography,
  Input,
  Radio,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import {raceService} from '../../services/race.service';
import {specieService} from '../../services/specie.service';
import { petSizeService } from "../../services/pet_size.service";
import { hairColorService } from "../../services/hair_color.service";
import { hairLengthService } from "../../services/hair_length.service";

export default function Review(props) {
  const { pet } = props;
  const [disabled, setIsDisabled] = useState(false);
  const [initValue, setInitValue] = useState([]);
  const [races, setRaces] = useState([]);
  const [species, setSpecies] = useState([]);
  const [petSizes, setPetSizes] = useState([]);
  const [hairColors, sethairColors] = useState([]);
  const [hairLenghts, sethairLenghts] = useState([]);
  const [isInitData, setIsInitData]= useState(false);
  const [isFetchData, setIsFetchData] = useState(false);
  const wrapper = {
    sm: { offset: 0, span: 14 },
    xs: {
      offset: 0,
    },
  };
  
  if(!isInitData && isFetchData){
    initPet();
    setIsInitData(true);
  } 

  //debemos diferenciar el valor que queda vacio por eleccion
  //del que aun no ha se ha cargado.
  //si id == null no tiene nada cargado
  useEffect(() => {
    //caso1: trae TODOS los datos cargados
    if (props.id !== null) {
      setIsDisabled(true);
        const fetchData = async () => {
          await raceService.findAll().then((response) => {
            setRaces(response);
          });
          await specieService.findAll().then((response) => {
            setSpecies(response);
          });
          await petSizeService.findAll().then((response) => {
            setPetSizes(response);
          });
          await hairColorService.findAll().then((response) => {
            sethairColors(response);
          });
          await hairLengthService.findAll().then((response) => {
            sethairLenghts(response);
          });
          setIsFetchData(true);
        };
        fetchData();
    } else {
      //caso2: carga los datos en los campos
      //habilita campo
      setIsDisabled(false);
      //deja campo vacio
      setInitValue([{ name: "empty", value: null }]);
    }
  }, [props]);

  function initPet() {
    setInitValue([
      { name: ["name"], value: pet.name },
      { name: ["birth"], value: pet.birth.slice(0, 10) },
      { name: ["isMale"], value: pet.isMale },
      { name: ["raceId"], value: pet.raceId },
      { name: ["specieId"], value: species.find(specie => specie.id === (races.find(race => race.id === pet.raceId).specieId)).id},
      { name: ["castrationDate"], value: pet.castrationDate.slice(0, 10) },
      { name: ["haveChip"], value: pet.haveChip },
      { name: ["aspects"], value: pet.aspects },
      { name: ["hairColorId"], value: pet.hairColorId },
      { name: ["hairLengthId"], value: pet.hairLengthId },
      { name: ["petSizeId"], value: pet.petSizeId },
    ]);
}

    function renderSpecies() {
      let list = [];
      species.forEach((specie) => {
        list.push(<Select.Option key={specie.id} value={specie.id}>{specie.name}</Select.Option>);
      });
      return list;
    }

    function renderRaces() {
      let list = [];
      races.forEach((race) => {
        if (race.specieId) {
          list.push(<Select.Option key={race.id} value={race.id}>{race.name}</Select.Option>);
        }
      });
      return list;
    }
    function renderPetSize() {
      let list = [];
      petSizes.forEach(petSize => {
          list.push(<Select.Option value={petSize.id}>{petSize.name}</Select.Option>);
      })
      return list;
  }

  function renderHairColor() {
      let list = [];
      hairColors.forEach(hairColor => {
          list.push(<Select.Option value={hairColor.id}>{hairColor.name}</Select.Option>);
      })
      return list;
  }


  function renderHairLength() {
      let list = [];
      hairLenghts.forEach(hairLength => {
          list.push(<Select.Option value={hairLength.id}>{hairLength.name}</Select.Option>);
      })
      return list;
  }

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
            labelCol={{ sm: { span: 10 }, xs: { span: 5 } }}
            wrapperCol={wrapper}
            labelAlign="right"
            className="stepForm"
            labelWrap
            fields={initValue}
          >
            <Col span={24}>
              <Form.Item
                name="name"
                label="Paciente"
                tooltip={{
                  title: "Nombre del paciente",
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
                  title: "Fecha en la que nació el paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  disabled={disabled}
                  placeholder="Ingrese la fecha de nacimiento"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="isMale"
                label="Sexo"
                tooltip={{
                  title: "Sexo del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Radio.Group
                  optionType="button"
                  disabled={disabled}
                  className="register-pet-form__radio"
                >
                  <Radio style={{ width: "50%" }} value={1}>
                    Macho
                  </Radio>
                  <Radio style={{ width: "50%" }} value={0}>
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
                  title: "Especie a la que pertenece el paciente",
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
                  {renderSpecies()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="raceId"
                label="Raza"
                tooltip={{
                  title: "Raza del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione la raza"
                  value={pet.raceId}
                  disabled={disabled}
                  allowClear
                >
                  {renderRaces()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="castrationDate"
                label="Castración"
                tooltip={{
                  title: "Fecha de castración del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Input
                  disabled={disabled}
                  placeholder="Ingrese fecha castración"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="haveChip"
                label="CHIP"
                tooltip={{
                  title: "Posee chip identificador",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Radio.Group
                  disabled={disabled}
                  optionType="button"
                  className="register-pet-form__radio"
                >
                  <Radio style={{ width: "50%" }} value={1}>
                    Si
                  </Radio>
                  <Radio style={{ width: "50%" }} value={0}>
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                name="hairColorId"
                label="Color pelaje"
                tooltip={{
                  title: "Color de pelaje del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione color"
                  value={pet.hairColorId}
                  disabled={disabled}
                  allowClear
                >
                  {renderHairColor()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="hairLengthId"
                label="Largo pelaje"
                tooltip={{
                  title: "Largo del pelaje del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione el largo"
                  value={pet.hairLengthId}
                  disabled={disabled}
                  allowClear
                >
                  {renderHairLength()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="petSizeId"
                label="Tamaño"
                tooltip={{
                  title: "Tamaño del paciente",
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder="Seleccione el tamaño"
                  value={pet.petSizeId}
                  disabled={disabled}
                  allowClear
                >
                  {renderPetSize()} 
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="aspects"
                label="Aspecto"
                tooltip={{
                  title: "Rasgos distintivos del paciente",
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
          </Form>
        </Col>
      </Row>
    </>
  );
}
