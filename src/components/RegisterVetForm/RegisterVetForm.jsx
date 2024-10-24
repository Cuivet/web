import React, { useState } from "react";
import { numberValidation } from "../../utils/formValidation";
import {
  Row,
  Col,
  Form,
  Button,
  Upload,
  notification,
  Input,
  Spin,
} from "antd";
import Autocomplete from "../Autocomplete/Autocomplete";
import ImgCrop from "antd-img-crop";
import { SaveOutlined } from "@ant-design/icons";
import { registerVet } from "../../services/vet.service";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function RegisterVetForm(props) {
  const [isInitData, setIsInitData] = useState(false);
  // const [isFetchData, setIsFetchData] = useState(false);
  const [vet, setVet] = useState(null);
  const [formValid, setFormValid] = useState(initFormValid());
  const [fileList, setFileList] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (!isInitData) {
    initVet();
    setIsInitData(true);
  }
  function initFormValid() {
    return {
      name: false,
      phone: false,
      address: false,
    };
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
  }

  console.log(props.vet, "vet");

  const changeForm = (e) => {
    setVet({
      ...vet,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    if (!vet.name || !vet.phone || !vet.address) {
      return notification["error"]({
        message: "Todos los campos son obligatorios",
        description:
          "Debe completar todos los campos para poder registrar una Clínica",
        placement: "top",
      });
    }
    const vetData = { ...vet, lat: latitude, lng: longitude };
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
    console.log("uplaoad: ", vet);
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
    setFormValid(initFormValid);
  };

  const handlePlaceSelected = (place) => {
    setLatitude(place.geometry.location.lat());
    setLongitude(place.geometry.location.lng());
    setVet({ ...vet, address: place.formatted_address });
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
              // onChange={inputValidation}
              value={vet.name}
              autoComplete="off"
              placeholder="introduzca el nombre"
              className="register-pet-form__input"
              // onSelect={inputValidation}
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
              // onChange={inputValidation}
              value={vet.phone}
              placeholder="introduzca el número de teléfono"
              className="register-pet-form__input"
              // onSelect={inputValidation}
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
