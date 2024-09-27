import React, { useEffect, useState } from "react";
import { getVetsByVetOwnerId } from "../../services/vet.service";
import {
  Row,
  Col,
  Typography,
  Tooltip,
  Button,
  Drawer,
  Divider,
  Badge,
  Card,
  Popconfirm,
  message,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import clinica from "../../assets/img/jpg/clinica.jpg";
import CardPet from "../../components/CardPet";
import CardVet from "../../components/CardVet";
import RegisterVetForm from "../../components/RegisterVetForm/RegisterVetForm";
import Meta from "antd/lib/card/Meta";

const { Title } = Typography;

export default function Vets() {
  const [isInit, setIsInit] = useState(false);
  const [vets, setVets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isFetchData, setIsFetchData] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [vetToDisplay, setVetToDisplay] = useState(null);

  if (!isInit) {
    setIsInit(true);
    getVetsByVetOwnerId(profile.vetOwner.id).then((response) => {
      setVets(response);
    });
  }

  const showDrawer = () => {
    // setVisible(true);
    setDisplayDrawer(true);
  };

  const onClose = () => {
    setVetToDisplay(null);
    // setVisible(false);
    setDisplayDrawer(false);
  };
  const displayVet = (id) => {
    setVetToDisplay(vets.find((vet) => vet.vet.id === id));
    setDisplayDrawer(true);
  };

  const tieneRegente = (vet) => {
    var texto = "";
    if (vet?.veterinaryData) {
      texto =
        "Regente: " +
        `${vet?.veterinaryData?.person.name} ${vet?.veterinaryData?.person.lastName}`;
    }
    return texto;
  };

  function Vet() {
    const renderVetList = [];
    if (vets.length) {
      vets.forEach((vet) => {
        renderVetList.push(
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <CardVet
              showVet={displayVet}
              key={vet.vet.id}
              item={vet.vet.id}
              title={vet.vet.name}
              popTitle={"¿Está seguro que desea borrar la clínica?"}
              img={vet.vet.photo ? vet.vet.photo : clinica}
              description={{
                address: vet.vet.address,
                hours: "Horarios de atención: ",
              }}
              regent={tieneRegente(vet)}
            ></CardVet>
          </Col>
        );
      });
    }
    return renderVetList;
  }

  // function Vet2() {
  //   const renderVetList = [];
  //   if (vets.length) {
  //     vets.forEach((vet) => {
  //       renderVetList.push(
  //         <Col xs={{ span: 24 }} lg={{ span: 6 }}>
  //           <Badge.Ribbon text={tieneRegente(vet)} color={"pink"}>
  //             <Card
  //               className="appCard"
  //               hoverable
  //               cover={<img alt="required text" src={clinica}></img>}
  //               actions={[
  //                 <Popconfirm
  //                   title="¿Está seguro que desea borrar la clínica?"
  //                   onConfirm={confirm}
  //                   okText="Si"
  //                   cancelText="No"
  //                   placement="top"
  //                   arrowPointAtCenter
  //                   icon={
  //                     <ExclamationCircleOutlined
  //                       fontSize="small"
  //                       style={{ color: "red" }}
  //                     />
  //                   }
  //                 >
  //                   <DeleteOutlined key="delete" />
  //                 </Popconfirm>,
  //               ]}
  //             >
  //               <Meta
  //                 className=""
  //                 title={
  //                   <Typography.Title
  //                     level={4}
  //                     style={{
  //                       color: "black",
  //                       fontWeight: "bold",
  //                     }}
  //                   >
  //                     {vet.vet.name}
  //                   </Typography.Title>
  //                 }
  //                 description={
  //                   <>
  //                     <Row>
  //                       <Typography.Text type="primary">
  //                         {vet.vet.address}
  //                       </Typography.Text>
  //                     </Row>
  //                     <Row>
  //                       <Typography.Text type="primary">
  //                         Horarios de atención:
  //                       </Typography.Text>
  //                     </Row>
  //                   </>
  //                 }
  //               />
  //             </Card>
  //           </Badge.Ribbon>
  //         </Col>
  //       );
  //     });
  //   }
  //   return renderVetList;
  // }

  function renderDrawer() {
    return (
      <Drawer
        title={
          vetToDisplay
            ? "Editar mi clínica"
            : "Registrar nueva clínica veterinaria"
        }
        onClose={onClose}
        visible={true}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <RegisterVetForm
          vet={vetToDisplay}
          registeredVet={registeredVet}
        ></RegisterVetForm>
      </Drawer>
    );
  }

  const registeredVet = () => {
    setIsInit(false);
    setVetToDisplay(null);
    setDisplayDrawer(false);
  };

  return (
    <>
      <Row>
        <Col span={22}>
          <Title className="appTitle">Mis Clínicas Veterinarias</Title>
        </Col>
        <Col span={2}>
          <Tooltip title="Agregar clínica veterinaria" placement="right">
            <Button
              type="link"
              className="appButton"
              size="large"
              onClick={showDrawer}
              icon={<PlusCircleOutlined />}
            />
          </Tooltip>
        </Col>
      </Row>
      <Divider></Divider>
      {displayDrawer ? renderDrawer() : null}
      {/* <Drawer
        title="Registrar nueva clínica veterinaria"
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <RegisterVetForm></RegisterVetForm>
      </Drawer> */}
      <Row>
        {vets.length ? Vet() : null}
        {/* {vets.length ? Vet2() : <>Aún no tienes veterinarios asociados</>} */}
      </Row>
    </>
  );
}
