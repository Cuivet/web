import { basePATH } from "./config";

export var vaccinationService = {
  findAll: findAll,
  findOneById: findOneById,
  registerVaccination: registerVaccination,
  updateVaccination: updateVaccination,
  findAllByPetId: findAllByPetId,
  deleteVaccination: deleteVaccination,
  findAllByVeterinaryId: findAllByVeterinaryId
};

async function findAll() {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vaccination/all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

async function findOneById(id) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vaccination/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

async function registerVaccination(data) {
  var axios = require("axios");
  return axios({
    method: "post",
    url: `${basePATH}/vaccination/`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

async function updateVaccination(data) {
  var axios = require("axios");
  return axios({
    method: "put",
    url: `${basePATH}/vaccination/update`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

export function findAllByPetId(petId) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vaccination/allByPetId/${petId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

export function findAllByVeterinaryId(veterinaryId) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vaccination/allByVeterinaryId/${veterinaryId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};

export function deleteVaccination(vaccinationId) {
  var axios = require("axios");
  return axios({
    method: "delete",
    url: `${basePATH}/vaccination/${vaccinationId}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
};