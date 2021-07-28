import React, { useState } from 'react';
import { Button, StyleSheet, View, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import { initialisation, isAdmin, isAuth, isStorageToken, KEY_TOKEN, logoutAuth } from './services/authService';
import MyRessources from './screen/ResourcesDisplay';

import Ressource from './component/ResourceDetail';
import UserProfil from './screen/userProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from "react-redux";
import configureStore from "./store/configureStore";
import CommentsModeration from './screen/moderator/CommentsModeration';
import ResourceModeration from './screen/moderator/ResourceModeration';

// export default function App() {
const Navigator = () => {

  initialisation()
  isStorageToken
  const Stack = createStackNavigator()
  const token = AsyncStorage.getItem(KEY_TOKEN)

  console.log('token APP', token)
  const { store } = configureStore();

  const auth = useSelector(state => state.auth)

  if (auth.loading) {
    return <ActivityIndicator />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyRessources"
          component={MyRessources}
          options={({ navigation, route }) => ({
            headerRight: () => (

              // token && token.length > 0 && typeof token == 'string' ?
              auth && auth.token && auth.token.length > 0 && typeof token == 'string' ?

                <View style={{ display: "inline-flex" }}>
                  <Button
                    style={styles.button}
                    title="Profil"
                    onPress={() => navigation.navigate('UserProfil')}
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
        {/* <Stack.Screen name="Login" component={Login} /> */}

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