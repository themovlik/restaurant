import React, {useState, useEffect, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from '../utils/responsive';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../constant/theme';
import Input from '../components/Input';
import {getAsyncStorageItem, setAsyncStorageItem} from '../utils/localStorage';
import {USERINFO} from '../constant/storageKeys';
import Loader from '../components/Loader';

interface LoginState {
  email: string;
  password: string;
  emailError: string | null;
  passwordError: string | null;
  loading?: boolean;
}

type RootStackParamList = {
  LoginScreen: undefined;
  MainScreen: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    loading: true,
  });

  useEffect(() => {
    const fetchCredentials = async () => {
      const storedEmail = await getAsyncStorageItem(USERINFO);
      if (storedEmail) {
        navigation.replace('MainScreen');
      } else {
        setLoginState({...loginState, loading: false});
      }
    };
    fetchCredentials();
  }, []);

  const handleEmailChange = (text: string) => {
    setLoginState({...loginState, email: text, emailError: null});
  };

  const handlePasswordChange = (text: string) => {
    setLoginState({...loginState, password: text, passwordError: null});
  };

  const handleLoginPress = () => {
    const {email, password} = loginState;
    const isValid = {
      email: email.toLowerCase() === 'demo@gmail.com',
      password: password === '123456',
    };
    if (isValid.email && isValid.password) {
      console.log('Login successful');
      navigation.replace('MainScreen');
      setAsyncStorageItem(USERINFO, email);
      setLoginState({
        email: '',
        password: '',
        emailError: null,
        passwordError: null,
      });
    } else {
      setLoginState({
        ...loginState,
        emailError: isValid.email ? null : 'Invalid email',
        passwordError: isValid.password ? null : 'Invalid password',
      });
    }
  };

  const {email, password, emailError, passwordError} = loginState;

  return (
    <View style={styles.container}>
      {loginState.loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <Input
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email"
            keyboardType="email-address"
            errorMessage={emailError}
          />
          <Input
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            secureTextEntry
            errorMessage={passwordError}
          />
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(32),
    color: COLORS.gray,
  },
  button: {
    backgroundColor: COLORS.lightGreen,
    padding: scale(12),
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    fontSize: scale(18),
  },
});

export default memo(LoginScreen);
