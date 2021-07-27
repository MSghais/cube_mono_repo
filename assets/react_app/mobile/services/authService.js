import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux'
export const KEY_TOKEN = 'token'


export function loginAuth(credentials, dispatch) {
    // export function loginAuth(credentials) {
    return axios
        .post("http://192.168.0.16:8002/api/login_check", credentials)
        .then(response =>
            // console.log('res^p,se', response.data)
            response.data
        )
        .then(data => {
            //sauvegade le token dans le stockage du tel
            try {
                console.log('data', data)
                AsyncStorage.setItem(KEY_TOKEN, data.token)
                // dispatch({
                //     type:"SET_TOKEN",
                // });
                _setAxiosToken(data.token)
                // getUser(data.token)
                // AsyncStorage.setItem("ID", data.user.id)
            } catch (error) {
                console.log(error)
            }

            _setAxiosToken(data.token)
            return true;
        });
}

export function getUser(token) {
    console.log("token for get user", token)
    _setAxiosToken(token)

    return axios
        // .get("http://192.168.0.16:8002/api/user", token)
        .get("http://192.168.0.16:8002/api/user")

        .then(response =>
            // console.log('res^p,se', response.data)
            response.data
        )
        .then(data => {
            //sauvegade le token dans le stockage du tel
            try {
                console.log('data user', data)
                AsyncStorage.setItem("USER_ID", data.user.id)
            
                return data.user
                // return dispatch({
                //     type: "SET_USER",
                //     auth: {
                //         token,
                //         user: data.user
                //     }
                // });

                // AsyncStorage.setItem("ID", data.user.id)
            } catch (error) {
                console.log(error)
            }

            return true;
        });
}

export function logoutAuth() {
    //supprimer le token du tel
    try {
        AsyncStorage.removeItem(KEY_TOKEN)
    } catch (error) {
        console.log(error)
    }

    //supprime le token dans axios
    delete axios.defaults.headers["Authorization"];

}


export async function initialisation() {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    console.log('token', token)
    if (typeof token == 'string' && token && token.length > 0 && _tokenIsValid(token)) {
        _setAxiosToken(token)
    }
}



export async function isAuth() {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    if (token && token.length > 0 && _tokenIsValid(token)) {
        console.log(KEY_TOKEN)
        return true
    }

    return false
}

// export async function isAdmin() {
//     const token = await AsyncStorage.getItem(KEY_TOKEN)
//     if(token && token.length > 0 && _tokenIsValid(token)) {
//         const jwtData = jwtDecode(token)
//         return jwtData.roles.include('ROLE_ADMIN')
//     }

//     return false
// }

function _setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function _tokenIsValid(token) {
    if (token) {
        const jwtData = jwtDecode(token);

        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true
        }

        return false
    }

    return false
}