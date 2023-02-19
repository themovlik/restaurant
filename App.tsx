import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation/router';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
