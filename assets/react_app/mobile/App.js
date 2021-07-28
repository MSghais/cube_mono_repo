
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/login';
import { initialisation, isStorageToken, KEY_TOKEN } from './services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector } from "react-redux";
import configureStore from "./store/configureStore";
import AppNavigator from './router';
import Router from './Router';


import { NavigationContainer, useNavigation } from '@react-navigation/native';

// export default function App() {
const App = () => {

  // initialisation()
  // isStorageToken
  const Stack = createStackNavigator()

  const { store } = configureStore();

  return (
    <Provider store={store}>
        <Router />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
