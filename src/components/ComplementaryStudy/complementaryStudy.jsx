import React, { useEffect, useState } from "react";
import {
  Result,
  List,
  Divider,
  Row,
  Typography,
  Upload,
  message,
  Col,
  Button,
} from "antd";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import Icon, {
  InboxOutlined,
  LineOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { decodeId } from "../../utils/idEncoder";
import { uploadPDF } from "../../firebaseConfig"; // Función para subir PDFs
import {
  getComplementaryStudyById,
  updateComplementaryStudy,
} from "../../services/complementary_study.service";

const ComplementaryStudy = () => {
  const { encodedId } = useParams();

  // Estado para manejar errores en la decodificación o ID inválido
  const [error, setError] = useState(null);

  // Decodificar el ID y manejar posibles errores
  const id = React.useMemo(() => {
    try {
      if (!encodedId) {
        setError("No se encontró el ID en la URL.");
        return null;
      }
      return decodeId(encodedId);
    } catch {
      setError("El ID proporcionado no es válido.");
      return null;
    }
  }, [encodedId]);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Estado para indicar que se está subiendo el archivo
  const [downloadURL, setDownloadURL] = useState(""); // Estado para almacenar la URL de descarga
  const [complementaryStudy, setComplementaryStudy] = useState(null); // Datos del estudio
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar datos del estudio complementario al montar el componente si el ID es válido
  useEffect(() => {
    if (!id) return; // No continuar si no hay un ID válido

    const fetchComplementaryStudy = async () => {
      try {
        const study = await getComplementaryStudyById(id);
        if (!study) {
          setError("No se encontró el estudio complementario.");
        } else {
          setComplementaryStudy(study);
          setDownloadURL(study.url || ""); // Si hay un PDF existente, cargar su URL
        }
      } catch (error) {
        console.error("Error al obtener el estudio complementario:", error);
        setError("Hubo un problema al cargar el estudio complementario.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplementaryStudy();
  }, [id]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Por favor, sube un archivo PDF.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecciona un archivo para subir.");
      return;
    }

    setUploading(true);
    try {
      // Subir el archivo a Firebase y obtener la URL
      const url = await uploadPDF(file);
      setDownloadURL(url); // Guardar la URL del archivo subido

      // Actualizar el estudio complementario con la nueva URL del PDF
      const updatedStudy = { ...complementaryStudy, url: url };
      await updateComplementaryStudy(id, updatedStudy);

      message.success("Archivo subido con éxito.");
    } catch (error) {
      console.error(
        "Error al subir el archivo o actualizar el estudio:",
        error
      );
      message.error("Error al procesar la solicitud.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = () => {
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "archivo.pdf"; // Nombre predeterminado para descargar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No hay ningún archivo para descargar.");
    }
  };

  // Mostrar errores si existen
  if (error) {
    return (
      <div
        style={{
          border: "1px solid #f5c518", // Borde amarillo
          backgroundColor: "#fffbea", // Fondo suave
          color: "#856404", // Texto marrón claro
          borderRadius: "8px",
          padding: "20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Fuente más moderna
          margin: "20px auto",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <p
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}
        >
          ⚠️ Atención
        </p>
        <p style={{ fontSize: "16px" }}>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!complementaryStudy) {
    return <p>No se encontró el estudio complementario.</p>;
  }

  // Texto dinámico del botón según el estado
  const uploadButtonText = file
    ? downloadURL
      ? "Reemplazar archivo"
      : "Subir archivo"
    : "Selecciona un archivo";

  return (
    <>
      <Row align="center">
        <Col span={24}>
          <Result
            status={"success"}
            style={{ height: "100vh" }}
            icon={
              <Icon style={{ fontSize: "131px", color: "#523c89" }}>
                <BiotechOutlinedIcon />
              </Icon>
            }
            title={"Pedido de Estudios Complementarios"}
            subTitle={`Nro de Estudio: ${id} `}
            extra={[
              // <Col span={10} offset={7}>
              //   <List
              //     size=""
              //     header={<Divider>Estudios</Divider>}
              //     grid={{ gutter: 10, column: 1 }}
              //     dataSource={data}
              //     renderItem={(item) => (
              //       <List.Item>
              //         <Typography.Title style={{ textAlign: "left" }} level={5}>
              //           <ArrowRightOutlined style={{color:'#e6c4f3'}} /> {item}
              //         </Typography.Title>
              //       </List.Item>
              //     )}
              //   />
              // </Col>,
              <Col span={10} offset={7}>
                <Upload.Dragger multiple={false} showUploadList={false} onDragOver={handleDragOver} onDrop={handleDrop}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <p className="ant-upload-text">
                      Arrastra un archivo hasta aqui
                    </p>
                  )}
                </Upload.Dragger>
              </Col>,
              <Col span={10} offset={7} style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  onClick={handleUpload}
                  loading={uploading}
                  disabled={uploading}
                  style={{ marginRight: "10px" }}
                >
                  {uploading ? "Subiendo..." : uploadButtonText}
                </Button>
                <Button  href={downloadURL}>
                  Descargar archivo
                </Button>
              </Col>,
              // { downloadURL && (                
              // )
              // <Col span={10} offset={7}>
                
              // </Col>,
            ]}
          />
        </Col>
      </Row>
    </>

    // <div style={{ padding: '20px' }}>
    //   <h2>Pedido de estudio N: {id}</h2>
    //   <p>Descripción: {complementaryStudy.observation}</p>
    //   <div
    //     onDragOver={handleDragOver}
    //     onDrop={handleDrop}
    //     style={{
    //       border: '2px dashed #ddd',
    //       borderRadius: '10px',
    //       padding: '20px',
    //       textAlign: 'center',
    //       marginBottom: '20px',
    //     }}
    //   >
    //     {file ? (
    //       <p>{file.name}</p>
    //     ) : (
    //       <p>Arrastra y suelta un archivo PDF aquí</p>
    //     )}
    //   </div>
    //   <button onClick={handleUpload} style={{ marginRight: '10px' }} disabled={uploading}>
    //     {uploading ? "Subiendo..." : uploadButtonText}
    //   </button>
    //   {downloadURL && (
    //     <p>
    //       Archivo actual:{" "}
    //       <a href={downloadURL} target="_blank" rel="noopener noreferrer">
    //         Descargar PDF
    //       </a>
    //     </p>
    //   )}
    // </div>
  );
};

export default ComplementaryStudy;
