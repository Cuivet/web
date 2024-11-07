import React, { useState, useEffect, useContext } from "react";
import { Select, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import CUIVET_logo from "../../assets/img/png/logo2.png";
import { veterinaryAssociationService } from "../../services/veterinary_association.service";
import "./MenuTop.scss";
import MyContext from "../../MyContext";

const { Option } = Select;

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const [isVet, setIsVet] = useState(false);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [veterinariasAsociadas, setVeterinariasAsociadas] = useState([]);
  const { selectedVet, setSelectedVet } = useContext(MyContext);
  const [vetsLoaded, setVetsLoaded] = useState(false);
  const [selectedVetId, setSelectedVetId] = useState(undefined);

  const veterinariaParticular = {
    vetData: {
      vet: {
        id: null,
        name: "Atención particular",
      },
    },
  };

  useEffect(() => {
    if (profile.veterinary != null) {
      setIsVet(true);
      if (!vetsLoaded) {
        getVets();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vetsLoaded]);

  const getVets = async () => {
    try {
      let result =
        await veterinaryAssociationService.getAllDataByRegentOrVeterinary(
          profile.veterinary.id
        );
      // result.push(veterinariaParticular);
      setVeterinariasAsociadas(result);
      setVetsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = (e) => {
    sessionStorage.clear();
  };

  function onChangeSelectVet(value, option) {
    setSelectedVet(option);
    setSelectedVetId(value);
  }

  const tipoPerfil = () => {
    if (profile?.veterinary != null) {
      return "Veterinario: ";
    } else if (profile?.tutor != null) {
      return "Tutor: ";
    } else if (profile?.vetOwner != null) {
      return "Propietario: ";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (veterinariasAsociadas.length > 0) {
      const defaultVet = veterinariasAsociadas[0];
      setSelectedVetId(defaultVet.vetData.vet.id);
      const defaultOption = {
        key: defaultVet.vetData.vet.id,
        value: defaultVet.vetData.vet.id,
        children: defaultVet.vetData.vet.name,
      };
      setSelectedVet(defaultOption);
    }
  }, [veterinariasAsociadas]);

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={CUIVET_logo}
          alt="Juan Frattin"
        />
        <Button
          type="link"
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setMenuCollapsed(!menuCollapsed)}
        ></Button>
      </div>
      <h3 className="menu-top__center">
        CUIVET / {tipoPerfil()} {profile.person?.name}
      </h3>
      <div className="menu-top__right">
        {isVet && (
          <>
            <div className="menu-top__right-select-container">
              <label htmlFor="clinic-select" className="menu-top__right-label">
                Atendiendo en clínica:
              </label>
              <Select
                id="clinic-select"
                className="menu-top__right-select"
                onChange={onChangeSelectVet}
                style={{ width: "100px" }}
                value={selectedVetId}
                notFoundContent={
                  !!veterinariasAsociadas && "No tiene clínicas asociadas"
                }
              >
                {veterinariasAsociadas?.map((vet) => (
                  <Option key={vet.vetData?.vet.id} value={vet.vetData?.vet.id}>
                    {vet.vetData.vet.name}
                  </Option>
                ))}
              </Select>
            </div>
          </>
        )}
        <Tooltip title="Cerrar sesión" placement="left" color={"#5B2569"}>
          <Link to="/login">
            <Button
              type="link"
              shape="circle"
              to="/login"
              onClick={logOut}
              style={{ marginRight: "1vw" }}
              icon={<LogoutOutlined />}
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
