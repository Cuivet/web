import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Modal, Table, Button } from "antd";
import moment from "moment";
import React from "react";
import '../ConsultationVisits/ConsultationVisits.scss'

export default function VaccinationModal(props) {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "placementDate",
      key: "placementDate",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = moment(a.placementDate, "DD/MM/YYYY");
        const dateB = moment(b.placementDate, "DD/MM/YYYY");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
      // width: 120,
      // responsive: ["sm"],
    },
    {
      title: "Verinario",
      dataIndex: "veterinaryName",
      key: "veterinaryName",
      sorter: (a, b) => a.veterinaryName.length - b.veterinaryName.length,
      // width: 150,
    },
    {
      title: "Clinica",
      dataIndex: "vetName",
      key: "vetName",
      sorter: (a, b) => a.vetName.length - b.vetName.length,
      // width: 150,
    },
    {
      title: "Profilaxis",
      dataIndex: "drugType",
      key: "drugType",
      sorter: (a, b) => a.drugType.length - b.drugType.length,
      width: 150,
    },
    {
      title: "Droga",
      dataIndex: "drug",
      key: "drug",
      sorter: (a, b) => a.drug.length - b.drug.length,
      // width: 100,
      // responsive: ["xs"],
    },

    {
      title: "Peso (Kg)",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight - b.weight,
      // responsive: ["xs"],
      // align: "center",
      // width: 150,
    },
    {
      title: "Observaciones",
      dataIndex: "observation",
      key: "observation",
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "Firma",
      dataIndex: "signed",
      key: "signed",
      width: 70,
      align: "center",
      render: (text, record) => (
        <>
          {record.signed ? (
            <CheckCircleTwoTone
              style={{ fontSize: 20 }}
              twoToneColor={"#52c41a"}
            />
          ) : (
            <CloseCircleTwoTone
              style={{ fontSize: 20 }}
              twoToneColor={"#f5222d"}
            />
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Modal
        title="Carnet de Vacunación"
        visible={props.visible}
        onCancel={props.onCancel}
        width={800}
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Cerrar
          </Button>,
        ]}
      >
        <Table
          className="visits-list"
          columns={columns}
          dataSource={props.data}
          // scroll={{ x: 500 }}
          pagination={false}
          size="small"
        />
      </Modal>
    </>
  );
}
