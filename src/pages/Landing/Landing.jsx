import CUIVET_logo from "../../assets/img/png/logo2.png";
import fondo from "../../assets/img/png/landing.png";
import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";

import "./Landing.scss";

const { Content } = Layout;

export default function Landing() {
  return (
    <Layout
      className="layout"
      style={{ backgroundColor: "#E9C4F2", height: "100vh" }}
    >
      <Content
        className="content"
        style={{ backgroundColor: "#fff", height: "calc(100% - 134px)" }}
      >
        <div
          className="site-card-wrapper"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src={fondo} alt={`Pet ${fondo}`} className="fondo" />

          <div
            className="site-card-wrapper-inner"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <h1 className="title">
              <img className="logo-img" src={CUIVET_logo} alt="logo" /> CUIVET
            </h1>
            <h1 className="Secondary-title">
              ¡Maneja la salud de tus mascotas en un solo lugar!
            </h1>
            <Link to={"/login"}>
              <Button className="btn">INGRESAR</Button>
            </Link>
          </div>
          <div className="footer">
            <p style={{ fontWeight: "bold", fontSize: "1vw" }}>
              © 2024 Developed by CUIVET Team
            </p>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
