import React, { useEffect, useState, useRef } from "react";
import {
  getUsers,
  activateUser,
  deactivateUser,
} from "../../services/user.service.js";
import { Table, Button, Tooltip, Input, Space, Modal, message } from "antd";
import {
  SearchOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const { confirm } = Modal;

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const data = response.data;
      setUsers(data);
      generateData(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      await activateUser(id);
      setUsers(
        users.map((user) => (user.id === id ? { ...user, active: true } : user))
      );
      message.success("Usuario activado con éxito");
      fetchUsers();
    } catch (error) {
      console.error("Error al activar el usuario:", error);
      message.error("Error al activar el usuario");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateUser(id);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: false } : user
        )
      );
      message.success("Usuario desactivado con éxito");
      fetchUsers();
    } catch (error) {
      console.error("Error al desactivar el usuario:", error);
      message.error("Error al desactivar el usuario");
    }
  };

  const columns = [
    {
      title: "ID Usuario",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      responsive: ["md"],
    },
    {
      title: "Nombre Usuario",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
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
            <Tooltip placement="top" title="Desactivar Usuario">
              {" "}
              <Button
                shape="circle"
                onClick={() => showConfirm(record, "desactivar")}
              >
                <UserDeleteOutlined
                  style={{ fontSize: "24px", color: "#5B2569" }}
                />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="Activar Usuario">
              {" "}
              <Button
                shape="circle"
                onClick={() => showConfirm(record, "activar")}
              >
                <UserAddOutlined
                  style={{ fontSize: "24px", color: "#5B2569" }}
                />
              </Button>{" "}
            </Tooltip>
          )}{" "}
        </>
      ),
      align: "center",
    },
  ];

  function generateData(users) {
    var finalData = [];
    users?.forEach((user) => {
      if (user?.id !== 1) {
        finalData.push({
          key: user?.id,
          id: user?.id,
          email: user?.email,
          dni: user?.person.dni,
          name: user?.person?.name,
          lastname: user?.person?.lastName,
          active: user?.active,
        });
      }
    });
    setData(finalData);
  }

  const showConfirm = (user, action) => {
    confirm({
      title: `¿Estás seguro que deseas ${action} al usuario ${user.name}?`,
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
        message.info(`Acción cancelada para el usuario ${user.name}`);
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
export default AllUsers;
