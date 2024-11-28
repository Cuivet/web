import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyAfCqEBOK5DUXCsRdYOLgMFC_r1uemD4EI",
  authDomain: "cuivet-5596d.firebaseapp.com",
  projectId: "cuivet-5596d",
  storageBucket: "cuivet-5596d.appspot.com",
  messagingSenderId: "315239198665",
  appId: "1:315239198665:web:e49525e93f62be8abf4218",
});

// Firebase storage reference
const storage = getStorage(app);

// Función para subir archivos PDF
export const uploadPDF = async (file) => {
  try {
    // Crear una referencia para el archivo PDF en la carpeta 'pdfs/'
    const pdfRef = ref(storage, `pdfs/${file.name}`);
    
    // Subir el archivo
    const snapshot = await uploadBytes(pdfRef, file);
    
    // Obtener la URL de descarga del archivo
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Archivo subido con éxito, URL:", downloadURL);
    
    return downloadURL;  // Puedes usar esta URL para almacenar el enlace al archivo en tu base de datos
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;  // Puedes manejar el error de acuerdo a tus necesidades
  }
};

export default storage;
