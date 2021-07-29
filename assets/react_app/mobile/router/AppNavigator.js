
import React, { useState } from 'react';
import { Button, StyleSheet, View, ActivityIndicator, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login';
import { initialisation, loginAuth, isAdmin, isAuth, isStorageToken, KEY_TOKEN, logoutAuth, _tokenIsValid, _setAxiosToken, getUser } from '../services/authService';
import MyRessources from '../screen/Ressources';

import Ressource from '../component/ResourceDetail';
import UserProfil from '../screen/userProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import CommentsModeration from '../screen/moderator/CommentsModeration';
import ResourceModeration from '../screen/moderator/ResourceModeration';
import TokenManager from '../services/security/TokenManager';

// const Navigator = ({ dispatch, navigation }) => {
const AppNavigator = ({ dispatch, navigation }) => {

  const auth = useSelector(state => state.auth)
  // const navigation = useNavigation()


  const loadStorageToken = async () => {

    const token = await AsyncStorage.getItem(KEY_TOKEN)
    console.log('token loadStorageToken', token)

    if (!auth.token || typeof auth.token != 'string'
      && auth.loading && token && token.length > 0 && _tokenIsValid(token)) {
      // dispatch({ type: "LOADING", auth });

      if (TokenManager.isExpired(token)) {
        // Possible used reducer modal for alert to relogin for security purpose
        alert("Please try to relogin because your jwt token are expired")
      }
      _setAxiosToken(token)
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

        if (error.code == 401
          && error.message == 'Expired JWT Token') {
          alert("Please try to relogin because your jwt token are expired")
        }
      })
    }

  }
  loadStorageToken()


  initialisation()

  const Stack = createStackNavigator()


  // if (auth.loading) {
  //   return <ActivityIndicator />
  // }
  return (
    // <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../assets/background-vertical.png")}>
    <NavigationContainer>
      {/* <View> */}

      {/* {loadStorageToken} */}
      <Stack.Screen
        name="MyRessources"
        component={MyRessources}
        options={({ navigation, route }) => ({
          headerRight: () => (

            // token && token.length > 0 && typeof token == 'string' ?
            auth && auth.token && auth.token.length > 0 ?

              <View style={{ display: "inline-flex" }}>
                <Button
                  style={styles.button}
                  title="Profil"
                  onPress={() => navigation.navigate('UserProfil')}
                />

                {auth.token && auth.token.length > 0 && typeof auth.token == 'string'
                  && auth.user && auth.user.role === 'ROLE_MODERATOR' && TokenManager.getRole(auth.token) === 'ROLE_MODERATOR' &&
                  <Button
                    style={styles.button}
                    title="ResourceModeration"
                    onPress={() => navigation.navigate('ResourceModeration')}
                  />
                }

              </View>
              :

              <View style={{ display: "inline-flex" }}>
                <Button
                  style={styles.button}
                  title="Login"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>

          )
        })}
      />

      <Stack.Screen name="Resource">
        {props => <Resource {...props} />}
      </Stack.Screen>


      <Stack.Screen name="ResourceModeration">
        {props => <ResourceModeration {...props} />}
      </Stack.Screen>


      <Stack.Screen name="Login">
        {props => <Login {...props} />}
      </Stack.Screen>


      <Stack.Screen name="Profil">
        {props => <UserProfil  {...props} />}
      </Stack.Screen>



      {/* </View> */}
    </NavigationContainer>

    // </ImageBackground>


  );
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppNavigator);
