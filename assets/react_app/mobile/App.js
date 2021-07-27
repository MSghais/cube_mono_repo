
import React, { useState } from 'react';
import { Button, StyleSheet, View ,  ActivityIndicator,} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import { initialisation, isAdmin, isAuth, isStorageToken, KEY_TOKEN, logoutAuth } from './services/authService';
import MyRessources from './screen/myRessources';

import Ressource from './component/ResourceDetail';
import UserProfil from './screen/userProfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from "react-redux";
import configureStore from "./store/configureStore";
import CommentsModeration from './screen/moderator/CommentsModeration';
import ResourceModeration from './screen/moderator/ResourceModeration';
import AppNavigator from './AppNavigator';

// export default function App() {
const App = () => {

  initialisation()
  isStorageToken
  const Stack = createStackNavigator()
  const token = AsyncStorage.getItem(KEY_TOKEN)

  console.log('token APP', token)
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
