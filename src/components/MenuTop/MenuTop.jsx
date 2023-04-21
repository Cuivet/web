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
				// Comprobar si los datos de las veterinarias ya se han cargado
				getVets();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vetsLoaded]); // Agregar vetsLoaded como dependencia del useEffect

	const getVets = async () => {
		try {
			let result =
				await veterinaryAssociationService.getAllDataByRegentOrVeterinary(
					profile.veterinary.id
				);
			result.push(veterinariaParticular);
			setVeterinariasAsociadas(result);
			setVetsLoaded(true); // Cambiar el valor de la variable de estado
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = (e) => {
		sessionStorage.clear();
	};

	function onChangeSelectVet(value, option) {
		setSelectedVet(option);
	}

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
					<MyContext.Provider value={selectedVet}>
						<Select
							// placeholder={veterinariasAsociadas[0]?.vetData.vet.name}
							className="menu-top__right-select"
							defaultValue={null}
							onChange={onChangeSelectVet}
						>
							{veterinariasAsociadas?.map((vet) => (
								<Option key={vet.vetData?.vet.id} value={vet.vetData?.vet.id}>
									{vet.vetData.vet.name}
								</Option>
							))}
						</Select>
					</MyContext.Provider>
				) : (
					<></>
				)}

				<Tooltip title="Cerrar sesión" placement="left" color={"#5B2569"}>
					<Link to="/login">
						<Button
							type="link"
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
