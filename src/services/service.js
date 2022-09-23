import axios from 'axios'

const URL_LUGAR_TURISTICO = "https://firestore.googleapis.com/v1/projects/boliviatour-b483a/databases/(default)/documents/lugar_turistico/"
const URL_EMPRESA_TURISTICA = "https://firestore.googleapis.com/v1/projects/boliviatour-b483a/databases/(default)/documents/empresa_turistica/"
const URL_HOTEL = "https://firestore.googleapis.com/v1/projects/boliviatour-b483a/databases/(default)/documents/hotel/"

//export const getLugarTuristicoByIdA = (firestoreId) => {
//  return fetch(`${URL}${firestoreId}`).then((response) => response.json())
//}

export const getLugarTuristicoById = (firestoreId) => {
  return axios.get(`${URL_LUGAR_TURISTICO}${firestoreId}`)
}

export const getEmpresaTuristicaById = (firestoreId) => {
  return axios.get(`${URL_EMPRESA_TURISTICA}${firestoreId}`)
}

export const getHotelById = (firestoreId) => {
  return axios.get(`${URL_HOTEL}${firestoreId}`)
}