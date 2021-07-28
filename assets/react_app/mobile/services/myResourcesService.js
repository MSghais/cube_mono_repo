import axios from "axios";
import TokenManager from './security/TokenManager'

export const resourcesTypes = {
    getResources:"GET_RESOURCES",
    loading:"LOADING_RESOURCES",
    unload:"UNLOADING"
}
export function findRessources(credentials) {
    return axios
        .get("http://192.168.0.16:8002/api/resources", credentials)
        .then(response => response.data);
}

export function getCommmentsResource(resourceId) {
    console.log(resourceId)

    return axios
    .get(`http://192.168.0.16:8002/api/resources/${resourceId}/comments`)
    .then(response => response.data);
}

export function moderateResource(token) {

    const role = TokenManager.getRole(token)

    if(role !== "ROLE_MODERATOR") {
        return false
    }

    return axios
    .get(`http://192.168.0.16:8002/api/resources/${resourceId}/comments`)
    .then(response => response.data);
}