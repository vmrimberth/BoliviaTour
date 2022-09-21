import axios from 'axios'

const URL = "https://firestore.googleapis.com/v1/projects/boliviatour-b483a/databases/(default)/documents/lugar_turistico/"

//export const getLugarTuristicoByIdA = (firestoreId) => {
//  return fetch(`${URL}${firestoreId}`).then((response) => response.json())
//}

export const getLugarTuristicoById = (firestoreId) => {
  return axios.get(`${URL}${firestoreId}`)
}
