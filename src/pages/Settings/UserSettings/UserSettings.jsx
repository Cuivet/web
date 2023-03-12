import React, {useState} from "react";
import { Row, Form, Col, Upload, Typography, Button, Tooltip,  Divider, message } from "antd";
import ImgCrop from 'antd-img-crop';
import { DeleteOutlined, SaveOutlined, LockOutlined } from "@ant-design/icons";
import { personService } from "../../../services/person.service";
import './UserSettings.scss'
import ShowUser from "../../../components/ShowUser";
import storage from "../../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
const {Title} = Typography;
 
export default function UserSettings(){
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profile'))); 
    const [fileList, setFileList] = useState( profile.person.photo ? [{uid: '-1', name: 'image.png', status: 'done', url: profile.person.photo}] : []);
    const [formData, setFormData] = useState({
        id: profile.person.id,
        name: profile.person.name,
        lastName: profile.person.lastName,
        phone: profile.person.phone,
        dni: profile.person.dni,
        address: profile.person.address,
        email: sessionStorage.getItem('email'),
        mp: profile.veterinary != null ? profile.veterinary.mp : null,
        photo: profile.person.photo
    });

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setFormData({...formData, photo: null});
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
 
    const changeForm = fd => {
        setFormData({
            ...formData,
            [fd.target.name]: fd.target.value
        });
    };
 
    function updatePerson(){
        if (fileList.length > 0 && formData.photo == null) {
            const storageRef = ref(storage, `/persons/` + new Date().toString());
            const uploadTask = uploadBytesResumable(storageRef, fileList[0].originFileObj);
            uploadTask.on(
                "state_changed", 
                (snapshot) => {
                    // const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    // se esta cargando la foto, prender un spinner tengo el percent aca 
                },
                (err) => console.log(err),
                () => {
                    // se cargo la foto, ya tengo el url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        formData.photo = url;
                        personService.update(formData)
                            .then(res => {
                                let updatedProfile = JSON.parse(sessionStorage.getItem('profile'));
                                updatedProfile.person = res;
                                sessionStorage.setItem('profile',JSON.stringify(updatedProfile));
                                setProfile(updatedProfile);
                                message.success(`El cambio se ha realizado con éxito.`);
                            });
                    });
                }
            );
        } else {
            personService.update(formData)
                .then(res => {
                    let updatedProfile = JSON.parse(sessionStorage.getItem('profile'));
                    updatedProfile.person = res;
                    sessionStorage.setItem('profile',JSON.stringify(updatedProfile));
                    setProfile(updatedProfile);
                    message.success(`El cambio se ha realizado con éxito.`);
                });
        }
    }
 
    return (
        <>
            <Row align="middle">
                <Col span={22}>
                    <Title className='appTitle'>Mi Cuenta</Title>
                </Col>
                <Col span={2}>
                    <Tooltip title="Eliminar mi cuenta" placement='right'>
                        <Button type='link' className="appButton" size='large' icon={<DeleteOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>
            
            <Row>
                <Col xs={{span: 24}}md={{span: 24}}>
                    <Divider orientation="left">Mi información de usuario</Divider>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <ImgCrop rotate>
                            <Upload customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}>
                                    {fileList.length < 1 && '+ Subir'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Col> 
                <Col xs={{span: 24}}md={{span: 24}}>
                    <ShowUser formData={formData} refreshUser={changeForm}></ShowUser>
                </Col>
            </Row>
                
            <Row align="middle">
                <Col xs={{span: 24}}md={{span: 24}}>
                    <Button shape="round" htmlType="submit" className="update-User-form__button" icon={<LockOutlined />}> Cambiar Contraseña </Button>
                    <Button shape="round" htmlType="submit" className="update-User-form__button" icon={<SaveOutlined />} onClick={updatePerson}> Guardar </Button>
                </Col>
            </Row>
        </>
   
    )
};
 
