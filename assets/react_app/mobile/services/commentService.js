import axios from "axios";

export  function createComment(comment) {
    return axios
        // .post("http://192.168.107.128:8002/api/login_check", credentials)
        // .post("http://192.168.107.128:8002/api/login_check", credentials)
        .post("http://192.168.0.16:8002/api/comments", comment)
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