import React, { useState } from "react";
import { Layout, Divider, Typography, Row, Affix } from "antd";
import MenuTop from "../components/MenuTop";
import MenuSider from "../components/MenuSider/MenuSider";
import "./LayoutsAdmin.scss";
import MyContext from "../MyContext";
import { Button , Tooltip} from "antd";
import { QuestionCircleOutlined  } from "@ant-design/icons";

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
					<Footer className="layout-admin__footer" style={{ position: "relative" }}>
                    	<Divider />
                    	<Row style={{ display: "flex", justifyContent: "center" }}>
                    		<Typography.Title type="secondary" level={5}>
                    			Made with ❤ by Cuivet
                    		</Typography.Title>
                    	</Row>
						<Affix offsetBottom={20}>
                    	<Tooltip title="FAQ">
                    		<Button
                    			type="primary"
                    			shape="circle"
                    			href="https://www.youtube.com/@CUIVET/videos"
                    			target="_blank"
                    			icon={<QuestionCircleOutlined style={{ fontSize: "22px" }} />}
                    			style={{
                    				position: "absolute",
                    				bottom: "20px", // Ajusta esta distancia según lo necesario
                    				right: "60px", // Separación del borde derecho
									width: "50px",  // Tamaño aumentado
									height: "50px", // Tamaño aumentado
									fontSize: "20px",
									display: "flex", // Asegura un diseño flexible
									alignItems: "center", // Centrado vertical
									justifyContent: "center", // Centrado horizontal
									padding: 0,
								}}
                    		/>
                    	</Tooltip>
						</Affix>
                    </Footer>
				</Layout>
			</Layout>
		</MyContext.Provider>
	);
}
