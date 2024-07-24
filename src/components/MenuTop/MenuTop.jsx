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
import { VetContext } from "../../context/MenuTopContext/MenuTopContext"; // Adjust the import path as needed
import "./MenuTop.scss";

const { Option } = Select;

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const [isVet, setIsVet] = useState(false);
  const [vetOptions, setVetOptions] = useState([]);
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const { selectedVetId, setSelectedVetId } = useContext(VetContext);

  useEffect(() => {
    if (profile.veterinary != null) {
      setIsVet(true);
      if (vetOptions.length === 0) {
        veterinaryAssociationService
          .getAllDataByRegentOrVeterinary(profile.veterinary.id)
          .then((response) => {
            setVetOptions(generateVetOptions(response));
          });
          setSelectedVetId(1);
      }
    }
  }, [profile.veterinary, vetOptions]);

  const logOut = (e) => {
    sessionStorage.clear();
  };

  function generateVetOptions(vets) {
    let renderVetOptions = [];
    let vetsData = [];
    vets.forEach(function eachVet(vet) {
      renderVetOptions.push(
        <Option key={vet.vetData.vet.id} value={vet.vetData.vet.id}>
          {vet.vetData.vet.name}
        </Option>
      );
      vetsData.push(vet.vetData);
    });
    sessionStorage.setItem("vets", JSON.stringify(vetsData));
    return renderVetOptions;
  }

  const handleVetChange = (value) => {
    setSelectedVetId(value);
    console.log('Selected value:', value);
  };

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
      <h3 className="menu-top__center">CUIVET</h3>
      <div className="menu-top__right">
        {isVet ? (
          <Select
            placeholder="Clínica"
            defaultActiveFirstOption
            defaultValue={selectedVetId}
            onChange={handleVetChange}
            className="menu-top__right-select"
          >
            {vetOptions}
          </Select>
        ) : null}

        <Tooltip title="Cerrar sesión" placement="left" color={"#5B2569"}>
          <Link to="/login">
            <Button
              type="link"
              shape="circle"
              to="/login"
              onClick={logOut}
              icon={<LogoutOutlined />}
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
