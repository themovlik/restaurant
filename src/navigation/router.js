import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RouteScreen from '../screens/RouteScreen';

// navigators
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
    </Stack.Navigator>
  );
};

export default Router;
