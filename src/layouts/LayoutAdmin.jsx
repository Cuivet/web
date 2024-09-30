import React, { useState } from "react";
import { Layout, Divider, Typography, Row } from "antd";
import MenuTop from "../components/MenuTop";
import MenuSider from "../components/MenuSider/MenuSider";
import "./LayoutsAdmin.scss";
import MyContext from "../MyContext";

export default function LayoutAdmin(props) {
	const { children } = props;
	const { Header, Content, Footer } = Layout;
	const [menuCollapsed, setMenuCollapsed] = useState(true);
	const [selectedVet, setSelectedVet] = useState(null);

	// const user = null;

	// if(!user){
	//     return(
	//         <Navigate to="/admin/login" replace={true} />
	//     );

	// }

	return (
		<MyContext.Provider value={{ selectedVet, setSelectedVet }}>
			<Layout>
				<MenuSider menuCollapsed={menuCollapsed} />
				<Layout className="layout-admin">
					<Header className="layout-admin__header">
						<MenuTop
							menuCollapsed={menuCollapsed}
							setMenuCollapsed={setMenuCollapsed}
						/>
					</Header>

					<Content className="layout-admin__content">{children}</Content>
					<Footer className="layout-admin__footer">
						<Divider />
						<Row style={{ display: "flex", justifyContent: "flex-end" }}>
							<Typography.Title type="secondary" level={5}>
								Made with ❤ by Cuivet
							</Typography.Title>
						</Row>
					</Footer>
				</Layout>
			</Layout>
		</MyContext.Provider>
	);
}
