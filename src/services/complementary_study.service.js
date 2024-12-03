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

export function createComplementaryStudy(data) {
  return axios({
    method: "post",
    url: `${basePATH}/complementary-study`, // Sin ID porque es una creación
    data: data,
    timeout: 1000 * 5, // 5 segundos
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => response)
    .catch((err) => {
      console.error("Error al crear el Complementary Study:", err);
      return null;
    });
}

export function getAllByVetId(vetId) {
  return axios({
    method: "get",
    url: `${basePATH}/complementary-study/studies/${vetId}`,
    timeout: 1000 * 5, // 5 segundos
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error("Error al obtener los estudios complementarios:", err);
      return null;
    });
}

export function getAllByTutorId(tutorId) {
  return axios({
    method: "get",
    url: `${basePATH}/complementary-study/tutorStudies/${tutorId}`,
    timeout: 1000 * 5, // 5 segundos
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error("Error al obtener los estudios complementarios:", err);
      return null;
    });
}
