import React, {memo} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constant/theme';

interface Props {
  size?: 'small' | 'large';
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Loader: React.FC<Props> = ({
  size = 'large',
  color = COLORS.lightGreen,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Loader);
