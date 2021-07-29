
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Router from './router/Navigator';

const App = () => {

  const { store } = configureStore();

  return (
    <Provider store={store}>
        <Router />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
