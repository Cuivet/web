import React from "react";
import {
  Row,
  Typography,
  Card,
  Avatar,
  Popconfirm,
  message,
  Tooltip,
  Button,
  Badge,
} from "antd";
import Meta from "antd/lib/card/Meta";
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deletePet } from "../../services/pet.service";
import AvatarUser from "../AvatarUser/AvatarUser";

export default function CardVet(props) {
  const { img, title, description, item, popTitle, regent } = props;
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const userPhoto = profile.person.photo;
  function AvatarGroup({ avatar }) {
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

  const displayVet = () => {
    props.showVet(item);
  };

  return (
    <>
      <Badge.Ribbon
        style={{ display: regent ? "block" : "none" }}
        text={regent}
        color={"pink"}
      >
        <Card
          className="appCard"
          hoverable
          cover={<img alt="required text" src={img}></img>}
          actions={[
            <Tooltip placement="top" title="Ver/Editar Clínica">
              <Button
                type="link"
                size="large"
                style={{ border: "none" }}
                icon={<EyeOutlined key="edit" />}
                onClick={displayVet}
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
                disabled={!!regent}
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
            description={
              <>
                <Row>
                  <Typography.Text type="primary">
                    {description.address}
                  </Typography.Text>
                </Row>
                {/* {description?.hours.map((hour, index) => (
                  <Row key={index} justify="center">
                    <Typography.Text type="secondary">
                      {hour.openTime && hour.closeTime
                        ? `${hour.dayOfWeek}: ${moment(
                            hour.openTime,
                            "HH:mm:ss"
                          ).format("HH:mm")} - ${moment(
                            hour.closeTime,
                            "HH:mm:ss"
                          ).format("HH:mm")}`
                        : `${hour.dayOfWeek}: Cerrado`}
                    </Typography.Text>
                  </Row>
                ))} */}
              </>
            }
          />
        </Card>
      </Badge.Ribbon>
    </>
  );
}
