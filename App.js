import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { rootStore } from './src/redux/store';
import { StatusBar } from 'react-native';

import AppNavigation from './src/AppNavigation'
import { appTheme } from './src/appTheme';

export default function App() {
  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <StatusBar backgroundColor={appTheme.colors.primary} barStyle='dark' />
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}
