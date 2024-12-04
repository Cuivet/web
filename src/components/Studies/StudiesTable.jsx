import React, { useEffect, useState, useRef, useContext } from "react";
// import { getAllByVetId } from "../../services/complementaryStudy.service.js";
import {
  getAllByVetId,
  getAllByTutorId,
} from "../../services/complementary_study.service.js";
import { Table, Button, Tooltip, Input, Space, Modal, message } from "antd";
import { SearchOutlined, DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import MyContext from "../../MyContext";

const StudiesTable = () => {
  const [studies, setStudies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const { selectedVet } = useContext(MyContext);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  var tutor = profile.tutor != null;
  var veterinary = profile.veterinary != null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (veterinary) {
          const response = await getAllByVetId(selectedVet.value);
          setStudies(response);
          generateDataVeterinary(response);
        } else if (tutor) {
          const response = await getAllByTutorId(profile.tutor.id);
          setStudies(response);
          generateDataTutor(response);
        }
      } catch (error) {
        console.error("Error al obtener los estudios complementarios:", error);
      }
    };
    fetchData();
  }, [selectedVet]);

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
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Cerrar
          </Button>
        </Space>
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
          {text.toString()}
        </span>
      ) : (
        text
      ),
  });

  const columns = veterinary
    ? [
        {
          title: "Tipo de Estudio",
          dataIndex: "studyTypeName",
          ...getColumnSearchProps("studyTypeName"),
          //   sorter: (a, b) => a.studyTypeName.length - b.studyTypeName.length,
          sorter: (a, b) => a.studyTypeName.localeCompare(b.studyTypeName),
          //   responsive: ["md"],
        },
        {
          title: "Fecha",
          dataIndex: "createdAt",
          sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          render: (text) => new Date(text).toLocaleDateString(),
          //   responsive: ["md"],
        },
        {
          title: "Mascota",
          dataIndex: "petName",
          ...getColumnSearchProps("petName"),
          //   sorter: (a, b) => a.petName.length - b.petName.length,
          sorter: (a, b) => a.petName.localeCompare(b.petName),

          //   responsive: ["md"],
        },
        {
          title: "Tutor",
          dataIndex: "tutorData",
          render: (tutorData) => tutorData,
          ...getColumnSearchProps("tutorData"),
          //   sorter: (a, b) => a.tutorData.length - b.tutorData.length,
          sorter: (a, b) => a.tutorData.localeCompare(b.tutorData),

          //   responsive: ["md"],
        },
        {
          title: "Veterinario",
          dataIndex: "veterinaryData",
          render: (veterinaryData) => veterinaryData,
          ...getColumnSearchProps("veterinaryData"),
          //   sorter: (a, b) => a.veterinaryData.length - b.veterinaryData.length,
          sorter: (a, b) => a.veterinaryData.localeCompare(b.veterinaryData),
          //   responsive: ["md"],
        },
        {
          title: "Acciones",
          dataIndex: "actions",
          render: (_, record) => (
            <Tooltip placement="left" title="Ver Estudio Complementario">
              <Button
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => window.open(record.URL, "_blank")}
              >
                <EyeOutlined />
              </Button>
            </Tooltip>
          ),
          align: "center",
          //   responsive: ["md"],
        },
      ]
    : [
        {
          title: "Tipo de Estudio",
          dataIndex: "studyTypeName",
          ...getColumnSearchProps("studyTypeName"),
          //   sorter: (a, b) => a.studyTypeName.length - b.studyTypeName.length,
          sorter: (a, b) => a.studyTypeName.localeCompare(b.studyTypeName),
          //   responsive: ["md"],
        },
        {
          title: "Fecha",
          dataIndex: "createdAt",
          sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          render: (text) => new Date(text).toLocaleDateString(),
          //   responsive: ["md"],
        },
        {
          title: "Mascota",
          dataIndex: "petName",
          ...getColumnSearchProps("petName"),
          //   sorter: (a, b) => a.petName.length - b.petName.length,
          sorter: (a, b) => a.petName.localeCompare(b.petName),

          //   responsive: ["md"],
        },
        {
          title: "Veterinario",
          dataIndex: "veterinaryData",
          render: (veterinaryData) => veterinaryData,
          ...getColumnSearchProps("veterinaryData"),
          //   sorter: (a, b) => a.veterinaryData.length - b.veterinaryData.length,
          //   responsive: ["md"],
          sorter: (a, b) => a.veterinaryData.localeCompare(b.veterinaryData),
        },
        {
          title: "Clínica Veterinaria",
          dataIndex: "vetName",
          ...getColumnSearchProps("vetName"),
          //   sorter: (a, b) => a.vetName.length - b.vetName.length,
          //   responsive: ["md"],
          sorter: (a, b) => a.vetName.localeCompare(b.vetName),
        },
        {
          title: "Dirección",
          dataIndex: "vetAddress",
          ...getColumnSearchProps("vetAddress"),
          //   sorter: (a, b) => a.vetAddress.length - b.vetAddress.length,
          //   responsive: ["md"],
          sorter: (a, b) => a.vetAddress.localeCompare(b.vetAddress),
        },
        {
          title: "Acciones",
          dataIndex: "actions",
          render: (_, record) => (
            <Tooltip placement="left" title="Ver Estudio Complementario">
              <Button
                shape="circle"
                // type="primary"
                size="large"
                className="margin-right"
                onClick={() => window.open(record.URL, "_blank")}
              >
                <EyeOutlined />
              </Button>
            </Tooltip>
          ),
          align: "center",
          //   responsive: ["md"],
        },
      ];

  function generateDataVeterinary(studies) {
    const finalData = studies.map((study, index) => ({
      key: index,
      studyTypeName: study.studyTypeName,
      createdAt: study.createdAt,
      petName: study.petName,
      veterinaryData:
        study.veterinaryData.name + " " + study.veterinaryData.lastName,
      tutorData: study.tutorData.name + " " + study.tutorData.lastName,
      URL: study.URL,
    }));
    setData(finalData);
  }

  function generateDataTutor(studies) {
    const finalData = studies.map((study, index) => ({
      key: index,
      studyTypeName: study.studyTypeName,
      createdAt: study.createdAt,
      petName: study.petName,
      veterinaryData:
        study.veterinaryData.name + " " + study.veterinaryData.lastName,
      vetName: study.vetData.name,
      vetAddress: study.vetData.address,
      URL: study.URL,
    }));
    setData(finalData);
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        scroll={{ x: 500 }}
      />
    </div>
  );
};

export default StudiesTable;
