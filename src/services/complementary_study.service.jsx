import { basePATH } from "./config";
import axios from "axios";

export function getComplementaryStudyById(studyId) {
    return axios({
      method: "get",
      url: `${basePATH}/complementary-study/${studyId}`,
      timeout: 1000 * 5, // 5 segundos
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.data)
      .catch((err) => {
        console.error("Error al obtener el Complementary Study:", err);
        return null;
      });
  }

  export function updateComplementaryStudy(studyId, data) {
    return axios({
      method: "put", // Cambiado a PUT
      url: `${basePATH}/complementary-study/${studyId}`, // URL con el ID
      data: data, // Datos actualizados
      timeout: 1000 * 5, // 5 segundos
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response)
      .catch((err) => err);
  }