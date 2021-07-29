import React, { useState } from 'react';
import { Button, StyleSheet, View, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/login';
import { initialisation, isAdmin, isAuth, isStorageToken, KEY_TOKEN, logoutAuth, getUser } from '../services/authService';
import MyRessources from '../screen/DisplayResources';

import Ressource from '../component/ResourceDetail';
import UserProfil from '../screen/userProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from "react-redux";
import configureStore from "../store/configureStore";
import CommentsModeration from '../screen/moderator/CommentsModeration';
import ResourceModeration from '../screen/moderator/ResourceModeration';
import TokenManager from '../services/security/TokenManager';

const Navigator = ({ dispatch }) => {

  initialisation()
  const Stack = createStackNavigator()
  const auth = useSelector(state => state.auth)

  const loadStorageToken = async () => {

    const token = await AsyncStorage.getItem(KEY_TOKEN)
    console.log('token loadStorageToken', token)

    if (!auth.token || typeof auth.token != 'string'
      && auth.loading && token && token.length > 0 && _tokenIsValid(token)) {
      // dispatch({ type: "LOADING", auth });
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
          // navigation.navigate('ResourceModeration')

        }
        // navigation.navigate('MyRessources')

      }).catch(error => {
        console.log('error get user', error)
        alert(error)
      })
    }

  }
  loadStorageToken()

  // if (auth.loading) {
  //   return <ActivityIndicator />
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyRessources"
          component={MyRessources}
          options={({ navigation, route }) => ({
            headerRight: () => (

              !auth || auth.loading || !auth.token || auth.token.length === 0 ?


                <View style={{ display: "inline-flex" }}>
                  <Button
                    style={styles.button}
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>


                // token && token.length > 0 && typeof token == 'string' ?
                : auth && auth.token && auth.token.length > 0 &&
                  TokenManager.getRole(auth.token) == 'ROLE_MODERATOR' &&
                  auth.user.role == "ROLE_MODERATOR"
                  ?
                  <View style={{ display: "inline-flex" }}>
                    <Button
                      style={styles.button}
                      title="Profil"
                      onPress={() => navigation.navigate('UserProfil')}
                    />
                    <Button
                      style={styles.button}
                      title="ResourceModeration"
                      onPress={() => navigation.navigate('ResourceModeration')}
                    />
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

        <Stack.Screen name="CommentsModeration">
          {props => <CommentsModeration {...props} />}
        </Stack.Screen>

        <Stack.Screen name="ResourceModeration">
          {props => <ResourceModeration {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Login">
          {props => <Login {...props} />}
        </Stack.Screen>

        <Stack.Screen name="Resource">
          {props => <Ressource {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UserProfil" component={UserProfil} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navigator);