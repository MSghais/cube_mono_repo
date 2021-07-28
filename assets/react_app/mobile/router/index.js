
import React, { useState } from 'react';
import { Button, StyleSheet, View, ActivityIndicator, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initialisation, loginAuth, isAdmin, isAuth, isStorageToken, KEY_TOKEN, logoutAuth, _tokenIsValid, _setAxiosToken, getUser } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import TokenManager from '../services/security/TokenManager';
import AppNavigator from './AppNavigator';

// const Navigator = ({ dispatch, navigation }) => {
const ContainerNavigator = ({ dispatch }) => {




  initialisation()

  return (
    <AppNavigator />
    

  );
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ContainerNavigator);
