import React, { useState } from "react";
import { numberValidation } from "../../utils/formValidation";
import { Row, Col, Form, Button, Upload, notification, Input } from "antd";
import ImgCrop from "antd-img-crop";
import { SaveOutlined } from "@ant-design/icons";
import { registerVet } from "../../services/vet.service";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function RegisterVetForm(props) {
  const [fileList, setFileList] = useState([]);
  const [input, setInput] = useState({
    name: null,
    mp: null,
    phone: null,
    address: null,
    photo: null,
  });
  const [formValid, setFormValid] = useState({
    name: false,
    mp: false,
    phone: false,
    address: false,
  });
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  const changeForm = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;
    if (type === "radio") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
    if (type === "text") {
      setFormValid({ ...formValid, [name]: e.target });
    }
    if (type === "number") {
      setFormValid({
        ...formValid,
        [name]: numberValidation(e.target),
      });
    }
    setInput({ ...input });
  };

  const register = (e) => {
    const newVet = {
      name: input.name,
      mp: null,
      address: input.address,
      phone: input.phone,
      vetOwnerId: profile.vetOwner.id,
    };
    if (!input.name || !input.address || !input.phone) {
      return notification["error"]({
        message: "Todos los campos son obligatorios",
        description:
          "Debe completar todos los campos para poder registrar una Clínica",
        placement: "top",
      });
    }
    if (fileList.length > 0 && input.photo == null) {
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
            setInput({ ...input, photo: url });
            newVet.photo = url;
            registerVet(newVet).then((res) => {
              resetForm();
              notification["success"]({
                message: "Clínica creada correctamente",
                placement: "top",
              });
              window.location.replace("");
            });
          });
        }
      );
    } else {
      registerVet(newVet).then((res) => {
        resetForm();
        notification["success"]({
          message: "Clínica creada correctamente",
          placement: "top",
        });
        window.location.replace("");
      });
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setInput({ ...input, photo: null });
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
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
      setInput({
        name: null,
        mp: null,
        address: null,
      });
      setFormValid({
        name: false,
        mp: false,
        address: false,
      });
    }
  };

  return (
    <Form
      className="register-pet-form"
      onFinish={register}
      onChange={changeForm}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <Input
              type="text"
              name="name"
              onChange={inputValidation}
              value={input.name}
              autoComplete="off"
              placeholder="Nombre"
              className="register-pet-form__input"
              onSelect={inputValidation}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Input
              type="number"
              name="phone"
              autoComplete="off"
              onChange={inputValidation}
              value={input.phone}
              placeholder="Teléfono"
              className="register-pet-form__input"
              onSelect={inputValidation}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Input
              type="text"
              name="address"
              autoComplete="off"
              onChange={inputValidation}
              value={input.address}
              placeholder="Dirección "
              className="register-pet-form__input"
              onSelect={inputValidation}
            />
          </Form.Item>
        </Col>
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
            <Button
              htmlType="submit"
              className="register-pet-form__button"
              icon={<SaveOutlined />}
            >
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
