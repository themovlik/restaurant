import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../constant/theme';
import {scale} from '../utils/responsive';

type Props = {
  size: number;
};

const UserLocation: React.FC<Props> = ({size}) => {
  const containerStyle = {
    width: scale(size),
    height: scale(size),
    borderRadius: scale(size),
    backgroundColor: COLORS.lightGreen60,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const innerCircleStyle = {
    width: scale(size / 2),
    height: scale(size / 2),
    borderRadius: scale(size / 2),
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const dotStyle = {
    width: scale(size / 4),
    height: scale(size / 4),
    borderRadius: scale(size / 4),
    backgroundColor: COLORS.white,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.innerCircle, innerCircleStyle]}>
        <View style={dotStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(UserLocation);
