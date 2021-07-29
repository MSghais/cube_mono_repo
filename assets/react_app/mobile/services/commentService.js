import axios from "axios";
export const commentTypes = {
    getComment: "GET_COMMENT",
    getCommmentsResource: "GET_COMMENT_RESOURCE",
    loading: "LOADING_COMMENT",
    unload: "UNLOADING_COMMENT"
}

export  function createComment(comment) {
    return axios
        // .post("http://192.168.107.128:8002/api/login_check", credentials)
        // .post("http://192.168.107.128:8002/api/login_check", credentials)
        .post("http://192.168.43.94:8002/api/comments", comment)
        .then(response => response.data)
        .then(data => {
            //sauvegade le token dans le stockage du tel
            try {
                console.log("new data : ", data)

            } catch (error) {
                console.log(error)
            }


            return true;
        });
}

export function getCommmentsResource(resourceId) {

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
