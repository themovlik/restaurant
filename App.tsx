import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {COLORS} from './src/constant/theme';
import Router from './src/navigation/router';
import store from './store';

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
