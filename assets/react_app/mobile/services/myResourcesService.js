import axios from "axios";
import { useDispatch } from "react-redux";
import TokenManager from './security/TokenManager'
export const resourcesTypes = {
    getResources: "GET_RESOURCES",
    getCommmentsResource: "GET_COMMENT_RESOURCE",
    loading: "LOADING_RESOURCES",
    unload: "UNLOADING"
}

// export const findRessources = (credentials) => {
export function findRessources(credentials) {

    // dispatch({ type: resourcesTypes.loading })

    return axios
        .get("http://192.168.43.94:8002/api/resources", credentials)
        .then(response => response.data)
      
        .catch(err => {
            return {
                status: 500,
                message: err
            }
        });
}

// export function findRessources(credentials) {
//     return axios
//         .get("http://192.168.43.94:8002/api/resources", credentials)
//         .then(response => response.data)
//         .catch(err => {
//             return {
//                 status:500,
//                 message:err
//             }
//         });
// }

export function getCommmentsResource(resourceId) {
    console.log(resourceId)

    return axios
        .get(`http://192.168.43.94:8002/api/resources/${resourceId}/comments`)
        .then(response => response.data)
        .catch(err => {
            return {
                status: 500,
                message: err
            }
        });;
}

export function moderateResource(body, token) {

    const role = TokenManager.getRole(token)

    if (role !== "ROLE_MODERATOR") {
        return false
    }

    return axios
        .post(`http://192.168.43.94:8002/api/resources/moderate`, body)
        .then(response => response.data)
        .catch(err => {
            return {
                status: 500,
                message: err
            }
        });
}

// module.exports = {
//     moderateResource,
//     getCommmentsResource,
//     findRessources
// }