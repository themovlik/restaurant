import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {enableLatestRenderer} from 'react-native-maps';
import Router from './src/navigation/router';
import store from './store';

enableLatestRenderer();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <Router />
        </ReduxProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
