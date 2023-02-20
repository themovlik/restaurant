import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RestaurantList from '../components/RestaurantList';
import {removeAsyncStorageItem} from '../utils/localStorage';
import {USERINFO} from '../constant/storageKeys';

type RootStackParamList = {
  MainScreen: undefined;
  LoginScreen: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen',
  'LoginScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const MainScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header
        title="Restaurant List"
        isLogOut={true}
        onBackPress={() => {
          removeAsyncStorageItem(USERINFO);
          navigation.replace('LoginScreen');
        }}
      />
      <RestaurantList />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
