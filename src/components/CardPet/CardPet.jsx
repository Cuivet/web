import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Popconfirm, message, Tooltip, Spin } from "antd";
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
  const [loadingData, setLoadingData] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const userPhoto = profile.person.photo;

  useEffect(() => {
    const fetchData = async () => {
      const drugTypesResponse = await drugTypeService.findAll();
      const drugsResponse = await drugService.findAll();

      setDrugTypes(drugTypesResponse);
      setDrugs(drugsResponse);
      setIsInit(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (drugs.length > 0 && drugTypes.length > 0 && isInit) {
      refreshComponent();
    }
  }, [drugs, drugTypes, isInit]);

  const refreshComponent = async () => {
    setLoadingData(true);
    try {
      const response = await findAllByPetId(item);
      await generatePetVaccinationData(response);
    } finally {
      setLoadingData(false);
    }
  };

  const generatePetVaccinationData = async (vaccinations) => {
    const veterinaryCache = {};

    const finalData = await Promise.all(
      vaccinations.map(async (vaccination) => {
        let veterinaryName = veterinaryCache[vaccination.veterinaryId];
        let vetName = "";
        if (!veterinaryName) {
          const response =
            await veterinaryAssociationService.getAllDataByRegentOrVeterinary(
              vaccination.veterinaryId
            );
          console.log(response[0].veterinaryData.person.name);
          veterinaryName =
            response[0].veterinaryData.person.name +
            " " +
            response[0].veterinaryData.person.lastName;
          vetName = response[0].vetData.vet.name;
          veterinaryCache[vaccination.veterinaryId] = veterinaryName;
        }

        return {
          key: vaccination.id,
          petId: vaccination.petId,
          id: vaccination.id,
          placementDate: moment(vaccination.placementDate).format("DD/MM/YYYY"),
          drug: drugs.find((drug) => drug.id === vaccination.drugId)?.name,
          drugType: drugTypes.find(
            (drugType) =>
              drugType.id ===
              drugs.find((drug) => drug.id === vaccination.drugId)?.drugTypeId
          )?.name,
          weight: vaccination.weight,
          signed: vaccination.signed,
          nextDate:
            vaccination.nextDate === null
              ? "-"
              : moment(vaccination.nextDate).format("DD/MM/YYYY"),
          observation: vaccination.observation,
          veterinaryName: veterinaryName,
          vetName: vetName,
        };
      })
    );
    console.log("finalData: ", finalData);
    setVaccinationData(finalData);
  };

  const confirm = () => {
    message.success(title + " borrada exitosamente.");
    deletePet(item);
    window.location.replace("");
  };

  const AvatarGroup = ({ avatar }) => {
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
      {/* <> */}
      <Card
        className="appCard"
        hoverable
        style={{ width: 300 }}
        cover={<img alt="required text" src={img}></img>}
        actions={[
          <Tooltip placement="top" title="Ver/Editar Mascota">
            <Button
              type="link"
              size="large"
              style={{ border: "none" }}
              icon={<EyeOutlined key="edit" />}
              onClick={displayPet}
            />
          </Tooltip>,
          <Tooltip placement="top" title="Carnet de vacunación">
            <Button
              type="link"
              size="large"
              style={{ border: "none" }}
              icon={
                <Icon>
                  <MedicationOutlinedIcon />
                </Icon>
              }
              onClick={showVaccinationModal}
            />
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
            <Button
              type="link"
              size="large"
              style={{ border: "none" }}
              icon={<DeleteOutlined key="delete" />}
            />
          </Popconfirm>,
        ]}
      >
        <Meta
          className="card-pet__meta"
          avatar={
            <Avatar.Group>
              <AvatarGroup avatar={userPhoto ? userPhoto : img} />
            </Avatar.Group>
          }
          title={title}
          description={description}
        />
      </Card>
      {loadingData ? (
        <Spin tip="Cargando datos de vacunación..." />
      ) : (
        <VaccinationModal
          visible={showVaccination}
          onCancel={handleCancel}
          data={vaccinationData}
        />
      )}
    </>
  );
}
