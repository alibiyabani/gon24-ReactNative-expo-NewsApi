import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { rootStore } from './src/redux/store';
import { StatusBar, View, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import Netinfo from '@react-native-community/netinfo';
import registerNNPushToken from 'native-notify';
import AppNavigation from './src/AppNavigation'
import { appTheme } from './src/appTheme';



export default function App() {
  registerNNPushToken(2436, 'YaYX9dzhIdwZ1xiDuvDR0G');
  const [connection, setConnection] = useState(true)

  const Toast = ({ visible, message }) => {
    if (!visible) {
      ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.CENTER, ToastAndroid.CENTER, 100, 100);
      return null;
    }
    return null;
  };

  const netState = async () => {
    const netinfo = await Netinfo.fetch();
    setConnection(netinfo.isConnected);
  }
  useEffect(() => {
    netState();
  }, [])


  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <StatusBar backgroundColor={appTheme.colors.primary} barStyle='dark' />
        <Toast visible={connection} message="Check your Internet Connection" />
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}

