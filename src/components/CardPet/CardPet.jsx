import React, { useEffect, useState } from "react";
import { Card, Avatar, Popconfirm, message, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import Icon, {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deletePet } from "../../services/pet.service";
import AvatarUser from "../AvatarUser/AvatarUser";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import VaccinationModal from "../VaccinationModal/VaccinationModal";
import moment from "moment";
import { drugService } from "../../services/drug.service";
import { drugTypeService } from "../../services/drug_type.service";
import { findAllByPetId } from "../../services/vaccination.service";
import { veterinaryAssociationService } from "../../services/veterinary_association.service";

export default function CardPet(props) {
  const { img, title, description, avatar, item, popTitle } = props;
  const [showVaccination, setShowVaccination] = useState(false);
  const [vaccinationData, setVaccinationData] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [drugTypes, setDrugTypes] = useState([]);
  const [isInit, setIsInit] = useState(false);

  if (!isInit) {
    refreshComponent();
    setIsInit(true);
  }

  function refreshComponent() {
    console.log(item);
    drugTypeService.findAll().then((response) => {
        setDrugTypes(response);
      });
      drugService.findAll().then((response) => {
        setDrugs(response);
      });
      console.log(item)
      findAllByPetId(item).then((response) => {
        generatePetVaccinationData(response);
      });
  };


//   useEffect(() => {
    
//   }, [item]); // Dependencies array with item ensures the useEffect runs when item changes

  function AvatarGroup() {
    const group = [];
    if (Array.isArray(avatar)) {
      for (let i = 0; i < avatar.length; i++) {
        group.push(
          <AvatarUser
            key={i}
            icon={avatar[i]}
            preview={false}
            className="card-pet__avatar"
          />
        );
      }
    } else {
      group.push(
        <AvatarUser
          key={1}
          icon={avatar}
          preview={false}
          className="card-pet__avatar"
        />
      );
    }
    return group;
  }

  const confirm = () => {
    message.success(title + " borrada exitosamente.");
    deletePet(item);
    window.location.replace("");
  };

  const generatePetVaccinationData = (vaccinations) => {
    let finalData = [];
    vaccinations.forEach((vaccination) => {
      finalData.push({
        key: vaccination.id,
        petId: vaccination.petId,
        id: vaccination.id,
        placementDate: moment(vaccination.placementDate).format("DD/MM/YYYY"),
        drug: drugs.find((drug) => drug.id === vaccination.drugId).name,
        drugType: drugTypes.find(
          (drugType) =>
            drugType.id ===
            drugs.find((drug) => drug.id === vaccination.drugId).drugTypeId
        ).name,
        weight: vaccination.weight,
        signed: vaccination.signed,
        nextDate:
          vaccination.nextDate === null
            ? "-"
            : moment(vaccination.nextDate).format("DD/MM/YYYY"),
        observation: vaccination.observation,
      });
      veterinaryAssociationService
        .getAllByVeterinaryId(vaccination.veterinaryId)
        .then((response) => {
          console.log("veterinary: ", response);
        });
    });
    setVaccinationData(finalData);
  };

  const showVaccinationModal = () => {
    setShowVaccination(true);
  };

  const handleCancel = () => {
    setShowVaccination(false);
  };

  const displayPet = () => {
    props.showPet(item);
  };

  return (
    <>
      <Card
        className="appCard"
        hoverable
        style={{ width: 300 }}
        cover={<img alt="required text" src={img}></img>}
        actions={[
          <Tooltip placement="top" title="Ver/Editar Perfil">
            <EyeOutlined key="edit" onClick={displayPet} />
          </Tooltip>,
          <Tooltip placement="top" title="Vacunaciones">
            <Icon>
              <MedicationOutlinedIcon onClick={showVaccinationModal} />
            </Icon>
          </Tooltip>,
          <Popconfirm
            title={popTitle}
            onConfirm={confirm}
            okText="Si"
            cancelText="No"
            placement="top"
            arrowPointAtCenter
            icon={
              <ExclamationCircleOutlined
                fontSize="small"
                style={{ color: "red" }}
              />
            }
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>,
        ]}
      >
        <Meta
          className="card-pet__meta"
          avatar={
            <Avatar.Group>
              <AvatarGroup />
            </Avatar.Group>
          }
          title={title}
          description={description}
        />
      </Card>
      <VaccinationModal
        visible={showVaccination}
        onCancel={handleCancel}
        data={vaccinationData}
      />
    </>
  );
}
