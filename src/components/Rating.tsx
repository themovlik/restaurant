import React, {memo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import filledStar from '../assets/icons/Star-fill.png';
import emptyStar from '../assets/icons/Star-empty.png';
import {scale, verticalScale} from '../utils/responsive';

interface Props {
  value: number;
}

const Rating: React.FC<Props> = ({value}) => {
  const filledStars = Math.round(value);
  const emptyStars = 5 - filledStars;

  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, index) => (
        <Image key={index.toString()} source={filledStar} style={styles.star} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Image key={index.toString()} source={emptyStar} style={styles.star} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: scale(15),
    width: scale(15),
  },
});

export default memo(Rating);
