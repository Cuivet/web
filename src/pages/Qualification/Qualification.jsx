import React, { useEffect, useState } from "react";
import { qualificationService } from "../../services/qualification.service";
import {
  Input,
  Button,
  Tooltip,
  Row,
  Typography,
  Table,
  Form,
  Col,
  Divider,
} from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./Qualification.scss";
import StarSelector from "../../components/StarSelector/StarSelector";
import moment from "moment";

const { Title } = Typography;

export default function Qualification() {
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    if (!isInit) {
      refreshComponent();
      setIsInit(true);
    }
  }, [isInit]);

  function refreshComponent() {
    qualificationService
      .findAllByTutorId(profile.tutor.id)
      .then((responseQualifications) => {
        generateData(responseQualifications);
        setIsLoading(false);
      });
  }

  function generateData(responseQualifications) {
    const finalData = responseQualifications?.map((item) => ({
      key: item.qualification.id,
      date: moment(item.clinicalRecord.createdAt).format("DD/MM/YYYY"), //clinicalRecord.createdAt.slice(0, 10),
      vetName: `${item.clinicalRecord.veterinaryData.person.name} ${item.clinicalRecord.veterinaryData.person.lastName}`,
      petName: item.clinicalRecord.pet.name,
      qualification: item.qualification.qualification,
      observation: item.qualification.observation_qa,
      isSaved:
        item.qualification.qualification !== null ||
        item.qualification.observation_qa !== null, //para manejar edicion
    }));
    setData(finalData);
  }

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    refreshComponent();
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedRecord = { ...item, ...row };

        const response = await qualificationService.save(updatedRecord);
        console.log("Calificación actualizada correctamente:", response.data);

        newData.splice(index, 1, { ...updatedRecord, isSaved: true });
        setData(newData);
        setEditingKey("");
      }
    } catch (error) {
      console.error("Error al actualizar la calificación:", error);
    }
  };

  const handleDataChange = (key, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const columns = [
    {
      title: "Fecha Consulta",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY");
        const dateB = moment(b.date, "DD/MM/YYYY");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
    },
    {
      title: "Veterinario",
      dataIndex: "vetName",
      key: "vetName",
    },
    {
      title: "Mascota",
      dataIndex: "petName",
      key: "petName",
    },
    {
      title: "Calificación",
      dataIndex: "qualification",
      key: "qualification",
      render: (_, record) => (
        <StarSelector
          qualification={record.qualification}
          onChange={(value) =>
            handleDataChange(record.key, "qualification", value)
          } // Se asegura de enviar el key y el campo correcto
          disabled={editingKey !== record.key && record.isSaved}
        />
      ),
    },
    {
      title: "Observación",
      dataIndex: "observation",
      key: "observation",
      render: (_, record) => {
        const isEditingRow = editingKey === record.key;

        return isEditingRow ? (
          <Input
            placeholder="Ingrese observación"
            value={record.observation || ""}
            onChange={(e) =>
              handleDataChange(record.key, "observation", e.target.value)
            }
            variant="outlined"
          />
        ) : (
          <span onClick={() => edit(record)}>{record.observation || ""}</span>
        );
      },
    },
    {
      title: "Acción",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Tooltip placement="top" title="Guardar cambios">
              <Button
                shape="circle"
                size="large"
                onClick={() => save(record.key)}
                // style={{marginRight: '5%'}}
                className="margin-right"
                disabled={editingKey !== record.key}
              >
                <CheckOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Cancelar cambios">
              <Button
                shape="circle"
                size="large"
                onClick={cancel}
                disabled={editingKey !== record.key}
              >
                <CloseOutlined />
              </Button>
            </Tooltip>
          </>
        ) : (
          <Tooltip placement="top" title="Editar calificación u observación">
            <Button
              shape="circle"
              size="large"
              className="appTableButton"
              onClick={() => edit(record)}
              disabled={editingKey !== "" || record.isSaved}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <Title className="appTitle">Calificaciones</Title>
        </Col>
      </Row>
      <Divider />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        // bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        scroll={{ x: 500 }}
        loading={isLoading}
        pagination={{ onChange: cancel }}
      />
    </>
  );
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex === "qualification" ? <StarSelector /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Ingrese ${title}` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
