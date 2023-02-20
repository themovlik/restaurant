import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  white: '#FFFFFF',
  lightGreen: '#25db94',
  black: '#000000',
  gray: '#25282f',
  lightgray: '#CCCCCC',
  red: '#FF0000',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 20,
  padding: 24,
  margin: 10,

  // font sizes
  hugeTitle: 44,
  bigTitle: 30,
  title: 24,
  smallTitle: 20,
  caption: 13,
  body: 14,
  buttonText: 14,
  smallText: 12,
  inputs: 16,

  // app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
