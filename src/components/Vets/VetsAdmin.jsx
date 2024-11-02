import React, { useEffect, useState, useRef } from "react";
import {
  getAllVets,
  deactivateVet,
  activateVet,
} from "../../services/vet.service.js";
import { Table, Button, Tooltip, Input, Space, Modal, message } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";

const AllVets = () => {
  const [vets, setVets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const { confirm } = Modal;

  const fetchVets = async () => {
    try {
      const response = await getAllVets();
      setVets(response);
      generateData(response);
    } catch (error) {
      console.error("Error al obtener las veterinarias:", error);
    }
  };

  useEffect(() => {
    fetchVets();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {" "}
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />{" "}
        <Space>
          {" "}
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {" "}
            Buscar{" "}
          </Button>{" "}
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {" "}
            Reset{" "}
          </Button>{" "}
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {" "}
            Filtrar{" "}
          </Button>{" "}
          <Button type="link" size="small" onClick={() => close()}>
            {" "}
            Cerrar{" "}
          </Button>{" "}
        </Space>{" "}
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>
          {" "}
          {text.toString()}{" "}
        </span>
      ) : (
        text
      ),
  });

  const handleActivate = async (id) => {
    try {
      await activateVet(id);
      setVets(
        vets.map((vet) => (vet.id === id ? { ...vet, active: true } : vet))
      );
      message.success("Clínica veterinaria activado con éxito");
      fetchVets();
    } catch (error) {
      console.error("Error al activar Clínica veterinaria:", error);
      message.error("Error al activar Clínica veterinaria");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateVet(id);
      setVets(
        vets.map((vet) => (vet.id === id ? { ...vet, active: false } : vet))
      );
      message.success("Clínica veterinaria desactivado con éxito");
      fetchVets();
    } catch (error) {
      console.error("Error al desactivar Clínica veterinaria", error);
      message.error("Error al desactivar Clínica veterinaria");
    }
  };

  const columns = [
    {
      title: "ID Veterinaria",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      responsive: ["md"],
    },
    {
      title: "Nombre",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Dirección",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Estado",
      dataIndex: "active",
      sorter: (a, b) => a.active - b.active,
      render: (text, record) => (
        <span>{record.active ? "Activo" : "Inactivo"}</span>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          {" "}
          {record.active ? (
            <Tooltip placement="top" title="Desactivar Clínica Veterinaria">
              {" "}
              <Button
                shape="circle"
                onClick={() => showConfirm(record, "desactivar")}
              >
                {" "}
                <FormOutlined />{" "}
              </Button>{" "}
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="Activar Clínica Veterinaria">
              {" "}
              <Button
                shape="circle"
                onClick={() => showConfirm(record, "activar")}
              >
                {" "}
                <FormOutlined />{" "}
              </Button>{" "}
            </Tooltip>
          )}{" "}
        </>
      ),
      align: "center",
    },
  ];

  function generateData(vets) {
    var finalData = [];
    vets?.forEach((vet) => {
      finalData.push({
        key: vet?.id,
        id: vet?.id,
        address: vet?.address,
        name: vet?.name,
        phone: vet?.phone,
        active: vet?.active,
      });
    });
    setData(finalData);
  }

  const showConfirm = (user, action) => {
    confirm({
      title: `¿Estás seguro que deseas ${action} a la clínica veterinaria ${user.name}?`,
      okText: "Sí",
      cancelText: "No",
      onOk() {
        if (action === "activar") {
          handleActivate(user.id);
        } else if (action === "desactivar") {
          handleDeactivate(user.id);
        }
      },
      onCancel() {
        message.info(`Acción cancelada`);
      },
    });
  };

  return (
    <div>
      {" "}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        rowClassName={(record) => (record.active ? "" : "inactive-user")}
      />{" "}
    </div>
  );
};
export default AllVets;
