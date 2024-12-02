import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Tooltip,
  Modal,
  Typography,
  Divider,
  Table,
  Select,
  DatePicker,
  Input,
  Form,
} from "antd";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import locale from "antd/lib/date-picker/locale/es_ES";
import { complementaryStudiyTypeService } from "../../services/complementary_study_type.service";

const { Title } = Typography;
const { Option } = Select;

export default function Studies() {
  var tutor = false;
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generate, setGenerate] = useState(true);
  const [complementaryStudyTypeId, setComplementaryStudyTypeId] = useState("");
  const [studies, setStudies] = useState([]);

  if (profile.tutor != null) {
    tutor = true;
  }
  useEffect(() => {
    const fetchData = async () => {
      await complementaryStudiyTypeService
        .findAll()
        .then((response) => {
          setStudies(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Número",
      dataIndex: "nro",
      defaultSortOrder: "ascend",
      responsive: ["md"],
      sorter: (a, b) => a.nro - b.nro,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY");
        const dateB = moment(b.date, "DD/MM/YYYY");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
    },
    {
      title: "Mascota",
      dataIndex: "pet",
      sorter: (a, b) => a.pet.length - b.pet.length,
    },
    {
      title: "Veterinario",
      dataIndex: "veterinary",
      sorter: (a, b) => a.veterinary.length - b.veterinary.length,
      responsive: ["md"],
    },
    {
      title: "Laboratorio",
      dataIndex: "lab",
      sorter: (a, b) => a.lab.length - b.lab.length,
      // responsive: ['sm']
    },
    {
      title: "Estudio",
      dataIndex: "study",
      sorter: (a, b) => a.study.length - b.study.length,
      // responsive: ['sm']
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      // responsive: ['md'],
      fixed: "right",
      render: (_, record) => (
        <>
          <Tooltip placement="top" title="Ver Estudio">
            <Button shape="circle" size="large" className="margin-right">
              <EyeOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title="Descargar Estudio">
            <Button shape="circle" size="large" className="margin-right">
              <DownloadOutlined />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      nro: 1,
      date: "13/01/2020",
      pet: "Malu",
      veterinary: "Eugenia Frattin",
      lab: "Lasse",
      study: "Ecografía",
    },
    {
      key: "2",
      nro: 2,
      date: "24/11/2019",
      pet: "Malu",
      veterinary: "Eugenia Frattin",
      lab: "Particular",
      study: "Radiografía",
    },
    {
      key: "3",
      nro: 3,
      date: "11/05/2019",
      pet: "Lola",
      veterinary: "Eugenia Frattin",
      lab: "Ernesto Casas",
      study: "Hemoglobina",
    },
    {
      key: "4",
      nro: 4,
      date: "13/09/2009",
      pet: "Lola",
      veterinary: "Pepe Jose",
      lab: "OultonPets",
      study: "Rayos X",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  const setOptions = (studies) => {
    let options = [];
    for (let study of studies) {
      options.push({ value: study.id, label: study.name });
    }
    return options;
  };

  const showStudies = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const generateChange = (e) => {
    setGenerate(false);
  };

  return (
    <>
      <Row align="middle">
        <Col span={22}>
          <Title className="appTitle">
            Gestión de Estudios Complementarios
          </Title>
        </Col>
        {tutor ? null : (
          <Col span={2}>
            <Tooltip title="Agregar Estudio Complementario" placement="right">
              <Button
                type="link"
                className="appButton"
                size="large"
                icon={<BiotechOutlinedIcon />}
                onClick={showStudies}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
      <Divider orientation="left"></Divider>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        onChange={onChange}
      />
      <Modal
        title="Pedido de Estudios Complementarios"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            style={{ marginRight: "2%" }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>,
          <Link to={"/studies-request"}>
            <Button
              key="submit"
              disabled={generate}
              className={"stepSave"}
              type="primary"
            >
              Generar
            </Button>
          </Link>,
        ]}
      >
        <Form layout="vertical" name="studiesRequest">
          <Form.Item
            name={"dni"}
            label={"Ingrese DNI del tutor:"}
            rules={[{ required: true, message: "El DNI es obligatorio!" }]}
          >
            <Input.Search type="number" placeholder="DNI" allowClear />
          </Form.Item>
          <Form.Item
            name={"pet"}
            label={"Seleccione la mascota a la que desea generar el pedido:"}
            rules={[
              { required: true, message: "Debe seleccionar una mascota!" },
            ]}
          >
            <Select
              placeholder="Mascota"
              allowClear
              showSearch
              className="select-before full-width"
              style={{ width: "100%" }}
            >
              <Option value="1">Malu</Option>
              <Option value="2">Lola</Option>
              <Option value="3">Wendy</Option>
              <Option value="4">Lima</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={"complementaryStudyTypeId"}
            label={"Seleccione tipo de estudio complementario:"}
            rules={[
              { required: true, message: "Debe seleccionar un estudio!" },
            ]}
          >
            <Select
              placeholder={"Estudios"}
              allowClear
              // mode="multiple"
              // labelInValue
              showSearch
              name={"complementaryStudyTypeId"}
              className="select-before full-width"
              style={{ width: "100%" }}
              // value={null}
              onChange={(value) => setComplementaryStudyTypeId(value)}
              options={setOptions(studies)}
              // maxTagCount={'responsive'}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            name={"observation"}
            label={"Comentarios:"}
            rules={[{ required: false }]}
          >
            <Input.TextArea
              showCount
              allowClear
              maxLength={500}
              placeholder="Ingrese una observación..."
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
