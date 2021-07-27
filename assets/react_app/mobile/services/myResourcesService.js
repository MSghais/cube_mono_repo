import axios from "axios";

export const actionsTypes = {
    getResources:"GET_RESOURCES"
}
export function findRessources(credentials) {
    return axios
        .get("http://192.168.43.94:8002/api/resources", credentials)
        .then(response => response.data)
        ;
}

export function getCommmentsResource(resourceId) {
    console.log(resourceId)

    return axios
    .get(`http://192.168.43.94:8002/api/resources/${resourceId}/comments`)
    .then(response => response.data)
    ;
}