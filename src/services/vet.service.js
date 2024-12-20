import { basePATH } from "./config";

export function registerVet(data) {
  var axios = require("axios");
  return axios({
    method: "post",
    url: `${basePATH}/vet/register`,
    data: data,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

export function getVetsByVetOwnerId(vetOwnerId) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vet/allByVetOwnerId/${vetOwnerId}`,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function registerTemporalAssociation(data) {
  var axios = require("axios");
  return axios({
    method: "post",
    url: `${basePATH}/vet/registerTemporalAssociation`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getTemporalAssociationByCode(code) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vet/temporalAssociationByCode/${code}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then((response) => {
    return response.data;
  });
}

export function registerRegentOnVet(data) {
  var axios = require("axios");
  return axios({
    method: "put",
    url: `${basePATH}/vet/`,
    data: data,
    timeout: 1000 * 60, // Wait for 5 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

export function getAllByRegentId(id) {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vet/allByRegentId/${id}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getAllVets() {
  var axios = require("axios");
  return axios({
    method: "get",
    url: `${basePATH}/vet/all`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function deactivateVet(id) {
  var axios = require("axios");
  return axios({
    method: "put",
    url: `${basePATH}/vet/deactivate/${id}`,
    data: { id: id },
    timeout: 1000 * 60,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

export function activateVet(id) {
  var axios = require("axios");
  return axios({
    method: "put",
    url: `${basePATH}/vet/activate/${id}`,
    data: { id: id },
    timeout: 1000 * 5,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      token: sessionStorage.getItem("token"),
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteVet(vetId) {
  var axios = require('axios');
  return axios({
      method: "delete",
      url: `${basePATH}/vet/${vetId}`,
      timeout: 1000 * 5, // Wait for 5 seconds
      headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
          "token": sessionStorage.getItem('token'),
      }
      })
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
          return err;
      });
};
