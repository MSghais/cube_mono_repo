
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import { initialisation, isAdmin, isAuth, KEY_TOKEN, logoutAuth } from './services/authService';
import MyRessources from './screen/myRessources';

import Ressource from './component/ResourceDetail';
import UserProfil from './screen/userProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from "react-redux";
import configureStore from "./store/configureStore";
import CommentsModeration from './screen/moderator/CommentsModeration';

export default function App() {
  initialisation()
  const Stack = createStackNavigator()
  const token = AsyncStorage.getItem(KEY_TOKEN)

  console.log('token APP', token)
	const {store} = configureStore();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyRessources"
            component={MyRessources}
            options={({ navigation, route }) => ({
              headerRight: () => (

                token && token.length > 0 && typeof token == 'string' ?
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

          <Stack.Screen name="Login">
            {props => <Login {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Resource">
            {props => <Ressource {...props} />}
          </Stack.Screen>
          <Stack.Screen name="UserProfil" component={UserProfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({});
