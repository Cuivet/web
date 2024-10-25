import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Upload,
  notification,
  Input,
  Spin,
  Checkbox,
  TimePicker,
  Typography,
} from "antd";
import Autocomplete from "../Autocomplete/Autocomplete";
import ImgCrop from "antd-img-crop";
import { SaveOutlined } from "@ant-design/icons";
import { registerVet } from "../../services/vet.service";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { RangePicker } = TimePicker;

export default function RegisterVetForm(props) {
  const [isInitData, setIsInitData] = useState(false);
  const [vet, setVet] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const profile = JSON.parse(sessionStorage.getItem("profile"));
  const [hours, setHours] = useState([
    { dayOfWeek: "Lunes", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Martes", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Miércoles", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Jueves", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Viernes", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Sábado", openTime: null, closeTime: null, closed: false },
    { dayOfWeek: "Domingo", openTime: null, closeTime: null, closed: false },
  ]);

  if (!isInitData) {
    initVet();
    setIsInitData(true);
  }

  function initVet() {
    const vet = props.vet?.vet;
    if (vet) {
      if (vet.photo) {
        setFileList([
          { uid: "-1", name: "image.png", status: "done", url: vet.photo },
        ]);
      }
    }
    setVet({
      id: vet ? vet.id : null,
      name: vet ? vet.name : null,
      phone: vet ? vet.phone : null,
      address: vet ? vet.address : null,
      photo: vet ? vet.photo : null,
      vetOwnerId: profile.vetOwner.id,
    });
    setLatitude(vet ? vet.lat : "");
    setLongitude(vet ? vet.lng : "");
    setHours(
      vet
        ? props.vet?.hours
        : [
            {
              dayOfWeek: "Lunes",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Martes",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Miércoles",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Jueves",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Viernes",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Sábado",
              openTime: null,
              closeTime: null,
              closed: false,
            },
            {
              dayOfWeek: "Domingo",
              openTime: null,
              closeTime: null,
              closed: false,
            },
          ]
    );
  }

  const changeForm = (e) => {
    setVet({
      ...vet,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    const invalidHours = hours.some(
      (hour) => !hour.closed && (!hour.openTime || !hour.closeTime)
    );
    if (!vet.name || !vet.phone || !vet.address || invalidHours) {
      return notification["error"]({
        message: "Todos los campos son obligatorios",
        description:
          "Debe completar todos los campos para poder registrar una Clínica",
        placement: "top",
      });
    }

    const vetData = { ...vet, lat: latitude, lng: longitude, hours };
    if (fileList.length > 0 && vet.photo == null) {
      const storageRef = ref(storage, `/vets/` + new Date().toString());
      const uploadTask = uploadBytesResumable(
        storageRef,
        fileList[0].originFileObj
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // se esta cargando la foto, prender un spinner tengo el percent aca
        },
        (err) => {
          console.log(err);
        },
        () => {
          // se cargo la foto, ya tengo el url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // setVet({ ...vet, photo: url });
            vetData.photo = url;
            uploadVet(vetData);
          });
        }
      );
    } else {
      uploadVet(vetData);
    }
  };

  const uploadVet = (vet) => {
    registerVet(vet).then((res) => {
      resetForm();
      props.registeredVet();
      if (vet.id) {
        return notification["success"]({
          message: "Clínica actualizada correctamente",
          placement: "top",
        });
      }
      notification["success"]({
        message: "Clínica creada correctamente",
        placement: "top",
      });
    });
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setVet({ ...vet, photo: null });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const resetForm = () => {
    initVet(null);
  };

  const handlePlaceSelected = (place) => {
    setLatitude(place.geometry.location.lat());
    setLongitude(place.geometry.location.lng());
    setVet({ ...vet, address: place.formatted_address });
  };

  const handleTimeChange = (times, timeStrings, day) => {
    setHours((prevHours) =>
      prevHours?.map((hour) =>
        hour.dayOfWeek === day
          ? { ...hour, openTime: timeStrings[0], closeTime: timeStrings[1] }
          : hour
      )
    );
  };

  const handleClosedChange = (day) => {
    setHours((prevHours) =>
      prevHours?.map((hour) =>
        hour.dayOfWeek === day
          ? {
              ...hour,
              closed: !hour.closed,
              openTime: !hour.closed ? null : hour.openTime,
              closeTime: !hour.closed ? null : hour.closeTime,
            }
          : hour
      )
    );
  };

  return !isInitData ? (
    <Spin tip="Cargando..." />
  ) : (
    <Form
      className="register-pet-form"
      onFinish={register}
      onChange={changeForm}
    >
      <Row gutter={16}>
        <Col span={20} offset={4}>
          <Form.Item>
            <ImgCrop rotate>
              <Upload
                customRequest={({ onSuccess }) =>
                  setTimeout(() => {
                    onSuccess("ok", null);
                  }, 0)
                }
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Subir"}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Input
              addonBefore="Nombre clínica: "
              type="text"
              name="name"
              value={vet.name}
              autoComplete="off"
              placeholder="introduzca el nombre"
              className="register-pet-form__input"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Input
              addonBefore="Teléfono: "
              type="number"
              name="phone"
              autoComplete="off"
              value={vet.phone}
              placeholder="introduzca el número de teléfono"
              className="register-pet-form__input"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Autocomplete
              onPlaceSelected={handlePlaceSelected}
              value={vet.address}
            />
          </Form.Item>
        </Col>
        <Col span={24} align="center">
          <Typography.Text type="primary">
            {"Horarios de atención: "}
          </Typography.Text>
        </Col>
        {hours?.map((hour) => (
          <Row key={hour.dayOfWeek} gutter={[16, 16]} align="middle">
            <Col span={6}>
              <Form.Item style={{ marginBottom: 0 }}>
                <span>{hour.dayOfWeek}: </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item style={{ marginBottom: "5px" }}>
                <RangePicker
                  value={
                    hour.openTime && hour.closeTime
                      ? [
                          dayjs(hour.openTime, "HH:mm"),
                          dayjs(hour.closeTime, "HH:mm"),
                        ]
                      : [null, null]
                  }
                  onChange={(times, timeStrings) =>
                    handleTimeChange(times, timeStrings, hour.dayOfWeek)
                  }
                  format="HH:mm"
                  placeholder={["Hora de apertura", "Hora de cierre"]}
                  disabled={hour.closed}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item style={{ marginBottom: 0 }}>
                <Checkbox
                  checked={hour.closed}
                  onChange={() => handleClosedChange(hour.dayOfWeek)}
                >
                  Cerrado
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        ))}

        {props.disabled ? null : (
          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                className="register-pet-form__button"
                icon={<SaveOutlined />}
              >
                Guardar
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
}
