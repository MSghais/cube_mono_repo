import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import { loginAuth, KEY_TOKEN, logoutAuth, getUser } from '../services/authService'
import TokenManager from '../services/security/TokenManager'
import AsyncStorage from '@react-native-async-storage/async-storage';


const login = ({ navigation, route, dispatch }) => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [token, setToken] = useState(null)

    const handleSubmit = () => {

        if (email && pwd && email.length > 5 && pwd.length > 3) {
            const data = {
                username: email.toLowerCase(),
                password: pwd
            }
            loginAuth(data).then((response) => {
                AsyncStorage.getItem(KEY_TOKEN).then((token) => {
                    console.log("token are : ", token)
                    if (token) {
                        setToken(token)

                        getUser(token).then((user) => {
                            console.log("user are : ", user)
                            const auth = {
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    role: TokenManager.getRole(token),
                                    email: user.email
                                }
                            }
                            console.log("auth ", auth)
                            dispatch({ type: "SET_AUTH", auth });

                            if (auth.user.role && auth.user.role === 'ROLE_MODERATOR'
                                
                                && TokenManager.getRole(token) === 'ROLE_MODERATOR') {
                                navigation.navigate('ResourceModeration')

                            }
                            navigation.navigate('MyRessources')


                        }).catch(error => {
                            console.log('error get user', error)
                            alert(error)
                        })
                    }

                }).catch(err => {
                    console.log('error get token storage', err)
                    alert(err)
                })

            }).catch(error => {
                console.log('error login', error)
                alert(error)

            })
        }

    }

    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../assets/background-vertical.png")}>
            {console.log('RENDER', email, pwd, token)}
            <View style={styles.container}>

                <Text style={styles.titre}>Bienvenue</Text>

                <View style={styles.inputView}>
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        style={styles.TextInput}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        onChangeText={setPwd}
                        value={pwd}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        textContentType='password'
                        style={styles.TextInput}
                    />
                </View>

                {/* <TouchableOpacity onPress={handlePress} style={styles.loginBtn}> */}

                <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Se Connecter</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>

    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1
    },
    inputView: {
        backgroundColor: "#FF9F1C",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        opacity: 0.8
    },
    titre: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: '#fff'
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFA831",
    },

})

/**
 *     const handlePress = () => {

        if (email && pwd && email.length > 5 && pwd.length > 3) {
            const data = {
                username: email.toLowerCase(),
                password: pwd
            }
            loginAuth(data).then((response) => {
                AsyncStorage.getItem(KEY_TOKEN).then((data) => {
                    console.log(data)
                    setToken(data)
                    //navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: 'MyRessources' }],
                    // })
                    navigation.navigate('MyRessources')
                })

            })
        }
    }
 */